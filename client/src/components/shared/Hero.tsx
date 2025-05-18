import { Button } from "@/components/ui/button";
import { Check, Server, Shield, Clock } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { Link } from "wouter";

interface HeroProps {
  title: string;
  subtitle: string;
  tagline?: string;
}

export function Hero({ title, subtitle, tagline }: HeroProps) {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-secondary/40 z-0"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute inset-0" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <div className="mb-2">
              {tagline && (
                <span className="inline-block bg-primary/20 text-primary font-medium text-sm py-1 px-3 rounded-full mb-4">
                  {tagline}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              {title.split(' ').map((word, index, arr) => 
                index === arr.length - 2 ? (
                  <span key={index} className="text-primary">{word} </span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
            </h1>
            <p className="text-muted-foreground text-lg mb-8">{subtitle}</p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/minecraft-plans">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" className="flex items-center gap-2" onClick={() => window.open("https://discord.gg/sriyannodes", "_blank")}>
                Join our Discord
                <FaDiscord className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-8 flex items-center flex-wrap gap-6">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span className="text-muted-foreground">99.9% Uptime</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-primary mr-2" />
                <span className="text-muted-foreground">24/7 Support</span>
              </div>
              <div className="flex items-center">
                <Server className="h-5 w-5 text-primary mr-2" />
                <span className="text-muted-foreground">Free Migration</span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground text-sm font-medium py-1 px-3 rounded-md z-10">
                High Performance
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground text-sm font-medium py-1 px-3 rounded-md z-10">
                Advanced Security
              </div>
              
              <div className="gradient-bg bg-card border border-muted rounded-xl p-8 w-full max-w-md h-64 flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <div className="text-secondary text-xl font-medium mb-4">Server Infrastructure</div>
                  <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                    <div className="bg-muted/50 rounded-lg p-3 border border-muted">
                      <Server className="text-primary text-lg mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground">SSD Storage</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 border border-muted">
                      <svg className="text-secondary text-lg mx-auto mb-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4M4 17h12m0 0l-4-4m4 4l-4 4"></path>
                      </svg>
                      <div className="text-sm text-muted-foreground">High Bandwidth</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 border border-muted">
                      <Shield className="text-primary text-lg mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground">DDoS Protection</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 border border-muted">
                      <svg className="text-secondary text-lg mx-auto mb-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      <div className="text-sm text-muted-foreground">Low Latency</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
