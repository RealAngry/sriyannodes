import { useQuery } from "@tanstack/react-query";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PlanCard } from "@/components/ui/plan-card";
import { Button } from "@/components/ui/button";
import { Server, Shield, Clock } from "lucide-react";
import { Plan, PlanType, ApiResponse } from "@/lib/types";

const MINECRAFT_FEATURES = [
  { icon: <Server className="h-6 w-6 text-primary" />, title: "High Performance", description: "Our Minecraft servers use premium hardware to ensure smooth gameplay even with many players and plugins." },
  { icon: <Shield className="h-6 w-6 text-primary" />, title: "DDoS Protection", description: "Built-in protection against DDoS attacks to keep your server online and accessible at all times." },
  { icon: <Clock className="h-6 w-6 text-primary" />, title: "Instant Setup", description: "Get your Minecraft server online in seconds with our automated setup process." },
];

const MinecraftPlans = () => {
  const { data: plansData, isLoading } = useQuery<ApiResponse<Plan[]>>({
    queryKey: ['/api/plans', { type: PlanType.MINECRAFT }],
  });

  const minecraftPlans = plansData?.data?.filter(plan => plan.type === PlanType.MINECRAFT);

  return (
    <>
      {/* Header */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Minecraft Server Hosting"
            description="High-performance, reliable Minecraft servers with easy management and plugin support."
            label="GAME SERVERS"
          />
        </div>
      </section>

      {/* Plans */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Choose Your Plan"
            description="Select the perfect Minecraft hosting package for your needs."
          />
          
          {/* Cheap Plans */}
          <div className="mb-12">
            <h3 className="text-2xl font-heading font-bold text-primary mb-6 text-center">Cheap Plans</h3>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Budget-friendly options with essential features for small communities and casual gameplay.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {isLoading ? (
                Array(2).fill(0).map((_, index) => (
                  <div key={index} className="bg-muted animate-pulse h-96 rounded-xl"></div>
                ))
              ) : (
                minecraftPlans?.filter(plan => !plan.isPopular)?.map(plan => (
                  <PlanCard
                    key={plan.id}
                    id={plan.id}
                    name={plan.name}
                    description={plan.description}
                    price={plan.price}
                    currency={plan.currency}
                    period={plan.period}
                    features={plan.features.map((feat, idx) => ({ id: `${plan.id}-${idx}`, name: feat }))}
                    isPopular={false}
                    icon={<Server className="h-12 w-12 text-primary" />}
                  />
                ))
              )}
            </div>
          </div>
          
          {/* Premium Plans */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-secondary mb-6 text-center">Premium Plans</h3>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              High-performance options with advanced features for large communities and serious gameplay.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {isLoading ? (
                Array(2).fill(0).map((_, index) => (
                  <div key={index} className="bg-muted animate-pulse h-96 rounded-xl"></div>
                ))
              ) : (
                minecraftPlans?.filter(plan => plan.isPopular)?.map(plan => (
                  <PlanCard
                    key={plan.id}
                    id={plan.id}
                    name={plan.name}
                    description={plan.description}
                    price={plan.price}
                    currency={plan.currency}
                    period={plan.period}
                    features={plan.features.map((feat, idx) => ({ id: `${plan.id}-${idx}`, name: feat }))}
                    isPopular={true}
                    icon={<Server className="h-12 w-12 text-secondary" />}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Minecraft Hosting Features"
            description="We provide everything you need for an optimal Minecraft server experience."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MINECRAFT_FEATURES.map((feature, index) => (
              <div key={index} className="bg-background p-6 rounded-xl border border-border">
                <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Frequently Asked Questions"
            description="Find answers to common questions about our Minecraft hosting services."
          />
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "How do I install mods or plugins?",
                  answer: "Our control panel makes it easy to install mods and plugins with just a few clicks. Simply log in to your control panel, navigate to the 'Mods' or 'Plugins' section, and search for the ones you want to install."
                },
                {
                  question: "Can I switch between Minecraft versions?",
                  answer: "Yes, you can switch between different Minecraft versions through our control panel. We support all major versions from legacy to the latest releases."
                },
                {
                  question: "How many players can join my server?",
                  answer: "The number of players depends on the plan you choose. Our plans range from 10 players for smaller communities up to unlimited players for our premium packages."
                },
                {
                  question: "Do you offer a money-back guarantee?",
                  answer: "Yes, we offer a 7-day money-back guarantee on all our Minecraft hosting plans. If you're not satisfied with our service, you can request a full refund within the first week."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-card p-6 rounded-xl border border-border">
                  <h4 className="text-lg font-medium text-foreground mb-2">{faq.question}</h4>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
            Ready to Start Your Minecraft Server?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get your server up and running in minutes with our instant setup and user-friendly control panel.
          </p>
          <Button size="lg">Get Started Now</Button>
        </div>
      </section>
    </>
  );
};

export default MinecraftPlans;
