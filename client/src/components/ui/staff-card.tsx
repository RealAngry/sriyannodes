import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StaffMemberProps {
  id: string;
  name: string;
  position: string;
  bio: string;
  avatar?: string;
  skills: string[];
  isStaffOfMonth?: boolean;
  className?: string;
}

export function StaffCard({ 
  name, 
  position, 
  bio, 
  avatar, 
  skills,
  isStaffOfMonth = false,
  className 
}: StaffMemberProps) {
  return (
    <div className={cn(
      isStaffOfMonth 
        ? "relative bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl overflow-hidden border border-border p-1"
        : "bg-card rounded-xl overflow-hidden border border-border hover:border-primary transition duration-300",
      className
    )}>
      {isStaffOfMonth && (
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold py-1 px-3 rounded-full">
          Staff of the Month
        </div>
      )}
      
      <div className={cn(
        isStaffOfMonth ? "bg-card rounded-lg p-8" : "p-6 text-center"
      )}>
        <div className={cn(
          isStaffOfMonth 
            ? "flex flex-col md:flex-row items-center md:items-start" 
            : ""
        )}>
          <div className={cn(
            isStaffOfMonth 
              ? "w-24 h-24 rounded-full bg-muted border-4 border-primary mb-4 md:mb-0 md:mr-6 overflow-hidden flex-shrink-0" 
              : "w-20 h-20 rounded-full bg-muted border-2 border-secondary mb-4 mx-auto overflow-hidden"
          )}>
            {avatar ? (
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/70 to-secondary/70 flex items-center justify-center">
                <User className="text-white h-8 w-8" />
              </div>
            )}
          </div>
          
          <div className={cn(
            isStaffOfMonth ? "text-center md:text-left" : ""
          )}>
            <h3 className={cn(
              "font-heading font-bold text-foreground mb-1",
              isStaffOfMonth ? "text-2xl" : "text-lg"
            )}>
              {name}
            </h3>
            <div className="text-primary font-medium mb-3">{position}</div>
            <p className={cn(
              "text-muted-foreground mb-4",
              isStaffOfMonth ? "max-w-xl" : "text-sm"
            )}>
              {bio}
            </p>
            <div className={cn(
              "flex flex-wrap gap-2",
              isStaffOfMonth ? "justify-center md:justify-start" : "justify-center"
            )}>
              {skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-muted text-muted-foreground">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
