import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Shield, Lock, Mail, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner@2.0.3";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login successful! Welcome back.");
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#04274F] via-[#1F6098] to-[#2877BB] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2877BB]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#04274F]/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1F6098]/10 rounded-full blur-3xl"></div>
        
        {/* Geometric Patterns */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/5 rounded-lg rotate-45"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-white/5 rounded-full"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 border-2 border-white/5 rounded-lg -rotate-12"></div>
        
        {/* Floating dots */}
        <div className="absolute top-40 right-1/4">
          <div className="grid grid-cols-4 gap-3">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-white/10 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          
          {/* Left Side - Branding (2 columns) */}
          <div className="lg:col-span-2 text-center lg:text-left space-y-6 px-4">
            {/* Logo and Title */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
                <Shield className="size-12 text-white" />
              </div>
              <div>
                <h1 className="text-white text-3xl">HiPortability</h1>
                <p className="text-white/70 text-sm mt-1">Insurance Information Bureau</p>
              </div>
            </div>

            {/* Feature List */}
            <div className="hidden lg:block space-y-4 mt-8">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-lg shrink-0 mt-1">
                  <Shield className="size-4 text-white" />
                </div>
                <div>
                  <div className="text-white text-sm">Secure Platform</div>
                  <div className="text-white/60 text-xs mt-0.5">IRDAI regulated with end-to-end encryption</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-lg shrink-0 mt-1">
                  <Lock className="size-4 text-white" />
                </div>
                <div>
                  <div className="text-white text-sm">Data Protection</div>
                  <div className="text-white/60 text-xs mt-0.5">Industry-standard security protocols</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-lg shrink-0 mt-1">
                  <Mail className="size-4 text-white" />
                </div>
                <div>
                  <div className="text-white text-sm">Seamless Communication</div>
                  <div className="text-white/60 text-xs mt-0.5">Request and manage policy data efficiently</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Panel (3 columns) */}
          <div className="lg:col-span-3">
            <Card className="w-full max-w-md mx-auto bg-white shadow-2xl border-none">
              <CardHeader className="space-y-1 pb-6">
                <div className="flex justify-center mb-2 lg:hidden">
                  <div className="p-3 bg-gradient-to-br from-[#2877BB] to-[#1F6098] rounded-xl">
                    <Shield className="size-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-center text-[#04274F]">Welcome Back</CardTitle>
                <CardDescription className="text-center text-[#6E6E6E]">
                  Sign in to access the portability platform
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#04274F]">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#6E6E6E]" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@hdfcergo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-11 border-slate-300 focus:border-[#2877BB] focus:ring-[#2877BB]"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#04274F]">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#6E6E6E]" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 h-11 border-slate-300 focus:border-[#2877BB] focus:ring-[#2877BB]"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="remember" 
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        disabled={isLoading}
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm text-[#6E6E6E] cursor-pointer select-none"
                      >
                        Remember me
                      </label>
                    </div>
                    <Button 
                      type="button" 
                      variant="link" 
                      className="text-sm text-[#2877BB] hover:text-[#1F6098] p-0 h-auto"
                      disabled={isLoading}
                    >
                      Forgot password?
                    </Button>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-gradient-to-r from-[#2877BB] to-[#1F6098] hover:from-[#1F6098] hover:to-[#04274F] text-white shadow-lg" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                {/* Demo Credentials */}
                <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl shadow-sm">
                  <div className="flex gap-3">
                    <AlertCircle className="size-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="text-xs text-amber-900">Demo Credentials</div>
                      <div className="text-xs text-amber-800">
                        <div>Email: <span className="font-mono bg-white/60 px-1.5 py-0.5 rounded">admin@hdfcergo.com</span></div>
                        <div className="mt-1">Password: <span className="font-mono bg-white/60 px-1.5 py-0.5 rounded">demo123</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-xs text-white/60">
          © 2024 Insurance Information Bureau of India. All rights reserved.
        </p>
        <p className="text-xs text-white/40 mt-1">
          Regulated by IRDAI | Secure Platform
        </p>
      </div>
    </div>
  );
}