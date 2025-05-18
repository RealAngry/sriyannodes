import { ReactNode } from "react";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  BarChart,
  LogOut,
  ChevronRight
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [location, setLocation] = useLocation();
  const { user, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  const menuItems = [
    { path: "/admin", icon: <LayoutDashboard className="h-5 w-5 mr-2" />, label: "Dashboard" },
    { path: "/admin/plans", icon: <Package className="h-5 w-5 mr-2" />, label: "Plans" },
    { path: "/admin/staff", icon: <Users className="h-5 w-5 mr-2" />, label: "Staff" },
    { path: "/admin/analytics", icon: <BarChart className="h-5 w-5 mr-2" />, label: "Analytics" },
    { path: "/admin/settings", icon: <Settings className="h-5 w-5 mr-2" />, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border min-h-screen p-4 hidden md:block">
          <div className="mb-6">
            <Link href="/" className="flex items-center">
              <span className="font-heading font-bold text-xl">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">SriyanNodes</span>
              </span>
            </Link>
          </div>
          
          <div className="mb-6">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Main
            </div>
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link href={item.path}>
                    <a
                      className={`flex items-center px-3 py-2 rounded-md ${
                        location === item.path
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.icon}
                      <span className="text-sm">{item.label}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Account
            </div>
            <button
              onClick={logout}
              className="flex items-center text-muted-foreground hover:text-foreground px-3 py-2 rounded-md w-full text-left"
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="w-full md:hidden bg-card border-b border-border p-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <span className="font-heading font-bold text-xl">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">SriyanNodes</span>
              </span>
            </Link>
            <div className="flex items-center">
              <button
                onClick={logout}
                className="ml-2 flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="flex overflow-x-auto space-x-2 py-2 no-scrollbar">
            {menuItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <a
                  className={`flex items-center px-3 py-2 rounded-md whitespace-nowrap ${
                    location === item.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </a>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-6 text-sm text-muted-foreground">
              <Link href="/admin">Admin</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-foreground">{menuItems.find(item => item.path === location)?.label || "Dashboard"}</span>
            </div>
            
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
