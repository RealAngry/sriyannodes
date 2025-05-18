import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { StaffMember, ApiResponse } from "@/lib/types";
import AdminLayout from "./AdminLayout";
import {
  Card,
  CardContent,
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Edit, Plus, Trash, Star, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const staffSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  position: z.string().min(3, { message: "Position must be at least 3 characters" }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters" }),
  avatar: z.string().optional(),
  skills: z.string().transform(val => val.split(',').map(s => s.trim()).filter(s => s !== "")),
  isStaffOfMonth: z.boolean().default(false),
});

type StaffFormValues = z.infer<typeof staffSchema>;

const StaffManagement = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editStaff, setEditStaff] = useState<StaffMember | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: staffData, isLoading } = useQuery<ApiResponse<StaffMember[]>>({
    queryKey: ['/api/staff'],
  });

  const staffOfTheMonth = staffData?.data?.find(staff => staff.isStaffOfMonth);
  const regularStaff = staffData?.data?.filter(staff => !staff.isStaffOfMonth);

  const createStaffMutation = useMutation({
    mutationFn: async (staff: StaffFormValues) => {
      const response = await apiRequest("POST", "/api/staff", staff);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/staff'] });
      toast({
        title: "Success",
        description: "Staff member created successfully",
      });
      setIsAddDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create staff member",
        variant: "destructive",
      });
    },
  });

  const updateStaffMutation = useMutation({
    mutationFn: async ({ id, staff }: { id: string; staff: StaffFormValues }) => {
      const response = await apiRequest("PUT", `/api/staff/${id}`, staff);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/staff'] });
      toast({
        title: "Success",
        description: "Staff member updated successfully",
      });
      setEditStaff(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update staff member",
        variant: "destructive",
      });
    },
  });

  const deleteStaffMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/staff/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/staff'] });
      toast({
        title: "Success",
        description: "Staff member deleted successfully",
      });
      setDeleteId(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete staff member",
        variant: "destructive",
      });
    },
  });

  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      name: "",
      position: "",
      bio: "",
      avatar: "",
      skills: [],
      isStaffOfMonth: false,
    },
  });

  const handleOpenAddDialog = () => {
    form.reset({
      name: "",
      position: "",
      bio: "",
      avatar: "",
      skills: [],
      isStaffOfMonth: false,
    });
    setIsAddDialogOpen(true);
  };

  const handleOpenEditDialog = (staff: StaffMember) => {
    form.reset({
      ...staff,
      skills: staff.skills.join(', '),
    });
    setEditStaff(staff);
  };

  const onSubmit = (data: StaffFormValues) => {
    // If setting this staff as staff of month, we need to handle the existing staff of month
    if (data.isStaffOfMonth && staffOfTheMonth && (!editStaff || (editStaff && editStaff.id !== staffOfTheMonth.id))) {
      // Show a warning toast but proceed with the operation
      toast({
        title: "Note",
        description: "This will replace the current Staff of the Month.",
      });
    }
    
    if (editStaff) {
      updateStaffMutation.mutate({ id: editStaff.id, staff: data });
    } else {
      createStaffMutation.mutate(data);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteStaffMutation.mutate(deleteId);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <SectionHeading
          title="Staff Management"
          description="Add, edit, and remove staff members."
          align="left"
          className="mb-0"
        />
        <Button onClick={handleOpenAddDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add Staff Member
        </Button>
      </div>
      
      {/* Staff of the Month */}
      <div className="mb-8">
        <h2 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center">
          <Star className="h-5 w-5 text-primary mr-2" />
          <span>Staff of the Month</span>
        </h2>
        
        {isLoading ? (
          <div className="h-64 bg-muted animate-pulse rounded-xl"></div>
        ) : staffOfTheMonth ? (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mr-4">
                    {staffOfTheMonth.avatar ? (
                      <img
                        src={staffOfTheMonth.avatar}
                        alt={staffOfTheMonth.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <CardTitle>{staffOfTheMonth.name}</CardTitle>
                    <p className="text-primary font-medium">{staffOfTheMonth.position}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenEditDialog(staffOfTheMonth)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(staffOfTheMonth.id)}>
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently remove the staff member.
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
              <p className="text-muted-foreground mb-4">{staffOfTheMonth.bio}</p>
              <div className="flex flex-wrap gap-2">
                {staffOfTheMonth.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="text-center p-8">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Staff of the Month Selected</h3>
              <p className="text-muted-foreground mb-4">
                Set a staff member as Staff of the Month to feature them here.
              </p>
              <Button onClick={handleOpenAddDialog}>Add Staff Member</Button>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Regular Staff Members */}
      <div>
        <h2 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center">
          <User className="h-5 w-5 text-primary mr-2" />
          <span>Team Members</span>
        </h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="h-48 bg-muted animate-pulse rounded-xl"></div>
            ))}
          </div>
        ) : regularStaff && regularStaff.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularStaff.map((staff) => (
              <Card key={staff.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                        {staff.avatar ? (
                          <img
                            src={staff.avatar}
                            alt={staff.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <User className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{staff.name}</CardTitle>
                        <p className="text-primary font-medium text-sm">{staff.position}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenEditDialog(staff)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setDeleteId(staff.id)}>
                            <Trash className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently remove the staff member.
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
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{staff.bio}</p>
                  <div className="flex flex-wrap gap-1">
                    {staff.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                    {staff.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">+{staff.skills.length - 3} more</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center p-8">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Staff Members Found</h3>
              <p className="text-muted-foreground mb-4">
                Add your first staff member by clicking the button below.
              </p>
              <Button onClick={handleOpenAddDialog}>Add Staff Member</Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add/Edit Staff Dialog */}
      <Dialog open={isAddDialogOpen || !!editStaff} onOpenChange={(open) => {
        if (!open) {
          setIsAddDialogOpen(false);
          setEditStaff(null);
        }
      }}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editStaff ? "Edit Staff Member" : "Add New Staff Member"}</DialogTitle>
            <DialogDescription>
              {editStaff ? "Update the staff member details below." : "Fill in the staff member details below to add them to your team."}
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
                        <Input placeholder="Full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Job title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="A brief description about the staff member" 
                        {...field} 
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/avatar.jpg" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormDescription>
                      Provide a URL to the staff member's avatar image
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Cloud Infrastructure, Security, DevOps" 
                        {...field} 
                        value={typeof field.value === 'string' ? field.value : field.value.join(', ')}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter skills separated by commas
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isStaffOfMonth"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Staff of the Month</FormLabel>
                      <FormDescription>
                        Set this person as Staff of the Month
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    setEditStaff(null);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={createStaffMutation.isPending || updateStaffMutation.isPending}
                >
                  {createStaffMutation.isPending || updateStaffMutation.isPending ? 
                    "Saving..." : 
                    editStaff ? "Update Staff Member" : "Add Staff Member"
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

export default StaffManagement;
