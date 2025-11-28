import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  FileText, 
  Upload,
  TrendingUp,
  Settings,
  Trash2
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { cn } from "../lib/utils";

const notifications = [
  {
    id: 1,
    type: "request",
    title: "New portability request received",
    message: "Policy #POL-2024-1234 from Star Health Insurance",
    time: "5 min ago",
    read: false,
    priority: "high",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    id: 2,
    type: "completion",
    title: "Bulk upload completed",
    message: "150 policies processed successfully with 5 errors",
    time: "1 hour ago",
    read: false,
    priority: "medium",
    icon: Upload,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    id: 3,
    type: "pending",
    title: "Pending approval required",
    message: "12 policies awaiting your response - SLA approaching",
    time: "2 hours ago",
    read: false,
    priority: "high",
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-50"
  },
  {
    id: 4,
    type: "request",
    title: "Policy data request approved",
    message: "Request #REQ-2024-101 has been approved by previous insurer",
    time: "3 hours ago",
    read: true,
    priority: "medium",
    icon: CheckCircle2,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    id: 5,
    type: "alert",
    title: "SLA breach warning",
    message: "5 requests are overdue by more than 48 hours",
    time: "5 hours ago",
    read: true,
    priority: "high",
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  {
    id: 6,
    type: "system",
    title: "System maintenance scheduled",
    message: "Portal will be under maintenance on Nov 30, 2024 from 2 AM to 4 AM",
    time: "1 day ago",
    read: true,
    priority: "low",
    icon: Settings,
    color: "text-slate-600",
    bgColor: "bg-slate-50"
  },
  {
    id: 7,
    type: "completion",
    title: "Report generation completed",
    message: "Monthly Portability Summary Report is ready for download",
    time: "1 day ago",
    read: true,
    priority: "low",
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    id: 8,
    type: "request",
    title: "New bulk upload request",
    message: "200 policies uploaded by operations team",
    time: "2 days ago",
    read: true,
    priority: "medium",
    icon: Upload,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }
];

export function Alerts() {
  const [alerts, setAlerts] = useState(notifications);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const unreadCount = alerts.filter(a => !a.read).length;

  const markAsRead = (id: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
    toast.success("Notification marked as read");
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, read: true })));
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (id: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
    toast.success("Notification deleted");
  };

  const clearAll = () => {
    setAlerts([]);
    toast.success("All notifications cleared");
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === "unread") return !alert.read;
    if (filter === "read") return alert.read;
    return true;
  });

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Notifications</h1>
          <p className="text-slate-500 mt-1">Stay updated with all your alerts and notifications</p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-sm px-3 py-1">
              {unreadCount} Unread
            </Badge>
          )}
        </div>
      </div>

      {/* Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="w-auto">
              <TabsList>
                <TabsTrigger value="all">
                  All ({alerts.length})
                </TabsTrigger>
                <TabsTrigger value="unread">
                  Unread ({unreadCount})
                </TabsTrigger>
                <TabsTrigger value="read">
                  Read ({alerts.length - unreadCount})
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button variant="outline" onClick={markAllAsRead}>
                  Mark All as Read
                </Button>
              )}
              {alerts.length > 0 && (
                <Button variant="outline" onClick={clearAll}>
                  <Trash2 className="size-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      {filteredAlerts.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Bell className="size-12 text-slate-300 mx-auto mb-4" />
              <div className="text-slate-900 mb-2">No notifications</div>
              <div className="text-sm text-slate-500">
                {filter === "unread" 
                  ? "You're all caught up! No unread notifications."
                  : filter === "read"
                  ? "No read notifications found."
                  : "You have no notifications at the moment."}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredAlerts.map((alert) => {
            const Icon = alert.icon;
            
            return (
              <Card 
                key={alert.id} 
                className={cn(
                  "transition-all hover:shadow-md",
                  !alert.read && "border-l-4 border-l-blue-500 bg-blue-50/30"
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${alert.bgColor} shrink-0`}>
                      <Icon className={`size-5 ${alert.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              "text-sm",
                              !alert.read ? "text-slate-900" : "text-slate-700"
                            )}>
                              {alert.title}
                            </div>
                            {!alert.read && (
                              <div className="size-2 rounded-full bg-blue-600"></div>
                            )}
                            {alert.priority === "high" && (
                              <Badge variant="destructive" className="text-xs">
                                High Priority
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-500 mt-1">
                            {alert.message}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-slate-400">{alert.time}</span>
                            <span className="text-xs text-slate-300">•</span>
                            <span className="text-xs text-slate-400 capitalize">{alert.type}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          {!alert.read && (
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => markAsRead(alert.id)}
                            >
                              <CheckCircle2 className="size-4 mr-1" />
                              Mark Read
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => deleteNotification(alert.id)}
                          >
                            <Trash2 className="size-4 text-slate-400 hover:text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Notification Settings */}
      <Card className="bg-slate-50 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="size-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>Customize your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
            <div>
              <div className="text-sm text-slate-900">Email Notifications</div>
              <div className="text-xs text-slate-500 mt-1">Receive email alerts for important updates</div>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
            <div>
              <div className="text-sm text-slate-900">Push Notifications</div>
              <div className="text-xs text-slate-500 mt-1">Get instant browser notifications</div>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
            <div>
              <div className="text-sm text-slate-900">Notification Frequency</div>
              <div className="text-xs text-slate-500 mt-1">Control how often you receive notifications</div>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
