import { useQuery } from "@tanstack/react-query";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PlanCard } from "@/components/ui/plan-card";
import { Button } from "@/components/ui/button";
import { Bot, Repeat, Clock } from "lucide-react";
import { Plan, PlanType, ApiResponse } from "@/lib/types";
import { FaDiscord } from "react-icons/fa";

const DISCORD_BOT_FEATURES = [
  { icon: <Clock className="h-6 w-6 text-primary" />, title: "24/7 Uptime", description: "Keep your Discord bot running continuously with our reliable hosting infrastructure." },
  { icon: <Repeat className="h-6 w-6 text-primary" />, title: "Auto-Restart", description: "Automatic restart if your bot crashes, ensuring continuous operation without manual intervention." },
  { icon: <Bot className="h-6 w-6 text-primary" />, title: "Easy Deployment", description: "Simple deployment process with support for major bot frameworks and programming languages." },
];

const DiscordBotPlans = () => {
  const { data: plansData, isLoading } = useQuery<ApiResponse<Plan[]>>({
    queryKey: ['/api/plans', { type: PlanType.DISCORD_BOT }],
  });

  const discordBotPlans = plansData?.data?.filter(plan => plan.type === PlanType.DISCORD_BOT);

  return (
    <>
      {/* Header */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Discord Bot Hosting"
            description="Reliable hosting solutions for Discord bots with 24/7 uptime and auto-restart."
            label="BOT HOSTING"
          />
        </div>
      </section>

      {/* Plans */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Discord Bot Hosting Plans"
            description="Choose the perfect plan for your Discord bot needs."
          />
          
          {/* Basic Bot Hosting */}
          <div className="mb-12">
            <h3 className="text-2xl font-heading font-bold text-primary mb-6 text-center">Basic Bot Hosting</h3>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Affordable hosting for simple Discord bots with essential features.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {isLoading ? (
                Array(2).fill(0).map((_, index) => (
                  <div key={index} className="bg-muted animate-pulse h-96 rounded-xl"></div>
                ))
              ) : (
                discordBotPlans?.filter(plan => !plan.isPopular)?.map(plan => (
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
                    icon={<FaDiscord className="h-12 w-12 text-primary" />}
                  />
                ))
              )}
            </div>
          </div>
          
          {/* Advanced Bot Hosting */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-secondary mb-6 text-center">Advanced Bot Hosting</h3>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Premium hosting for complex Discord bots with enhanced performance and additional features.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {isLoading ? (
                Array(2).fill(0).map((_, index) => (
                  <div key={index} className="bg-muted animate-pulse h-96 rounded-xl"></div>
                ))
              ) : (
                discordBotPlans?.filter(plan => plan.isPopular)?.map(plan => (
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
                    icon={<FaDiscord className="h-12 w-12 text-secondary" />}
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
            title="Discord Bot Hosting Features"
            description="Everything you need to keep your Discord bot running smoothly."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DISCORD_BOT_FEATURES.map((feature, index) => (
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

      {/* Supported Technologies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Supported Technologies"
            description="Our Discord bot hosting works with all major frameworks and languages."
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { name: "discord.js", logo: "fab fa-js", color: "text-yellow-400" },
              { name: "discord.py", logo: "fab fa-python", color: "text-blue-400" },
              { name: "JDA", logo: "fab fa-java", color: "text-red-400" },
              { name: "DSharpPlus", logo: "fab fa-microsoft", color: "text-purple-400" },
              { name: "Eris", logo: "fab fa-node-js", color: "text-green-400" },
              { name: "Serenity", logo: "fab fa-rust", color: "text-orange-400" },
              { name: "Discord.NET", logo: "fab fa-microsoft", color: "text-blue-500" },
              { name: "Custom Bots", logo: "fas fa-code", color: "text-pink-400" }
            ].map((tech, index) => (
              <div key={index} className="bg-card p-6 rounded-xl border border-border text-center">
                <i className={`${tech.logo} text-4xl ${tech.color} mb-4`}></i>
                <h4 className="font-medium text-foreground">{tech.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="How It Works"
            description="Getting your Discord bot up and running is easy with our platform."
          />
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Select a Plan",
                  description: "Choose a hosting plan that fits your Discord bot's requirements."
                },
                {
                  step: "2",
                  title: "Upload Your Bot",
                  description: "Upload your bot files or connect your GitHub repository to our platform."
                },
                {
                  step: "3",
                  title: "Go Live",
                  description: "Configure your bot, set up environment variables, and deploy with one click."
                }
              ].map((step, index) => (
                <div key={index} className="bg-background rounded-xl border border-border p-6 relative">
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3 mt-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Frequently Asked Questions"
            description="Common questions about our Discord bot hosting services."
          />
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "What languages do you support for Discord bots?",
                  answer: "We support all major programming languages for Discord bots, including JavaScript (discord.js), Python (discord.py), Java (JDA), C# (Discord.NET), and more."
                },
                {
                  question: "How does the auto-restart feature work?",
                  answer: "Our system monitors your bot continuously. If it crashes or goes offline for any reason, our platform automatically restarts it to ensure minimum downtime."
                },
                {
                  question: "Can I use a custom domain for my bot's dashboard?",
                  answer: "Yes, you can connect a custom domain to your bot's web dashboard if your bot has one. We provide easy configuration for custom domains."
                },
                {
                  question: "Do you provide support for bot development?",
                  answer: "While our primary focus is hosting, our support team can assist with deployment issues. For development-specific questions, we have a community forum where developers help each other."
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
            Launch Your Discord Bot Today
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get your bot up and running with our reliable, easy-to-use hosting platform.
          </p>
          <Button size="lg">Choose a Hosting Plan</Button>
        </div>
      </section>
    </>
  );
};

export default DiscordBotPlans;
