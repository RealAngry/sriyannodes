import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { FaQuoteLeft } from "react-icons/fa";

export interface TestimonialProps {
  id: string;
  quote: string;
  authorName: string;
  authorPosition: string;
  authorCompany: string;
  authorImage?: string;
  rating: number;
  className?: string;
}

export function TestimonialCard({
  quote,
  authorName,
  authorPosition,
  authorCompany,
  authorImage,
  rating,
  className,
}: TestimonialProps) {
  return (
    <div className={cn("bg-card rounded-xl p-6 border border-border relative", className)}>
      <div className="absolute -top-4 left-6 text-primary text-3xl">
        <FaQuoteLeft />
      </div>
      <div className="pt-4">
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star 
              key={index} 
              className={cn(
                "h-5 w-5", 
                index < rating ? "text-yellow-400 fill-yellow-400" : "text-muted"
              )} 
            />
          ))}
        </div>
        <p className="text-foreground mb-6">
          "{quote}"
        </p>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-muted mr-3 flex items-center justify-center">
            {authorImage ? (
              <img src={authorImage} alt={authorName} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-primary font-bold">{authorName.charAt(0)}</span>
            )}
          </div>
          <div>
            <div className="font-medium text-foreground">{authorName}</div>
            <div className="text-xs text-muted-foreground">{authorPosition}, {authorCompany}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
