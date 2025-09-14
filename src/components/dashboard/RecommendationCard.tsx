import { AlertTriangle, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  category: string;
  estimatedTime: string;
  impact: string;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  onAction?: (id: string) => void;
}

export function RecommendationCard({ recommendation, onAction }: RecommendationCardProps) {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="w-4 h-4" />;
      case "medium":
        return <Clock className="w-4 h-4" />;
      case "low":
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case "high":
        return "status-high";
      case "medium":
        return "status-medium";
      case "low":
        return "status-low";
      default:
        return "status-medium";
    }
  };

  return (
    <div className="dashboard-card group hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={getSeverityClass(recommendation.severity)}>
            {getSeverityIcon(recommendation.severity)}
            {recommendation.severity.toUpperCase()}
          </span>
          <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded-md">
            {recommendation.category}
          </span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {recommendation.title}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {recommendation.description}
      </p>

      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{recommendation.estimatedTime}</span>
        </div>
        <div className="font-medium text-primary">
          Impact: {recommendation.impact}
        </div>
      </div>

      <Button 
        variant="outline" 
        size="sm" 
        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        onClick={() => onAction?.(recommendation.id)}
      >
        Implement Fix
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}