
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  label?: string;
}

export function SectionHeading({ title, description, label }: SectionHeadingProps) {
  return (
    <div className="text-center mb-12">
      {label && (
        <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">{title}</h2>
      {description && <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{description}</p>}
    </div>
  );
}
