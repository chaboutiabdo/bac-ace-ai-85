import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  School, 
  FileText, 
  TrendingUp, 
  Activity,
  PlusCircle,
  Eye
} from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";

export function AdminOverview() {
  const recentActivities = [
    { action: "New student registered", user: "Ahmed Benali", time: "2 minutes ago" },
    { action: "Exam uploaded", user: "Admin", time: "1 hour ago" },
    { action: "School added", user: "Admin", time: "3 hours ago" },
    { action: "Student completed quiz", user: "Fatima Zohra", time: "5 hours ago" },
  ];

  const topSchools = [
    { name: "Lycée Mohamed Boudiaf", students: 245, completion: 87 },
    { name: "Lycée Ibn Khaldoun", students: 198, completion: 92 },
    { name: "Lycée El Houria", students: 156, completion: 79 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View Reports
          </Button>
          <Button className="gradient-primary text-white" size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value="2,847"
          subtitle="Active learners"
          icon={Users}
          variant="default"
          trend={{ value: "+12% this month", isPositive: true }}
        />
        <StatsCard
          title="Schools"
          value="47"
          subtitle="Registered schools"
          icon={School}
          variant="success"
          trend={{ value: "+3 new schools", isPositive: true }}
        />
        <StatsCard
          title="Exams Available"
          value="1,234"
          subtitle="BAC papers"
          icon={FileText}
          variant="accent"
          trend={{ value: "+25 this week", isPositive: true }}
        />
        <StatsCard
          title="Platform Usage"
          value="94%"
          subtitle="Student engagement"
          icon={TrendingUp}
          variant="warning"
          trend={{ value: "+5% vs last month", isPositive: true }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start justify-between space-x-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">by {activity.user}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.time}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Schools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <School className="h-5 w-5" />
              Top Schools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSchools.map((school, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{school.name}</p>
                      <p className="text-xs text-muted-foreground">{school.students} students</p>
                    </div>
                    <Badge 
                      variant={school.completion >= 85 ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {school.completion}% completion
                    </Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-success h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${school.completion}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              <span>Add Student</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <School className="h-6 w-6" />
              <span>Add School</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <FileText className="h-6 w-6" />
              <span>Upload Exam</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <TrendingUp className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}