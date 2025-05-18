import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export interface PlanFeature {
  id: string;
  name: string;
}

export interface PlanProps {
  id: string;
  name: string;
  description: string;
  price: number; 
  currency: string;
  period: string;
  features: PlanFeature[];
  icon: React.ReactNode;
  isPopular?: boolean;
  isComingSoon?: boolean;
  className?: string;
  buttonText?: string;
  buttonLink?: string;
}

export function PlanCard({
  id,
  name,
  description,
  price,
  currency,
  period,
  features,
  icon,
  isPopular = false,
  isComingSoon = false,
  className,
  buttonText,
  buttonLink,
}: PlanProps) {
  const handleClick = () => {
    if (buttonLink) window.location.href = buttonLink;
  };
  
  return (
    <div className={cn(
      "bg-card rounded-xl border border-border overflow-hidden hover:border-primary transition duration-300 group relative",
      className
    )}>
      {isPopular && (
        <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground text-xs font-bold py-1 px-2 rounded-md">
          Popular
        </div>
      )}

      {isComingSoon && (
        <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground text-xs font-bold py-1 px-2 rounded-md">
          Coming Soon
        </div>
      )}

      <div className="bg-primary/10 p-4 flex items-center justify-center">
        {icon}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-heading font-bold text-foreground mb-3">{name}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>

        {!isComingSoon && (
          <div className="mb-5">
            <span className="text-2xl font-bold text-primary">{currency}{price}</span>
            <span className="text-muted-foreground">/{period}</span>
          </div>
        )}

        <div className="space-y-2 mb-5">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center">
              <Check className="h-5 w-5 text-primary mr-2" />
              <span className="text-muted-foreground">{feature.name}</span>
            </div>
          ))}
        </div>

        {isComingSoon ? (
          <Button className="w-full" variant="outline">
            Get Notified
          </Button>
        ) : (
          <Button 
            className="w-full" 
            variant="default"
            asChild={!!buttonLink}
          >
            {buttonLink ? (
              <Link href={buttonLink}>{buttonText || "Buy Now"}</Link>
            ) : (
              <span onClick={() => window.open("https://discord.gg/sriyannodes", "_blank")}>
                {buttonText || "Buy Now"}
              </span>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}