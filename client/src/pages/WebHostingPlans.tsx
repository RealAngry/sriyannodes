import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Globe, Lock, Zap } from "lucide-react";

const WebHostingPlans = () => {
  return (
    <>
      {/* Header */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Web Hosting"
            description="Fast and reliable web hosting services coming soon."
            label="COMING SOON"
          />
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Web Hosting Plans
              <span className="text-primary"> Coming Soon</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              We're currently building our web hosting platform with features designed for speed, reliability, and ease of use. Be the first to know when we launch!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="p-3 bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Fast Performance</h3>
                <p className="text-muted-foreground">SSD storage and optimized servers for lightning-fast load times.</p>
              </div>
              
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="p-3 bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Free SSL</h3>
                <p className="text-muted-foreground">Secure your site with free SSL certificates included with all plans.</p>
              </div>
              
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="p-3 bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">One-Click Apps</h3>
                <p className="text-muted-foreground">Install WordPress, Joomla, and other apps with just one click.</p>
              </div>
              
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="p-3 bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">99.9% Uptime</h3>
                <p className="text-muted-foreground">We guarantee 99.9% uptime for all web hosting plans.</p>
              </div>
            </div>
            
            <div className="bg-card p-8 rounded-xl border border-border max-w-md mx-auto">
              <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                Get Notified at Launch
              </h3>
              <p className="text-muted-foreground mb-6">
                Subscribe to be notified when our web hosting services become available.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input placeholder="Your email address" type="email" className="flex-1" />
                <Button>Notify Me</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                We respect your privacy and will never share your email with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Anticipated Plans Preview */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Anticipated Plans"
            description="Here's what you can expect from our upcoming web hosting plans."
          />
          
          {/* Standard Web Hosting */}
          <div className="mb-12">
            <h3 className="text-2xl font-heading font-bold text-primary mb-6 text-center">Standard Web Hosting</h3>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Perfect for personal websites, blogs, and small business sites with essential features.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  name: "Starter",
                  price: "$4.99",
                  features: [
                    "1 Website",
                    "10 GB SSD Storage",
                    "Unmetered Bandwidth",
                    "Free SSL Certificate",
                    "1-Click WordPress Install",
                    "24/7 Support"
                  ]
                },
                {
                  name: "Basic Plus",
                  price: "$6.99",
                  features: [
                    "5 Websites",
                    "20 GB SSD Storage",
                    "Unmetered Bandwidth",
                    "Free SSL Certificate",
                    "1-Click WordPress Install",
                    "24/7 Support"
                  ]
                }
              ].map((plan, index) => (
                <div key={index} className="bg-background rounded-xl border border-border overflow-hidden relative">
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-primary">{plan.price}</span>
                      <span className="text-muted-foreground">/mo</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full" disabled>Coming Soon</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Premium Web Hosting */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-secondary mb-6 text-center">Premium Web Hosting</h3>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Advanced hosting for business websites, e-commerce stores, and high-traffic applications.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  name: "Professional",
                  price: "$9.99",
                  popular: true,
                  features: [
                    "Unlimited Websites",
                    "25 GB SSD Storage",
                    "Unmetered Bandwidth",
                    "Free SSL Certificate",
                    "1-Click WordPress Install",
                    "Free Domain for 1 Year",
                    "24/7 Support"
                  ]
                },
                {
                  name: "Business",
                  price: "$14.99",
                  features: [
                    "Unlimited Websites",
                    "100 GB SSD Storage",
                    "Unmetered Bandwidth",
                    "Free SSL Certificate",
                    "1-Click WordPress Install",
                    "Free Domain for 1 Year",
                    "Free CDN",
                    "Priority Support"
                  ]
                }
              ].map((plan, index) => (
                <div key={index} className={`bg-background rounded-xl border ${plan.popular ? 'border-secondary' : 'border-border'} overflow-hidden relative`}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-xs font-bold py-1 px-3">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-secondary">{plan.price}</span>
                      <span className="text-muted-foreground">/mo</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full" disabled>Coming Soon</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Register Interest */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-primary/50 to-secondary/50 rounded-2xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                  Register Your Interest Today
                </h2>
                <p className="text-lg text-foreground/80 mb-8">
                  We're working hard to bring you the best web hosting experience. Sign up for updates and be the first to access our early-bird special offers.
                </p>
                <Button size="lg" variant="secondary" asChild>
                  <a href="#notify">Get Early Access</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WebHostingPlans;
