import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  badges?: Array<{
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  }>;
  className?: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  icon: Icon,
  badges = [],
  className = "",
  children,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`py-16 px-4 bg-gradient-to-br from-primary/5 to-accent/5 ${className}`}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
            {Icon && <Icon className="h-8 w-8 text-primary" />}
            {title}
          </h1>
          {description && (
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {description}
            </p>
          )}
          {badges.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {badges.map((badge, index) => (
                <Badge
                  key={index}
                  variant={badge.variant || "outline"}
                  className="text-sm"
                >
                  {badge.text}
                </Badge>
              ))}
            </div>
          )}
          {children}
        </div>
      </div>
    </motion.section>
  );
};

export default PageHeader;
