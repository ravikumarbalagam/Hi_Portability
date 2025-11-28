import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Building2, Mail, Phone, Shield, Calendar } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function MyProfile() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-slate-900">My Profile</h1>
        <p className="text-slate-500 mt-1">Manage your account settings and preferences</p>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <Avatar className="size-20">
              <AvatarFallback className="text-xl">AB</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-slate-900">Admin User</h2>
                  <p className="text-slate-500 text-sm mt-1">admin@hdfcergo.com</p>
                </div>
                <Badge>Admin</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Building2 className="size-4" />
                  <span>HDFC ERGO Health Insurance</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="size-4" />
                  <span>Member since Jan 2023</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" defaultValue="Admin" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" defaultValue="User" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="admin@hdfcergo.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" defaultValue="+91-9876543210" />
            </div>
          </div>
          <Button onClick={() => toast.success("Profile updated successfully")}>
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Organization Details */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
          <CardDescription>Your organization information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-500 text-xs">Organization Name</Label>
              <p className="text-slate-900 mt-1">HDFC ERGO Health Insurance Ltd.</p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs">Insurer Code</Label>
              <p className="text-slate-900 mt-1">HDFC-ERGO</p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs">License Number</Label>
              <p className="text-slate-900 mt-1">142/IRDAI/2006</p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs">Registration Date</Label>
              <p className="text-slate-900 mt-1">15/01/2023</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage your password and security preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button onClick={() => toast.success("Password updated successfully")}>
            Update Password
          </Button>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent login history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "2024-11-25 09:30 AM", ip: "192.168.1.100", device: "Windows - Chrome" },
              { date: "2024-11-24 02:15 PM", ip: "192.168.1.100", device: "Windows - Chrome" },
              { date: "2024-11-23 10:45 AM", ip: "192.168.1.101", device: "Windows - Edge" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                <div>
                  <div className="text-sm text-slate-900">{activity.date}</div>
                  <div className="text-xs text-slate-500 mt-1">{activity.device} • IP: {activity.ip}</div>
                </div>
                <Shield className="size-5 text-green-600" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
