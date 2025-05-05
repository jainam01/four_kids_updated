import { useState } from "react";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, ShoppingBag, CreditCard, BarChart, Settings, LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const Admin = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo admin login
      if (email === "admin@example.com" && password === "admin123") {
        setIsLoggedIn(true);
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
        });
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Try admin@example.com / admin123",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoggingIn(false);
    }
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };
  
  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8 pb-16 md:pb-8">
        <Helmet>
          <title>Admin Login - FourKids</title>
        </Helmet>
        
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access the admin panel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Button variant="link" className="px-0 font-normal" size="sm">
                        Forgot password?
                      </Button>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary text-white"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <div className="flex space-x-1">
                        <div className="loading-dot w-2 h-2 bg-white rounded-full"></div>
                        <div className="loading-dot w-2 h-2 bg-white rounded-full"></div>
                        <div className="loading-dot w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    ) : "Login"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="text-center">
              <p className="text-sm text-muted-foreground w-full">
                Demo credentials: admin@example.com / admin123
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 pb-16 md:pb-8">
      <Helmet>
        <title>Admin Dashboard - FourKids</title>
      </Helmet>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 bg-primary text-white">
              <h2 className="font-bold text-xl">FourKids Admin</h2>
              <p className="text-sm text-white/80">Management Dashboard</p>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    <BarChart className="mr-2 h-5 w-5" />
                    Dashboard
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start bg-muted">
                    <Package className="mr-2 h-5 w-5" />
                    Products
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Orders
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    <Users className="mr-2 h-5 w-5" />
                    Customers
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Transactions
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-5 w-5" />
                    Settings
                  </Button>
                </li>
                <Separator className="my-4" />
                <li>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Logout
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-grow">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Products Management</h1>
              <Button className="bg-primary text-white">
                Add New Product
              </Button>
            </div>
            
            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Products</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-6">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Input placeholder="Search products..." className="w-64" />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="pants">Pants</SelectItem>
                        <SelectItem value="cargo">Cargo</SelectItem>
                        <SelectItem value="capris">Capris</SelectItem>
                        <SelectItem value="shorts">Shorts</SelectItem>
                        <SelectItem value="mom-fit">Mom Fit</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="newest">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="name-asc">Name: A to Z</SelectItem>
                        <SelectItem value="name-desc">Name: Z to A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Button variant="outline" className="gap-1">
                      <Package className="h-4 w-4" /> Export
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left py-3 px-4">
                          <Checkbox />
                        </th>
                        <th className="text-left py-3 px-4">Product</th>
                        <th className="text-left py-3 px-4">Category</th>
                        <th className="text-left py-3 px-4">Price</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">
                          <Checkbox />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-muted rounded-md mr-3"></div>
                            <span>Denim Jacket</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">Pants</td>
                        <td className="py-3 px-4">$34.99</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            In Stock
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">
                          <Checkbox />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-muted rounded-md mr-3"></div>
                            <span>Floral Summer Dress</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">Mom Fit</td>
                        <td className="py-3 px-4">
                          <span className="line-through text-muted-foreground mr-1">$29.99</span>
                          $24.99
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            On Sale
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">
                          <Checkbox />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-muted rounded-md mr-3"></div>
                            <span>Cargo Pants</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">Cargo</td>
                        <td className="py-3 px-4">$29.99</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Featured
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Showing 1 to 3 of 12 products
                  </p>
                  <div className="flex">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" className="mx-1 bg-primary text-white">
                      1
                    </Button>
                    <Button variant="outline" size="sm" className="mx-1">
                      2
                    </Button>
                    <Button variant="outline" size="sm" className="mx-1">
                      3
                    </Button>
                    <Button variant="outline" size="sm" className="mx-1">
                      4
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="published">
                <div className="text-center py-12 text-muted-foreground">
                  This tab would show only published products in a real application.
                </div>
              </TabsContent>
              
              <TabsContent value="draft">
                <div className="text-center py-12 text-muted-foreground">
                  This tab would show only draft products in a real application.
                </div>
              </TabsContent>
              
              <TabsContent value="archived">
                <div className="text-center py-12 text-muted-foreground">
                  This tab would show only archived products in a real application.
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
