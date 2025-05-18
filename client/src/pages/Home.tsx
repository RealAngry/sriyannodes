import { useQuery } from "@tanstack/react-query";
import { Hero } from "@/components/shared/Hero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PlanCard } from "@/components/ui/plan-card";
import { PerformanceCard } from "@/components/ui/performance-card";
import { ServerStatusCard } from "@/components/ui/server-status-card";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { Button } from "@/components/ui/button";
import { Check, Server, Network, Shield, Globe, Bot } from "lucide-react";
import { Link } from "wouter";
import { Plan, PlanType, StaffMember, Testimonial, ServerNode, ApiResponse } from "@/lib/types";
import { FaDiscord } from "react-icons/fa";

const Home = () => {
  const { data: plansData, isLoading: plansLoading } = useQuery<ApiResponse<Plan[]>>({
    queryKey: ['/api/plans'],
  });

  const { data: testimonialsData, isLoading: testimonialsLoading } = useQuery<ApiResponse<Testimonial[]>>({
    queryKey: ['/api/testimonials'],
  });

  const { data: serverStatusData, isLoading: serverStatusLoading, refetch: refetchServerStatus } = useQuery<ApiResponse<ServerNode[]>>({
    queryKey: ['/api/server-status'],
  });

  // Filter plans by type for the featured section
  const featuredPlans = !plansLoading && plansData?.data
    ? {
        minecraft: plansData.data.find(p => p.type === PlanType.MINECRAFT && p.isPopular),
        vps: plansData.data.find(p => p.type === PlanType.VPS && p.isPopular),
        discordBot: plansData.data.find(p => p.type === PlanType.DISCORD_BOT && p.isPopular),
        webHosting: plansData.data.find(p => p.type === PlanType.WEB_HOSTING && p.isPopular)
      }
    : null;

  return (
    <>
      <Hero 
        title="Elevate Your Projects with Enterprise-Grade Hosting"
        subtitle="Experience lightning-fast performance, rock-solid reliability, and exceptional support. Your success is our priority with 99.9% uptime guarantee."
        tagline="India's Cheapest & Fastest Hosting Provider"
      />

      {/* Services Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="OUR SERVICES"
            title="Premium Hosting Solutions"
            description="Discover our range of high-performance hosting options designed to meet all your project requirements."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plansLoading ? (
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="bg-muted animate-pulse h-96 rounded-xl"></div>
              ))
            ) : (
              <>
                {/* VPS Hosting */}
                <PlanCard 
                  id={featuredPlans?.vps?.id || "vps"}
                  name="VPS Hosting"
                  description="High-performance virtual private servers with dedicated resources and full root access."
                  price={featuredPlans?.vps?.price || 999}
                  currency={featuredPlans?.vps?.currency || "$"}
                  period={featuredPlans?.vps?.period || "mo"}
                  features={[
                    { id: "1", name: "Dedicated CPU & RAM" },
                    { id: "2", name: "SSD Storage" },
                    { id: "3", name: "Root Access" }
                  ]}
                  icon={<Server className="h-12 w-12 text-primary" />}
                  buttonText="View Plans"
                  buttonLink="/vps-plans"
                />

                {/* Game Servers */}
                <PlanCard 
                  id={featuredPlans?.minecraft?.id || "minecraft"}
                  name="Game Servers"
                  description="Optimized hosting for popular games with low latency and high performance."
                  price={featuredPlans?.minecraft?.price || 25}
                  currency={featuredPlans?.minecraft?.currency || "$"}
                  period={featuredPlans?.minecraft?.period || "mo"}
                  features={[
                    { id: "1", name: "Low Latency Network" },
                    { id: "2", name: "Easy Control Panel" },
                    { id: "3", name: "DDoS Protection" }
                  ]}
                  icon={<Network className="h-12 w-12 text-primary" />}
                  isPopular={true}
                  buttonText="View Plans"
                  buttonLink="/minecraft-plans"
                />

                {/* Discord Bot Hosting */}
                <PlanCard 
                  id={featuredPlans?.discordBot?.id || "discord-bot"}
                  name="Discord Bot Hosting"
                  description="Reliable hosting for Discord bots with 24/7 uptime and automatic restarts."
                  price={featuredPlans?.discordBot?.price || 15}
                  currency={featuredPlans?.discordBot?.currency || "$"}
                  period={featuredPlans?.discordBot?.period || "mo"}
                  features={[
                    { id: "1", name: "24/7 Uptime" },
                    { id: "2", name: "Auto-Restart" },
                    { id: "3", name: "Easy Deployment" }
                  ]}
                  icon={<FaDiscord className="h-12 w-12 text-primary" />}
                  buttonText="View Plans"
                  buttonLink="/discord-bot-plans"
                />

                {/* Web Hosting */}
                <PlanCard 
                  id={featuredPlans?.webHosting?.id || "web-hosting"}
                  name="Web Hosting"
                  description="Fast and reliable web hosting with easy management and scalable resources."
                  price={featuredPlans?.webHosting?.price || 7.99}
                  currency={featuredPlans?.webHosting?.currency || "$"}
                  period={featuredPlans?.webHosting?.period || "mo"}
                  features={[
                    { id: "1", name: "Free SSL Certificates" },
                    { id: "2", name: "One-Click Installs" },
                    { id: "3", name: "99.9% Uptime" }
                  ]}
                  icon={<Globe className="h-12 w-12 text-primary" />}
                  isComingSoon={true}
                  buttonText="View Plans"
                  buttonLink="/web-hosting-plans"
                />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Infrastructure"
            description="Our infrastructure is designed to provide the highest level of performance and reliability."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PerformanceCard
              title="Uptime Guarantee"
              value="99.9%"
              description="Our servers maintain a consistent 99.9% uptime, ensuring your services are always available."
              icon={<Check className="h-8 w-8 text-primary" />}
            />

            <PerformanceCard
              title="Response Time"
              value="25ms"
              description="Fast response times with an average of just 25ms, providing a seamless experience."
              icon={<Check className="h-8 w-8 text-secondary" />}
              iconBgColor="bg-secondary/20"
            />

            <PerformanceCard
              title="Security Rating"
              value="A+"
              description="Top-tier security measures with A+ security ratings from independent security auditors."
              icon={<Shield className="h-8 w-8 text-primary" />}
            />
          </div>
        </div>
      </section>

      {/* This section was removed as requested */}

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="TESTIMONIALS"
            title="What Our Clients Say"
            description="Don't just take our word for it. Here's what our customers have to say about our services."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsLoading ? (
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-muted animate-pulse h-64 rounded-xl"></div>
              ))
            ) : (
              testimonialsData?.data?.slice(0, 3).map(testimonial => (
                <TestimonialCard
                  key={testimonial.id}
                  id={testimonial.id}
                  quote={testimonial.quote}
                  authorName={testimonial.authorName}
                  authorPosition={testimonial.authorPosition}
                  authorCompany={testimonial.authorCompany}
                  authorImage={testimonial.authorImage}
                  rating={testimonial.rating}
                />
              ))
            )}
          </div>

          {/* Company list removed as requested */}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/50 to-secondary/50 rounded-2xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                  Ready to Experience Premium Hosting?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Join thousands of satisfied customers who trust our reliable hosting solutions. 
                  Get started today with our 7-day money-back guarantee.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button size="lg" asChild>
                    <Link href="/minecraft-plans">
                      Get Started
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="secondary"
                    onClick={() => window.open("https://discord.gg/sriyannodes", "_blank")}
                    className="flex items-center gap-2"
                  >
                    <FaDiscord className="h-5 w-5" />
                    Join Our Discord
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Attribution */}
      <div className="text-center py-4 text-muted-foreground text-sm">
        &lt;/&gt; Developed With ❤️ By Sriyan Nodes Team
      </div>
    </>
  );
};

export default Home;