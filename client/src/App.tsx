import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import MinecraftPlans from "@/pages/MinecraftPlans";
import VpsPlans from "@/pages/VpsPlans";
import DiscordBotPlans from "@/pages/DiscordBotPlans";
import WebHostingPlans from "@/pages/WebHostingPlans";
import Staff from "@/pages/Staff";
import Login from "@/pages/Login";
import AdminDashboard from "@/pages/Admin/Dashboard";
import AdminPlans from "@/pages/Admin/Plans";
import AdminStaffManagement from "@/pages/Admin/StaffManagement";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/minecraft-plans" component={MinecraftPlans} />
      <Route path="/vps-plans" component={VpsPlans} />
      <Route path="/discord-bot-plans" component={DiscordBotPlans} />
      <Route path="/web-hosting-plans" component={WebHostingPlans} />
      <Route path="/staff" component={Staff} />
      <Route path="/login" component={Login} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/plans" component={AdminPlans} />
      <Route path="/admin/staff" component={AdminStaffManagement} />
      <Route path="/terms" component={Terms} />
      <Route path="/refund-policy" component={RefundPolicy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  // Check if the current path is an admin route
  const isAdminRoute = window.location.pathname.startsWith('/admin');
  const isLoginPage = window.location.pathname === '/login';

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {(isAdminRoute || isLoginPage) ? (
          <Router />
        ) : (
          <MainLayout>
            <Router />
          </MainLayout>
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;