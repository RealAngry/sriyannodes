import { cn } from "@/lib/utils";

interface PerformanceCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  className?: string;
}

export function PerformanceCard({
  title,
  value,
  description,
  icon,
  iconBgColor = "bg-primary/20",
  className,
}: PerformanceCardProps) {
  return (
    <div className={cn("bg-card rounded-xl p-8 text-center", className)}>
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className={cn("absolute inset-0 rounded-full flex items-center justify-center", iconBgColor)}>
          <span className="text-xl font-bold text-primary">{value}</span>
        </div>
        <svg className="absolute inset-0" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="100" strokeDashoffset="0" className="text-muted" />
          <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="100" strokeDashoffset="25" transform="rotate(-90 18 18)" className="text-primary" />
        </svg>
      </div>
      <h3 className="text-xl font-heading font-bold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
