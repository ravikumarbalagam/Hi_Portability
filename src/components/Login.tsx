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
    <div className="min-h-screen bg-gradient-to-br from-[#E3EDFF] via-white to-[#F0F7FF] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Thematic Background Graphics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Circle - Top Right */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#2877BB]/10 to-[#1F6098]/5 rounded-full blur-3xl"></div>
        
        {/* Medium Circle - Bottom Left */}
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-[#04274F]/10 to-[#2877BB]/5 rounded-full blur-3xl"></div>
        
        {/* Small Circle - Middle */}
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-[#E3EDFF]/30 to-transparent rounded-full blur-2xl"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 right-1/4 w-32 h-32 border-4 border-[#2877BB]/10 rounded-lg rotate-45"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 border-4 border-[#1F6098]/10 rounded-full"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-gradient-to-br from-[#2877BB]/5 to-transparent rounded-lg rotate-12 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-gradient-to-tl from-[#1F6098]/5 to-transparent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-6 p-12">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-[#2877BB] to-[#1F6098] rounded-xl shadow-lg">
              <Shield className="size-10 text-white" />
            </div>
            <div>
              <h1 className="text-[#04274F]">IIB Portal</h1>
              <p className="text-[#6E6E6E]">Insurance Information Bureau</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-[#04274F]">Health Insurance Portability Platform</h2>
            <p className="text-[#6E6E6E] leading-relaxed">
              Secure access to the Insurance Information Bureau's portability management system. 
              Request and manage policy data transfers seamlessly between insurers.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-[#E3EDFF] shadow-sm hover:shadow-md transition-shadow">
              <div className="p-2 bg-gradient-to-br from-[#2877BB]/10 to-[#E3EDFF] rounded-lg">
                <Shield className="size-5 text-[#2877BB]" />
              </div>
              <div>
                <div className="text-sm text-[#04274F]">Secure & Compliant</div>
                <div className="text-xs text-[#6E6E6E] mt-1">
                  IRDAI regulated platform with end-to-end encryption
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-[#E3EDFF] shadow-sm hover:shadow-md transition-shadow">
              <div className="p-2 bg-gradient-to-br from-emerald-500/10 to-emerald-50 rounded-lg">
                <Lock className="size-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-sm text-[#04274F]">Data Protection</div>
                <div className="text-xs text-[#6E6E6E] mt-1">
                  Your data is protected with industry-standard security
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md shadow-2xl border-[#E3EDFF] bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4 lg:hidden">
                <div className="p-3 bg-gradient-to-br from-[#2877BB] to-[#1F6098] rounded-xl shadow-lg">
                  <Shield className="size-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-[#04274F]">Sign In to IIB Portal</CardTitle>
              <CardDescription className="text-[#6E6E6E]">
                Enter your credentials to access the portability platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@hdfcergo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
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
                      className="text-sm text-slate-600 cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>
                  <Button 
                    type="button" 
                    variant="link" 
                    className="text-sm p-0 h-auto"
                    disabled={isLoading}
                  >
                    Forgot password?
                  </Button>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
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

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-2 text-slate-500">or</span>
                  </div>
                </div>

                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  disabled={isLoading}
                >
                  Sign in with SSO
                </Button>
              </form>

              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex gap-3">
                  <AlertCircle className="size-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-800">
                    <div className="font-medium mb-1">Demo Credentials</div>
                    <div>Email: <span className="font-mono">admin@hdfcergo.com</span></div>
                    <div>Password: <span className="font-mono">demo123</span></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-xs text-slate-500">
          © 2024 Insurance Information Bureau of India. All rights reserved.
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Regulated by IRDAI | Secure Platform
        </p>
      </div>
    </div>
  );
}
