import { Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  Users, 
  Database, 
  FileText, 
  Upload, 
  RefreshCw,
  Clock,
  BarChart3,
  UserCircle,
  Shield,
  HelpCircle
} from "lucide-react";
import { cn } from "../lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Users", href: "/users", icon: Users },
  { name: "Masters", href: "/masters", icon: Database },
  { name: "Single Policy Request", href: "/single-policy-request", icon: FileText },
  { name: "Bulk Upload", href: "/bulk-upload", icon: Upload },
  { name: "Portability Information", href: "/portability-info", icon: RefreshCw },
  { name: "Pending Policies", href: "/pending-policies", icon: Clock },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "My Profile", href: "/profile", icon: UserCircle },
  { name: "Help", href: "/help", icon: HelpCircle },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-gradient-to-b from-[#04274F] via-[#1F6098] to-[#2877BB] flex flex-col shadow-xl relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20"></div>
      
      {/* Logo Header */}
      <div className="p-6 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
            <Shield className="size-7 text-white" />
          </div>
          <div>
            <div className="text-white">HiPortability</div>
            <div className="text-xs text-white/70">Health Insurance Portability</div>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto relative z-10">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm group",
                isActive
                  ? "bg-white text-[#2877BB] shadow-lg"
                  : "text-white/80 hover:bg-white/10 hover:text-white hover:translate-x-1"
              )}
            >
              <Icon className={cn(
                "size-5 shrink-0 transition-transform group-hover:scale-110",
                isActive ? "text-[#2877BB]" : ""
              )} />
              <span className={isActive ? "font-medium" : ""}>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-white/10 relative z-10">
        <div className="text-xs text-white/60">
          Insurance Information Bureau
        </div>
        <div className="text-xs text-white/40 mt-1">
          v2.0.1 - Secure Portal
        </div>
      </div>
    </div>
  );
}