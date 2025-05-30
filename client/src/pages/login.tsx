import { useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "wouter";
import { Mail, Lock, User, UserPlus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Login successful",
      description: "Welcome back to FourKids!",
    });
    navigate("/");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (registerPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (!agreeTerms) {
      toast({
        title: "Terms agreement required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Registration successful",
      description: "Your account has been created successfully!",
    });
    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>Login / Register - FourKids</title>
      </Helmet>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-10 px-4">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 min-h-[560px]">
          <Tabs defaultValue="login" className="w-full h-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">
                <User className="h-4 w-4 mr-2" />
                Login
              </TabsTrigger>
              <TabsTrigger value="register">
                <UserPlus className="h-4 w-4 mr-2" />
                Register
              </TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="/forgot-password"
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <label htmlFor="remember" className="text-sm">
                    Remember me
                  </label>
                </div>

                <Button type="submit" className="w-full">
                  Sign in <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Are you an admin?{" "}
                <a href="/admin" className="text-primary hover:underline">
                  Login here
                </a>
              </p>
            </TabsContent>

            {/* Register Form */}
            <TabsContent value="register" className="space-y-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="fullName"
                      placeholder="Jane Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registerEmail">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="registerEmail"
                      type="email"
                      placeholder="name@example.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registerPassword">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="registerPassword"
                      type="password"
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) =>
                      setAgreeTerms(checked as boolean)
                    }
                  />
                  <label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <a href="/terms" className="text-primary hover:underline">
                      terms and conditions
                    </a>
                  </label>
                </div>

                <Button type="submit" className="w-full">
                  Create Account <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Are you an admin?{" "}
                <a href="/admin" className="text-primary hover:underline">
                  Login here
                </a>
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
};

export default Login;
