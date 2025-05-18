import { useQuery } from "@tanstack/react-query";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { ServerStatusCard } from "@/components/ui/server-status-card";
import AdminLayout from "./AdminLayout";
import { Plan, PlanType, StaffMember, ServerNode, ApiResponse } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [, setLocation] = useLocation();
  const { user, isLoading: authLoading } = useAuth();

  // Redirect if not logged in
  useEffect(() => {
    if (!user && !authLoading) {
      setLocation("/login");
    }
  }, [user, authLoading, setLocation]);

  const { data: plansData, isLoading: plansLoading } = useQuery<ApiResponse<Plan[]>>({
    queryKey: ['/api/plans'],
  });

  const { data: staffData, isLoading: staffLoading } = useQuery<ApiResponse<StaffMember[]>>({
    queryKey: ['/api/staff'],
  });

  const { data: serverStatusData, isLoading: serverStatusLoading, refetch: refetchServerStatus } = useQuery<ApiResponse<ServerNode[]>>({
    queryKey: ['/api/server-status'],
  });
  
  // Performance metrics data for chart
  const performanceData = [
    { date: 'Apr 1', uptime: 99.9, response: 25, traffic: 70 },
    { date: 'Apr 5', uptime: 99.8, response: 28, traffic: 75 },
    { date: 'Apr 10', uptime: 100, response: 22, traffic: 68 },
    { date: 'Apr 15', uptime: 99.9, response: 24, traffic: 72 },
    { date: 'Apr 20', uptime: 99.7, response: 27, traffic: 80 },
    { date: 'Apr 25', uptime: 99.9, response: 23, traffic: 76 },
    { date: 'Apr 30', uptime: 100, response: 21, traffic: 73 },
  ];

  // Calculate summary counts
  const planCount = plansData?.data?.length || 0;
  const staffCount = staffData?.data?.length || 0;
  const activeServerCount = serverStatusData?.data?.filter(node => node.isOperational).length || 0;

  if (authLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <AdminLayout>
      <SectionHeading
        title="Admin Dashboard"
        description="Manage your hosting services, staff, and monitor performance."
        align="left"
      />
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{planCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Servers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeServerCount} / {serverStatusData?.data?.length || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Staff Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staffCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Performance Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Monthly Performance Report</CardTitle>
          <p className="text-sm text-muted-foreground">Last 30 days of server performance metrics</p>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                    color: 'hsl(var(--foreground))'
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="uptime" stroke="hsl(var(--chart-1))" strokeWidth={2} activeDot={{ r: 8 }} name="Uptime %" />
                <Line type="monotone" dataKey="response" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Response Time (ms)" />
                <Line type="monotone" dataKey="traffic" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Traffic %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Server Status */}
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Server Status</h2>
        
        {serverStatusLoading ? (
          <div className="bg-muted animate-pulse h-96 rounded-xl"></div>
        ) : (
          serverStatusData?.data && (
            <ServerStatusCard
              nodes={serverStatusData.data}
              lastUpdated={new Date().toLocaleString()}
              onRefresh={() => refetchServerStatus()}
              isLoading={serverStatusLoading}
            />
          )
        )}
      </div>
      
      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "New plan created", user: "Admin", time: "5 minutes ago" },
              { action: "Staff member updated", user: "Admin", time: "2 hours ago" },
              { action: "Server restarted", user: "System", time: "1 day ago" },
              { action: "New testimonial added", user: "Admin", time: "2 days ago" },
            ].map((activity, index) => (
              <div key={index} className="flex justify-between items-center border-b border-border pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">By {activity.user}</p>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminDashboard;
