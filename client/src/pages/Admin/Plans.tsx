import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plan, PlanType, ApiResponse } from "@/lib/types";
import AdminLayout from "./AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Plus, Trash, Server, Bot, Globe, Network } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaDiscord } from "react-icons/fa";

const planSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  price: z.coerce.number().positive({ message: "Price must be a positive number" }),
  currency: z.string().min(1, { message: "Currency is required" }),
  period: z.string().min(1, { message: "Period is required" }),
  type: z.enum([PlanType.MINECRAFT, PlanType.VPS, PlanType.DISCORD_BOT, PlanType.WEB_HOSTING]),
  features: z.string().transform(val => val.split('\n').map(f => f.trim()).filter(f => f !== "")),
  isPopular: z.boolean().default(false),
  isComingSoon: z.boolean().default(false),
});

type PlanFormValues = z.infer<typeof planSchema>;

const PlanTypeIcons = {
  [PlanType.MINECRAFT]: <Network className="h-6 w-6 text-primary" />,
  [PlanType.VPS]: <Server className="h-6 w-6 text-primary" />,
  [PlanType.DISCORD_BOT]: <FaDiscord className="h-6 w-6 text-primary" />,
  [PlanType.WEB_HOSTING]: <Globe className="h-6 w-6 text-primary" />,
};

const Plans = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editPlan, setEditPlan] = useState<Plan | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: plansData, isLoading } = useQuery<ApiResponse<Plan[]>>({
    queryKey: ['/api/plans'],
  });

  const plansGroupedByType = plansData?.data?.reduce((acc, plan) => {
    if (!acc[plan.type]) {
      acc[plan.type] = [];
    }
    acc[plan.type].push(plan);
    return acc;
  }, {} as Record<PlanType, Plan[]>) || {};

  const createPlanMutation = useMutation({
    mutationFn: async (plan: PlanFormValues) => {
      const response = await apiRequest("POST", "/api/plans", plan);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/plans'] });
      toast({
        title: "Success",
        description: "Plan created successfully",
      });
      setIsAddDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create plan",
        variant: "destructive",
      });
    },
  });

  const updatePlanMutation = useMutation({
    mutationFn: async ({ id, plan }: { id: string; plan: PlanFormValues }) => {
      const response = await apiRequest("PUT", `/api/plans/${id}`, plan);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/plans'] });
      toast({
        title: "Success",
        description: "Plan updated successfully",
      });
      setEditPlan(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update plan",
        variant: "destructive",
      });
    },
  });

  const deletePlanMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/plans/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/plans'] });
      toast({
        title: "Success",
        description: "Plan deleted successfully",
      });
      setDeleteId(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete plan",
        variant: "destructive",
      });
    },
  });

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      currency: "$",
      period: "mo",
      type: PlanType.MINECRAFT,
      features: [],
      isPopular: false,
      isComingSoon: false,
    },
  });

  const handleOpenAddDialog = () => {
    form.reset({
      name: "",
      description: "",
      price: 0,
      currency: "$",
      period: "mo",
      type: PlanType.MINECRAFT,
      features: [],
      isPopular: false,
      isComingSoon: false,
    });
    setIsAddDialogOpen(true);
  };

  const handleOpenEditDialog = (plan: Plan) => {
    form.reset({
      ...plan,
      features: plan.features.join('\n'),
    });
    setEditPlan(plan);
  };

  const onSubmit = (data: PlanFormValues) => {
    if (editPlan) {
      updatePlanMutation.mutate({ id: editPlan.id, plan: data });
    } else {
      createPlanMutation.mutate(data);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deletePlanMutation.mutate(deleteId);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <SectionHeading
          title="Manage Plans"
          description="Create, edit, and delete hosting service plans."
          align="left"
          className="mb-0"
        />
        <Button onClick={handleOpenAddDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Plan
        </Button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, index) => (
            <div key={index} className="h-64 bg-muted animate-pulse rounded-xl"></div>
          ))}
        </div>
      ) : (
        Object.entries(plansGroupedByType).length > 0 ? (
          Object.entries(plansGroupedByType).map(([type, plans]) => (
            <div key={type} className="mb-10">
              <h3 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center">
                {PlanTypeIcons[type as PlanType]}
                <span className="ml-2">{type.replace('_', ' ')} Plans</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <Card key={plan.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription>{plan.description}</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenEditDialog(plan)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setDeleteId(plan.id)}>
                                <Trash className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the plan.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary">
                        {plan.currency}{plan.price}
                        <span className="text-base font-normal text-muted-foreground">/{plan.period}</span>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Features:</h4>
                        <ul className="space-y-1">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start">
                              <div className="mr-2 h-5 w-5 text-primary flex-shrink-0">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                                </svg>
                              </div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {plan.isPopular && (
                        <div className="bg-secondary/20 text-secondary text-xs px-2 py-1 rounded-full">Popular</div>
                      )}
                      {plan.isComingSoon && (
                        <div className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">Coming Soon</div>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-card rounded-xl border border-border">
            <h3 className="text-xl font-medium text-foreground mb-2">No Plans Found</h3>
            <p className="text-muted-foreground mb-6">Click the button above to create your first plan.</p>
            <Button onClick={handleOpenAddDialog}>Create Plan</Button>
          </div>
        )
      )}

      {/* Add/Edit Plan Dialog */}
      <Dialog open={isAddDialogOpen || !!editPlan} onOpenChange={(open) => {
        if (!open) {
          setIsAddDialogOpen(false);
          setEditPlan(null);
        }
      }}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editPlan ? "Edit Plan" : "Add New Plan"}</DialogTitle>
            <DialogDescription>
              {editPlan ? "Update the plan details below." : "Fill in the plan details below to create a new plan."}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Plan name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select plan type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={PlanType.MINECRAFT}>Minecraft</SelectItem>
                          <SelectItem value={PlanType.VPS}>VPS</SelectItem>
                          <SelectItem value={PlanType.DISCORD_BOT}>Discord Bot</SelectItem>
                          <SelectItem value={PlanType.WEB_HOSTING}>Web Hosting</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Plan description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="$">$</SelectItem>
                          <SelectItem value="€">€</SelectItem>
                          <SelectItem value="£">£</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="period"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Period</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mo">Month</SelectItem>
                          <SelectItem value="yr">Year</SelectItem>
                          <SelectItem value="hr">Hour</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Features</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter features, one per line" 
                        {...field} 
                        value={typeof field.value === 'string' ? field.value : field.value.join('\n')}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter one feature per line
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <FormField
                  control={form.control}
                  name="isPopular"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Popular</FormLabel>
                        <FormDescription>
                          Mark this plan as popular
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isComingSoon"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Coming Soon</FormLabel>
                        <FormDescription>
                          Mark this plan as coming soon
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    setEditPlan(null);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={createPlanMutation.isPending || updatePlanMutation.isPending}
                >
                  {createPlanMutation.isPending || updatePlanMutation.isPending ? 
                    "Saving..." : 
                    editPlan ? "Update Plan" : "Create Plan"
                  }
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Plans;
