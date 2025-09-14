import { AppLayout } from "@/components/layout/AppLayout";
import { RiskScoreMeter } from "@/components/dashboard/RiskScoreMeter";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { Shield, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

const mockRecommendations = [
  {
    id: "1",
    title: "Enable MFA for Admin Accounts",
    description: "Multi-factor authentication is not enabled for 3 administrator accounts. This creates a significant security vulnerability.",
    severity: "high" as const,
    category: "Access Control",
    estimatedTime: "15 minutes",
    impact: "High"
  },
  {
    id: "2", 
    title: "Update Firewall Rules",
    description: "Several outdated firewall rules allow unnecessary network access. Consider updating or removing these rules.",
    severity: "medium" as const,
    category: "Network Security",
    estimatedTime: "30 minutes",
    impact: "Medium"
  },
  {
    id: "3",
    title: "Apply Security Patches",
    description: "16 systems are missing critical security patches from the last 30 days.",
    severity: "high" as const,
    category: "Patch Management",
    estimatedTime: "2 hours",
    impact: "High"
  }
];

const Index = () => {
  const handleRecommendationAction = (id: string) => {
    console.log("Implementing recommendation:", id);
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Security Dashboard</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered security posture management with real-time threat assessment and compliance monitoring
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="metric-card text-center">
            <div className="flex items-center justify-center mb-4">
              <RiskScoreMeter score={85} size="sm" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Overall Score</h3>
            <p className="text-sm text-muted-foreground">Strong security posture</p>
          </div>

          <div className="metric-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">156</div>
                <div className="text-sm text-muted-foreground">Controls Passed</div>
              </div>
            </div>
            <div className="text-xs text-success">+12 since last week</div>
          </div>

          <div className="metric-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">23</div>
                <div className="text-sm text-muted-foreground">Active Risks</div>
              </div>
            </div>
            <div className="text-xs text-warning">-5 since last week</div>
          </div>

          <div className="metric-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">94%</div>
                <div className="text-sm text-muted-foreground">Compliance Rate</div>
              </div>
            </div>
            <div className="text-xs text-success">+2% this month</div>
          </div>
        </div>

        {/* Charts and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-1">
            <TrendChart />
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">AI Recommendations</h2>
              <span className="text-sm text-muted-foreground">{mockRecommendations.length} pending</span>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {mockRecommendations.map((recommendation) => (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation}
                  onAction={handleRecommendationAction}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Large Risk Score Display */}
        <div className="dashboard-card text-center py-12">
          <h2 className="text-3xl font-bold text-foreground mb-8">Current Security Posture</h2>
          <div className="flex items-center justify-center">
            <RiskScoreMeter score={85} size="lg" />
          </div>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Your organization maintains a <strong className="text-success">strong security posture</strong> with 
            room for improvement in access controls and patch management.
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
