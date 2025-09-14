import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Shield, Clock, TrendingDown, Play, RotateCcw } from "lucide-react";

const scenarios = [
  {
    id: "patch-delay",
    name: "Delayed Patching (30 days)",
    description: "What if critical security patches are delayed by 30 days?",
    category: "Patch Management"
  },
  {
    id: "ransomware",
    name: "Ransomware Attack Simulation", 
    description: "Simulate a targeted ransomware attack on your infrastructure",
    category: "Threat Simulation"
  },
  {
    id: "insider-threat",
    name: "Insider Threat Scenario",
    description: "What if a privileged user account is compromised?",
    category: "Access Control"
  },
  {
    id: "supply-chain",
    name: "Supply Chain Compromise",
    description: "Impact of a compromised third-party dependency",
    category: "Third Party Risk"
  }
];

const simulationResults = {
  "patch-delay": {
    riskIncrease: 35,
    affectedSystems: 127,
    estimatedCost: "$50,000 - $150,000",
    timeline: "30 days",
    impacts: [
      { type: "Vulnerability Exposure", severity: "high", description: "15 critical vulnerabilities remain unpatched" },
      { type: "Compliance Violation", severity: "medium", description: "SOC 2 requirements not met" },
      { type: "Business Impact", severity: "medium", description: "Potential service disruption" }
    ],
    attackPath: [
      { step: 1, action: "Initial compromise via unpatched vulnerability", success: 85 },
      { step: 2, action: "Lateral movement to critical systems", success: 60 },
      { step: 3, action: "Data exfiltration or system disruption", success: 40 }
    ]
  }
};

export default function Simulation() {
  const [selectedScenario, setSelectedScenario] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const runSimulation = () => {
    if (!selectedScenario) return;
    
    setIsRunning(true);
    
    // Simulate analysis time
    setTimeout(() => {
      setResults(simulationResults[selectedScenario as keyof typeof simulationResults]);
      setIsRunning(false);
    }, 3000);
  };

  const resetSimulation = () => {
    setResults(null);
    setSelectedScenario("");
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground"; 
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">What-if Simulation</h1>
            <p className="text-muted-foreground mt-2">
              Analyze potential security scenarios and their impact on your organization
            </p>
          </div>
          
          <Button 
            onClick={resetSimulation} 
            variant="outline" 
            className="flex items-center gap-2"
            disabled={!results}
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        {/* Scenario Selection */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Select Simulation Scenario</h2>
          
          <div className="flex items-center gap-4 mb-6">
            <Select value={selectedScenario} onValueChange={setSelectedScenario}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Choose a scenario to simulate..." />
              </SelectTrigger>
              <SelectContent>
                {scenarios.map((scenario) => (
                  <SelectItem key={scenario.id} value={scenario.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{scenario.name}</span>
                      <span className="text-xs text-muted-foreground">{scenario.category}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              onClick={runSimulation}
              disabled={!selectedScenario || isRunning}
              className="flex items-center gap-2"
            >
              {isRunning ? (
                <>
                  <div className="w-4 h-4 animate-spin border-2 border-current border-t-transparent rounded-full" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run Simulation
                </>
              )}
            </Button>
          </div>

          {selectedScenario && !isRunning && !results && (
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-medium mb-2">
                {scenarios.find(s => s.id === selectedScenario)?.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {scenarios.find(s => s.id === selectedScenario)?.description}
              </p>
              <Badge variant="outline">
                {scenarios.find(s => s.id === selectedScenario)?.category}
              </Badge>
            </div>
          )}
        </Card>

        {/* Simulation Results */}
        {results && (
          <>
            {/* Impact Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 border-l-4 border-destructive">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingDown className="w-5 h-5 text-destructive" />
                  <span className="text-sm font-medium text-muted-foreground">Risk Increase</span>
                </div>
                <div className="text-2xl font-bold text-destructive">+{results.riskIncrease}%</div>
              </Card>

              <Card className="p-6 border-l-4 border-warning">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-warning" />
                  <span className="text-sm font-medium text-muted-foreground">Affected Systems</span>
                </div>
                <div className="text-2xl font-bold text-warning">{results.affectedSystems}</div>
              </Card>

              <Card className="p-6 border-l-4 border-primary">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Timeline</span>
                </div>
                <div className="text-2xl font-bold text-primary">{results.timeline}</div>
              </Card>

              <Card className="p-6 border-l-4 border-muted">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Estimated Cost</span>
                </div>
                <div className="text-lg font-bold text-foreground">{results.estimatedCost}</div>
              </Card>
            </div>

            {/* Detailed Impact Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Impact Analysis</h3>
                <div className="space-y-4">
                  {results.impacts.map((impact: any, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <Badge className={getSeverityColor(impact.severity)}>
                        {impact.severity}
                      </Badge>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{impact.type}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{impact.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Attack Path Visualization */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Attack Path Analysis</h3>
                <div className="space-y-4">
                  {results.attackPath.map((step: any) => (
                    <div key={step.step} className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{step.action}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={step.success} className="flex-1 h-2" />
                          <span className="text-xs text-muted-foreground">{step.success}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <h4 className="font-medium text-destructive mb-2">Key Findings</h4>
                  <p className="text-sm text-muted-foreground">
                    This scenario shows a high probability of successful initial compromise, 
                    emphasizing the critical need for timely patch management and defense-in-depth strategies.
                  </p>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}