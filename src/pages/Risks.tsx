import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle, Shield, Clock, TrendingUp, ArrowRight } from "lucide-react";

const riskData = [
  { category: "Access Control", high: 3, medium: 7, low: 12, industry: 8 },
  { category: "Data Protection", high: 1, medium: 4, low: 8, industry: 6 },
  { category: "Network Security", high: 2, medium: 5, low: 6, industry: 7 },
  { category: "Incident Response", high: 0, medium: 2, low: 5, industry: 4 },
  { category: "Asset Management", high: 1, medium: 3, low: 9, industry: 5 },
];

const riskCategories = [
  {
    id: "1",
    category: "Critical Infrastructure",
    level: "high",
    count: 3,
    trend: "up",
    description: "Vulnerabilities in core systems that could lead to service disruption",
    risks: [
      {
        title: "Unpatched Database Server",
        description: "Critical security patches missing on production database server",
        impact: "Service disruption, data breach risk",
        remediation: "Apply security patches during next maintenance window",
        effort: "2 hours",
        cost: "Low"
      },
      {
        title: "Weak Admin Passwords", 
        description: "Admin accounts using passwords that don't meet security policy",
        impact: "Unauthorized access to critical systems",
        remediation: "Enforce password policy and enable MFA",
        effort: "1 hour",
        cost: "Low"
      }
    ]
  },
  {
    id: "2",
    category: "Data Security",
    level: "medium",
    count: 8,
    trend: "down",
    description: "Issues related to data protection and privacy compliance",
    risks: [
      {
        title: "Unencrypted Data Storage",
        description: "Personal data stored without encryption in legacy systems",
        impact: "GDPR compliance violation, potential fines",
        remediation: "Implement encryption for data at rest",
        effort: "1 week",
        cost: "Medium"
      }
    ]
  },
  {
    id: "3",
    category: "Network Vulnerabilities",
    level: "low",
    count: 15,
    trend: "stable",
    description: "Network-related security gaps and misconfigurations",
    risks: [
      {
        title: "Open Network Ports",
        description: "Several unused network ports remain open",
        impact: "Potential attack surface expansion",
        remediation: "Close unused ports and update firewall rules",
        effort: "30 minutes",
        cost: "Low"
      }
    ]
  }
];

const benchmarkData = [
  { category: "Overall Security", yourScore: 85, industry: 72 },
  { category: "Access Controls", yourScore: 90, industry: 78 },
  { category: "Data Protection", yourScore: 82, industry: 74 },
  { category: "Compliance", yourScore: 88, industry: 69 },
  { category: "Incident Response", yourScore: 75, industry: 71 },
];

export default function Risks() {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getRiskBg = (level: string) => {
    switch (level) {
      case "high": return "bg-destructive/10 border-destructive/20";
      case "medium": return "bg-warning/10 border-warning/20";
      case "low": return "bg-success/10 border-success/20";
      default: return "bg-muted/10 border-muted/20";
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-destructive" />;
    if (trend === "down") return <TrendingUp className="w-4 h-4 text-success rotate-180" />;
    return <div className="w-4 h-4" />;
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Risk & Recommendations</h1>
          <p className="text-muted-foreground mt-2">
            AI-powered risk assessment with actionable security recommendations
          </p>
        </div>

        {/* Risk Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {riskCategories.map((category) => (
            <Card key={category.id} className={`p-6 border-l-4 ${getRiskBg(category.level)}`}>
              <div className="flex items-center justify-between mb-3">
                <Badge className={`${category.level === 'high' ? 'bg-destructive' : category.level === 'medium' ? 'bg-warning' : 'bg-success'} text-white`}>
                  {category.level.toUpperCase()} RISK
                </Badge>
                {getTrendIcon(category.trend)}
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {category.category}
              </h3>
              
              <div className="text-2xl font-bold mb-2 flex items-center gap-2">
                <span className={getRiskColor(category.level)}>{category.count}</span>
                <span className="text-sm font-normal text-muted-foreground">issues</span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                {category.description}
              </p>
              
              <Button variant="outline" size="sm" className="w-full">
                View Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          ))}
        </div>

        {/* Risk Details Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Risk Categories</h2>
            
            <Accordion type="single" collapsible className="space-y-2">
              {riskCategories.map((category) => (
                <AccordionItem key={category.id} value={category.id} className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <AlertTriangle className={`w-5 h-5 ${getRiskColor(category.level)}`} />
                      <div className="flex-1">
                        <div className="font-medium">{category.category}</div>
                        <div className="text-sm text-muted-foreground">
                          {category.count} issues • {category.level} risk
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-4 space-y-4">
                      {category.risks.map((risk, index) => (
                        <div key={index} className="bg-muted/50 rounded-lg p-4">
                          <h4 className="font-medium mb-2">{risk.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{risk.description}</p>
                          
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <span className="font-medium">Impact:</span>
                              <p className="text-muted-foreground">{risk.impact}</p>
                            </div>
                            <div>
                              <span className="font-medium">Remediation:</span>
                              <p className="text-muted-foreground">{risk.remediation}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span className="text-xs">{risk.effort}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Shield className="w-3 h-3" />
                              <span className="text-xs">Cost: {risk.cost}</span>
                            </div>
                            <Button size="sm" className="ml-auto">
                              Fix Now
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          {/* Industry Benchmark Chart */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Industry Benchmark</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Compare your security posture against industry averages
            </p>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={benchmarkData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
                <XAxis 
                  dataKey="category" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="yourScore" name="Your Score" fill="hsl(var(--primary))" radius={4} />
                <Bar dataKey="industry" name="Industry Average" fill="hsl(var(--muted))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="flex items-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>Your Score</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-muted rounded-full"></div>
                <span>Industry Average</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}