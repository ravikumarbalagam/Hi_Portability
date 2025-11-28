import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Search, Plus, Edit, Trash2, Shield } from "lucide-react";
import { toast } from "sonner@2.0.3";

const users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@hdfcergo.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-11-25 09:30 AM"
  },
  {
    id: 2,
    name: "Operations Manager",
    email: "operations@hdfcergo.com",
    role: "Manager",
    status: "Active",
    lastLogin: "2024-11-25 08:15 AM"
  },
  {
    id: 3,
    name: "Data Analyst",
    email: "analyst@hdfcergo.com",
    role: "Analyst",
    status: "Active",
    lastLogin: "2024-11-24 05:45 PM"
  },
  {
    id: 4,
    name: "Support User",
    email: "support@hdfcergo.com",
    role: "Support",
    status: "Inactive",
    lastLogin: "2024-11-20 02:30 PM"
  }
];

export function Users() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">User Management</h1>
          <p className="text-slate-500 mt-1">Manage user access and permissions</p>
        </div>
        <Button onClick={() => toast.success("Add user functionality")}>
          <Plus className="size-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input placeholder="Search by name, email..." className="pl-10" />
            </div>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>Manage system users and their roles</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "Admin" ? "default" : "secondary"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{user.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Edit className="size-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="size-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
