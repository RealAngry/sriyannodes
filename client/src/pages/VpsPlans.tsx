import { useQuery } from "@tanstack/react-query";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PlanCard } from "@/components/ui/plan-card";
import { Button } from "@/components/ui/button";
import { Server, Shield, Terminal, HardDrive } from "lucide-react";
import { Plan, PlanType, ApiResponse } from "@/lib/types";

const VPS_FEATURES = [
  { icon: <Server className="h-6 w-6 text-primary" />, title: "Dedicated Resources", description: "Dedicated CPU cores and RAM that are solely allocated to your VPS, ensuring consistent performance." },
  { icon: <HardDrive className="h-6 w-6 text-primary" />, title: "SSD Storage", description: "Ultra-fast SSD storage for lightning-quick data access and application loading times." },
  { icon: <Terminal className="h-6 w-6 text-primary" />, title: "Full Root Access", description: "Complete control over your server with root access to install any software or configurations you need." },
];

const VpsPlans = () => {
  const { data: plansData, isLoading } = useQuery<ApiResponse<Plan[]>>({
    queryKey: ['/api/plans', { type: PlanType.VPS }],
  });

  const vpsPlans = plansData?.data?.filter(plan => plan.type === PlanType.VPS);

  return (
    <>
      {/* Header */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Virtual Private Server Hosting"
            description="High-performance VPS solutions with dedicated resources and full root access."
            label="VPS HOSTING"
          />
        </div>
      </section>

      {/* Plans */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Select Your VPS Plan"
            description="Choose from our range of performance-optimized VPS solutions."
          />
          
          {/* Standard VPS */}
          <div className="mb-12">
            <h3 className="text-2xl font-heading font-bold text-primary mb-6 text-center">Standard VPS</h3>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Reliable and affordable virtual private servers for basic applications and development environments.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {isLoading ? (
                Array(2).fill(0).map((_, index) => (
                  <div key={index} className="bg-muted animate-pulse h-96 rounded-xl"></div>
                ))
              ) : (
                vpsPlans?.filter(plan => !plan.isPopular)?.map(plan => (
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
          
          {/* High-Performance VPS */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-secondary mb-6 text-center">High-Performance VPS</h3>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Enterprise-grade virtual servers with guaranteed resources and advanced features for demanding applications.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {isLoading ? (
                Array(2).fill(0).map((_, index) => (
                  <div key={index} className="bg-muted animate-pulse h-96 rounded-xl"></div>
                ))
              ) : (
                vpsPlans?.filter(plan => plan.isPopular)?.map(plan => (
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
            title="VPS Hosting Features"
            description="Powerful features designed for developers, businesses, and power users."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VPS_FEATURES.map((feature, index) => (
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

      {/* Specs Comparison */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Technical Specifications"
            description="Detailed comparison of our VPS hosting plans."
          />
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-card">
                  <th className="text-left p-4 border-b border-border">Specification</th>
                  <th className="text-center p-4 border-b border-border">Starter</th>
                  <th className="text-center p-4 border-b border-border">Professional</th>
                  <th className="text-center p-4 border-b border-border">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b border-border font-medium">CPU Cores</td>
                  <td className="text-center p-4 border-b border-border">1 vCPU</td>
                  <td className="text-center p-4 border-b border-border">2 vCPU</td>
                  <td className="text-center p-4 border-b border-border">4 vCPU</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-border font-medium">RAM</td>
                  <td className="text-center p-4 border-b border-border">2 GB</td>
                  <td className="text-center p-4 border-b border-border">4 GB</td>
                  <td className="text-center p-4 border-b border-border">8 GB</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-border font-medium">Storage</td>
                  <td className="text-center p-4 border-b border-border">20 GB SSD</td>
                  <td className="text-center p-4 border-b border-border">50 GB SSD</td>
                  <td className="text-center p-4 border-b border-border">100 GB SSD</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-border font-medium">Bandwidth</td>
                  <td className="text-center p-4 border-b border-border">1 TB</td>
                  <td className="text-center p-4 border-b border-border">2 TB</td>
                  <td className="text-center p-4 border-b border-border">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-border font-medium">Network Speed</td>
                  <td className="text-center p-4 border-b border-border">1 Gbps</td>
                  <td className="text-center p-4 border-b border-border">1 Gbps</td>
                  <td className="text-center p-4 border-b border-border">2 Gbps</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-border font-medium">Operating Systems</td>
                  <td className="text-center p-4 border-b border-border">Linux</td>
                  <td className="text-center p-4 border-b border-border">Linux, Windows</td>
                  <td className="text-center p-4 border-b border-border">Linux, Windows</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Frequently Asked Questions"
            description="Common questions about our VPS hosting services."
          />
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "What is a VPS?",
                  answer: "A Virtual Private Server (VPS) is a virtualized server that simulates a dedicated server within a shared hosting environment. It gives you dedicated resources and full root access while being more cost-effective than a physical dedicated server."
                },
                {
                  question: "Can I upgrade my VPS plan later?",
                  answer: "Yes, you can easily upgrade your VPS plan as your needs grow. The upgrade process is seamless and typically requires only a quick reboot to apply the new resource allocations."
                },
                {
                  question: "Do you provide DDoS protection?",
                  answer: "Yes, all our VPS plans include DDoS protection to safeguard your server against attacks. Our network is equipped with advanced mitigation systems to detect and filter malicious traffic."
                },
                {
                  question: "What control panel do you offer?",
                  answer: "We provide a custom control panel for managing your VPS. Additionally, we support popular control panels like cPanel, Plesk, and Webmin which can be installed on your server."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-background p-6 rounded-xl border border-border">
                  <h4 className="text-lg font-medium text-foreground mb-2">{faq.question}</h4>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
            Power Your Projects with Our VPS Solutions
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get the performance, reliability, and control you need for your applications and websites.
          </p>
          <Button size="lg">Deploy Your VPS Now</Button>
        </div>
      </section>
    </>
  );
};

export default VpsPlans;
