import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Search, Plus, Edit, Trash2, Shield, Download, X } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Checkbox } from "./ui/checkbox";

const users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@hdfcergo.com",
    role: "Admin",
    userType: "Admin",
    company: "HDFC ERGO",
    policyType: ["Retail", "Group"],
    status: "Active",
    mobile: "+91 9876543210",
    lastLogin: "2024-11-25 09:30 AM"
  },
  {
    id: 2,
    name: "Operations Manager",
    email: "operations@hdfcergo.com",
    role: "Manager",
    userType: "Insurer",
    company: "Star Health",
    policyType: ["Retail"],
    status: "Active",
    mobile: "+91 9876543211",
    lastLogin: "2024-11-25 08:15 AM"
  },
  {
    id: 3,
    name: "Data Analyst",
    email: "analyst@hdfcergo.com",
    role: "Analyst",
    userType: "IRDAI",
    company: "IRDAI",
    policyType: ["Group"],
    status: "Active",
    mobile: "+91 9876543212",
    lastLogin: "2024-11-24 05:45 PM"
  },
  {
    id: 4,
    name: "Support User",
    email: "support@hdfcergo.com",
    role: "Support",
    userType: "Insurer",
    company: "ICICI Lombard",
    policyType: ["Retail", "Group"],
    status: "Inactive",
    mobile: "+91 9876543213",
    lastLogin: "2024-11-20 02:30 PM"
  }
];

const insuranceCompanies = [
  "HDFC ERGO",
  "Star Health",
  "ICICI Lombard",
  "Max Bupa",
  "Care Health",
  "Niva Bupa",
  "Bajaj Allianz",
  "IRDAI"
];

const userRoles = [
  "Admin",
  "Manager",
  "Analyst",
  "Support",
  "Viewer",
  "Operator"
];

export function Users() {
  const [searchCompany, setSearchCompany] = useState("");
  const [searchPolicyType, setSearchPolicyType] = useState<string[]>([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  
  // Add user form state
  const [newUser, setNewUser] = useState({
    status: "Active",
    userType: "",
    role: "",
    company: "",
    policyType: [] as string[],
    salutation: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: ""
  });

  const handleSearch = () => {
    let results = users;

    if (searchCompany) {
      results = results.filter(user => user.company === searchCompany);
    }

    if (searchPolicyType.length > 0) {
      results = results.filter(user => 
        searchPolicyType.some(type => user.policyType.includes(type))
      );
    }

    if (searchEmail) {
      results = results.filter(user => 
        user.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
    }

    setFilteredUsers(results);
    toast.success(`Found ${results.length} users`);
  };

  const handleClearSearch = () => {
    setSearchCompany("");
    setSearchPolicyType([]);
    setSearchEmail("");
    setFilteredUsers(users);
  };

  const handlePolicyTypeToggle = (type: string) => {
    setSearchPolicyType(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleNewUserPolicyTypeToggle = (type: string) => {
    setNewUser(prev => ({
      ...prev,
      policyType: prev.policyType.includes(type)
        ? prev.policyType.filter(t => t !== type)
        : [...prev.policyType, type]
    }));
  };

  const handleAddUser = () => {
    // Validation
    if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.mobile) {
      toast.error("Please fill all required fields");
      return;
    }

    toast.success("User added successfully!");
    setShowAddUserDialog(false);
    // Reset form
    setNewUser({
      status: "Active",
      userType: "",
      role: "",
      company: "",
      policyType: [],
      salutation: "",
      firstName: "",
      lastName: "",
      email: "",
      mobile: ""
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#04274F]">User Management</h1>
          <p className="text-[#6E6E6E] mt-1">Manage user access and permissions</p>
        </div>
        <Button 
          onClick={() => setShowAddUserDialog(true)}
          className="bg-gradient-to-r from-[#2877BB] to-[#1F6098] hover:opacity-90"
        >
          <Plus className="size-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Search Section */}
      <Card className="border-[#E3EDFF] shadow-md">
        <CardHeader>
          <CardTitle className="text-[#04274F] font-extrabold">Search Users</CardTitle>
          <CardDescription className="text-[#6E6E6E]">Filter users by company, policy type, and email</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Insurance Company Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="company" className="text-[#04274F]">Insurance Company Name</Label>
              <Select value={searchCompany} onValueChange={setSearchCompany}>
                <SelectTrigger id="company">
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {insuranceCompanies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Policy Type Multi-select */}
            <div className="space-y-2">
              <Label className="text-[#04274F]">Policy Type</Label>
              <div className="flex items-center gap-4 border rounded-md p-3 bg-white">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="retail" 
                    checked={searchPolicyType.includes("Retail")}
                    onCheckedChange={() => handlePolicyTypeToggle("Retail")}
                  />
                  <label htmlFor="retail" className="text-sm cursor-pointer">
                    Retail
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="group" 
                    checked={searchPolicyType.includes("Group")}
                    onCheckedChange={() => handlePolicyTypeToggle("Group")}
                  />
                  <label htmlFor="group" className="text-sm cursor-pointer">
                    Group
                  </label>
                </div>
              </div>
            </div>

            {/* Email Search */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#04274F]">Search by User Email ID</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#6E6E6E]" />
                <Input 
                  id="email"
                  placeholder="Enter email address" 
                  className="pl-10" 
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Search Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={handleSearch}
              className="bg-gradient-to-r from-[#2877BB] to-[#1F6098]"
            >
              <Search className="size-4 mr-2" />
              Search
            </Button>
            <Button 
              variant="outline" 
              onClick={handleClearSearch}
              className="border-[#2877BB] text-[#2877BB] hover:bg-[#E3EDFF]"
            >
              <X className="size-4 mr-2" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results - Tile View */}
      <div>
        <h2 className="text-[#04274F] mb-4 font-semibold">Search Results ({filteredUsers.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="border-[#E3EDFF] shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2877BB] to-[#1F6098] flex items-center justify-center text-white">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-[#04274F]">{user.name}</h3>
                      <Badge variant={user.status === "Active" ? "default" : "secondary"} className="mt-1">
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[#6E6E6E]">Email:</span>
                    <span className="text-[#2D2D2D]">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[#6E6E6E]">Mobile:</span>
                    <span className="text-[#2D2D2D]">{user.mobile}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[#6E6E6E]">Company:</span>
                    <span className="text-[#2D2D2D]">{user.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[#6E6E6E]">User Type:</span>
                    <Badge variant="outline" className="text-[#2877BB] border-[#2877BB]">
                      {user.userType}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[#6E6E6E]">Policy Type:</span>
                    <div className="flex gap-1">
                      {user.policyType.map(type => (
                        <Badge key={type} variant="secondary" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[#6E6E6E]">Last Login:</span>
                    <span className="text-[#2D2D2D] text-xs">{user.lastLogin}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-[#E3EDFF]">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 border-[#2877BB] text-[#2877BB] hover:bg-[#E3EDFF]"
                    onClick={() => toast.success("Extract functionality")}
                  >
                    <Download className="size-4 mr-2" />
                    Extract
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-to-r from-[#2877BB] to-[#1F6098]"
                    onClick={() => toast.success("Edit functionality")}
                  >
                    <Edit className="size-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Add User Dialog */}
      <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#04274F] font-extrabold">Add New User</DialogTitle>
            <DialogDescription className="text-[#6E6E6E]">
              Enter the details to create a new user account
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {/* User Status */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-[#04274F]">User Status *</Label>
              <Select value={newUser.status} onValueChange={(value) => setNewUser({...newUser, status: value})}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* User Type */}
            <div className="space-y-2">
              <Label htmlFor="userType" className="text-[#04274F]">User Type *</Label>
              <Select value={newUser.userType} onValueChange={(value) => setNewUser({...newUser, userType: value})}>
                <SelectTrigger id="userType">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Insurer">Insurer</SelectItem>
                  <SelectItem value="IRDAI">IRDAI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* User Role */}
            <div className="space-y-2">
              <Label htmlFor="role" className="text-[#04274F]">User Role *</Label>
              <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {userRoles.map((role) => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Insurance Company */}
            <div className="space-y-2">
              <Label htmlFor="newUserCompany" className="text-[#04274F]">Insurance Company *</Label>
              <Select value={newUser.company} onValueChange={(value) => setNewUser({...newUser, company: value})}>
                <SelectTrigger id="newUserCompany">
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {insuranceCompanies.map((company) => (
                    <SelectItem key={company} value={company}>{company}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Policy Type */}
            <div className="space-y-2 md:col-span-2">
              <Label className="text-[#04274F]">Policy Type *</Label>
              <div className="flex items-center gap-6 border rounded-md p-3 bg-white">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="newRetail" 
                    checked={newUser.policyType.includes("Retail")}
                    onCheckedChange={() => handleNewUserPolicyTypeToggle("Retail")}
                  />
                  <label htmlFor="newRetail" className="text-sm cursor-pointer">
                    Retail
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="newGroup" 
                    checked={newUser.policyType.includes("Group")}
                    onCheckedChange={() => handleNewUserPolicyTypeToggle("Group")}
                  />
                  <label htmlFor="newGroup" className="text-sm cursor-pointer">
                    Group
                  </label>
                </div>
              </div>
            </div>

            {/* Salutation */}
            <div className="space-y-2">
              <Label htmlFor="salutation" className="text-[#04274F]">Salutation</Label>
              <Select value={newUser.salutation} onValueChange={(value) => setNewUser({...newUser, salutation: value})}>
                <SelectTrigger id="salutation">
                  <SelectValue placeholder="Select salutation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mr">Mr</SelectItem>
                  <SelectItem value="Ms">Ms</SelectItem>
                  <SelectItem value="Miss">Miss</SelectItem>
                  <SelectItem value="Mrs">Mrs</SelectItem>
                  <SelectItem value="Dr">Dr</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-[#04274F]">First Name *</Label>
              <Input 
                id="firstName"
                placeholder="Enter first name" 
                value={newUser.firstName}
                onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-[#04274F]">Last Name *</Label>
              <Input 
                id="lastName"
                placeholder="Enter last name" 
                value={newUser.lastName}
                onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
              />
            </div>

            {/* Email ID */}
            <div className="space-y-2">
              <Label htmlFor="newEmail" className="text-[#04274F]">Email ID *</Label>
              <Input 
                id="newEmail"
                type="email"
                placeholder="Enter email address" 
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              />
            </div>

            {/* Mobile */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="mobile" className="text-[#04274F]">Mobile *</Label>
              <Input 
                id="mobile"
                type="tel"
                placeholder="Enter mobile number" 
                value={newUser.mobile}
                onChange={(e) => setNewUser({...newUser, mobile: e.target.value})}
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowAddUserDialog(false)}
              className="border-[#6E6E6E] text-[#6E6E6E]"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddUser}
              className="bg-gradient-to-r from-[#2877BB] to-[#1F6098]"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}