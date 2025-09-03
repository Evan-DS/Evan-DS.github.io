import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/home";
import NotFound from "./pages/not-found";
import AlgorithmDemoPage from "./pages/algorithm-demo";
import GraphicsDemoPage from "./pages/graphics-demo";
import SystemMonitorDemoPage from "./pages/system-monitor-demo";
import DatabaseAdminDemoPage from "./pages/database-admin-demo";
import ADManagementDemoPage from "./pages/ad-management-demo";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/demo/algorithms" component={AlgorithmDemoPage} />
      <Route path="/demo/graphics" component={GraphicsDemoPage} />
      <Route path="/demo/system-monitor" component={SystemMonitorDemoPage} />
      <Route path="/demo/database-admin" component={DatabaseAdminDemoPage} />
      <Route path="/demo/active-directory" component={ADManagementDemoPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
