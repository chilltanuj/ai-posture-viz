import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MessageCircle, Download, CheckCircle2, AlertCircle, Clock } from "lucide-react";

const complianceFrameworks = [
  {
    name: "SOC 2 Type II",
    status: "compliant",
    score: 92,
    controls: { total: 64, passed: 59, failed: 3, pending: 2 },
    lastAudit: "2024-01-15"
  },
  {
    name: "ISO 27001",
    status: "partial",
    score: 78,
    controls: { total: 114, passed: 89, failed: 15, pending: 10 },
    lastAudit: "2023-11-20"
  },
  {
    name: "GDPR",
    status: "needs-attention",
    score: 65,
    controls: { total: 32, passed: 21, failed: 8, pending: 3 },
    lastAudit: "2024-02-01"
  }
];

const checklistItems = [
  {
    id: "1",
    category: "Access Controls",
    title: "Multi-factor authentication implemented",
    status: "completed",
    framework: ["SOC2", "ISO27001"],
    description: "All user accounts require MFA for access"
  },
  {
    id: "2", 
    category: "Data Protection",
    title: "Data encryption at rest and in transit",
    status: "completed",
    framework: ["SOC2", "ISO27001", "GDPR"],
    description: "AES-256 encryption implemented across all systems"
  },
  {
    id: "3",
    category: "Privacy Rights",
    title: "Data subject request process",
    status: "pending",
    framework: ["GDPR"],
    description: "Automated process for handling data subject access requests"
  },
  {
    id: "4",
    category: "Incident Response",
    title: "Security incident response plan",
    status: "needs-review",
    framework: ["SOC2", "ISO27001"],
    description: "Document and test incident response procedures"
  }
];

export default function Compliance() {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "bg-success text-success-foreground";
      case "partial":
        return "bg-warning text-warning-foreground";
      case "needs-attention":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "pending":
        return <Clock className="w-4 h-4 text-warning" />;
      case "needs-review":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Compliance Advisor</h1>
            <p className="text-muted-foreground mt-2">
              Monitor compliance across SOC 2, ISO 27001, and GDPR frameworks
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setChatOpen(!chatOpen)}
              className="flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Compliance Assistant
            </Button>
            <Button className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Compliance Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {complianceFrameworks.map((framework) => (
            <Card 
              key={framework.name} 
              className="p-6 cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => setSelectedFramework(framework.name)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{framework.name}</h3>
                <Badge className={getStatusColor(framework.status)}>
                  {framework.status.replace('-', ' ')}
                </Badge>
              </div>
              
              <div className="text-3xl font-bold text-foreground mb-2">
                {framework.score}%
              </div>
              
              <Progress value={framework.score} className="mb-4" />
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span>{framework.controls.passed} Passed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-destructive rounded-full"></div>
                  <span>{framework.controls.failed} Failed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <span>{framework.controls.pending} Pending</span>
                </div>
                <div className="text-muted-foreground">
                  Last audit: {new Date(framework.lastAudit).toLocaleDateString()}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Compliance Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Compliance Checklist</h2>
              
              <Accordion type="single" collapsible className="space-y-2">
                {checklistItems.map((item) => (
                  <AccordionItem key={item.id} value={item.id} className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        {getStatusIcon(item.status)}
                        <div className="flex-1">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.category} • {item.framework.join(", ")}
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-4 pb-2">
                        <p className="text-sm text-muted-foreground mb-3">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-2">
                          {item.framework.map((fw) => (
                            <Badge key={fw} variant="outline" className="text-xs">
                              {fw}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>

          {/* Chatbot Panel */}
          <div className={`transition-all duration-300 ${chatOpen ? 'block' : 'hidden'}`}>
            <Card className="p-6 h-96">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Compliance Assistant
              </h3>
              
              <div className="bg-muted rounded-lg p-4 mb-4 text-sm">
                <p className="font-medium mb-2">🤖 AI Assistant:</p>
                <p>I can help explain compliance gaps and suggest remediation steps. What would you like to know about your compliance posture?</p>
              </div>
              
              <div className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start text-left">
                  Why is my GDPR score low?
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-left">
                  How to improve SOC 2 compliance?
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-left">
                  What are the priority items?
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}