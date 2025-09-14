import { useEffect, useState } from "react";

interface RiskScoreMeterProps {
  score: number;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export function RiskScoreMeter({ score, size = "md", animated = true }: RiskScoreMeterProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedScore(score);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setAnimatedScore(score);
    }
  }, [score, animated]);

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };
  
  const getStrokeColor = (score: number) => {
    if (score >= 80) return "stroke-success";
    if (score >= 60) return "stroke-warning";
    return "stroke-destructive";
  };

  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-48 h-48"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl"
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <svg
        className="transform -rotate-90 w-full h-full"
        viewBox="0 0 100 100"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="hsl(var(--border))"
          strokeWidth="8"
          fill="transparent"
          className="opacity-20"
        />
        
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`transition-all duration-1000 ease-out ${getStrokeColor(animatedScore)}`}
        />
      </svg>
      
      {/* Score text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className={`font-bold ${textSizes[size]} ${getScoreColor(animatedScore)}`}>
          {Math.round(animatedScore)}
        </div>
        <div className="text-xs text-muted-foreground font-medium">
          SECURITY SCORE
        </div>
      </div>
    </div>
  );
}