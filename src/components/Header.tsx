import { Bell, Search, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Link, useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              placeholder="Search policies, members, claims..."
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="size-5" />
                <Badge className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 text-xs">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <div className="text-sm">New portability request received</div>
                  <div className="text-xs text-slate-500">Policy #POL-2024-1234 - 5 min ago</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <div className="text-sm">Bulk upload completed</div>
                  <div className="text-xs text-slate-500">150 policies processed - 1 hour ago</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <div className="text-sm">Pending approval required</div>
                  <div className="text-xs text-slate-500">12 policies awaiting response - 2 hours ago</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/alerts")}>
                <div className="w-full text-center text-blue-600">View All Notifications</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="size-8">
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <div className="text-left hidden md:block">
                  <div className="text-sm">Admin User</div>
                  <div className="text-xs text-slate-500">HDFC ERGO</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Organization</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={() => {
                navigate("/login");
              }}>
                <LogOut className="size-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}