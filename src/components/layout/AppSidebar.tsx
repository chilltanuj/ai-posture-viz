import { NavLink, useLocation } from "react-router-dom";
import { 
  Shield, 
  BarChart3, 
  CheckCircle2, 
  AlertTriangle, 
  GitBranch,
  ChevronRight
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: BarChart3,
    description: "Security overview",
  },
  {
    title: "Compliance Advisor",
    url: "/compliance",
    icon: CheckCircle2,
    description: "SOC2, ISO27001, GDPR",
  },
  {
    title: "Risk & Recommendations",
    url: "/risks",
    icon: AlertTriangle,
    description: "Security insights",
  },
  {
    title: "What-if Simulation",
    url: "/simulation",
    icon: GitBranch,
    description: "Scenario analysis",
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  return (
    <Sidebar className="border-r border-border bg-card">
      <SidebarContent>
        <div className="flex items-center gap-2 px-4 py-6 border-b border-border">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg">
            <Shield className="w-5 h-5 text-white" />
          </div>
          {open && (
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-foreground">SecureAI</h1>
              <p className="text-xs text-muted-foreground">Security Dashboard</p>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 group ${
                        isActive(item.url)
                          ? "bg-primary/10 text-primary border-l-4 border-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${
                        isActive(item.url) ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground"
                      }`} />
                      {open && (
                        <>
                          <div className="ml-3 flex-1">
                            <div className="text-sm font-medium">{item.title}</div>
                            <div className="text-xs text-muted-foreground">{item.description}</div>
                          </div>
                          <ChevronRight className={`w-4 h-4 transition-transform ${
                            isActive(item.url) ? "rotate-90 text-primary" : "text-muted-foreground"
                          }`} />
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}