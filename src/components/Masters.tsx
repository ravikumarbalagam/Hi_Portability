import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Plus, Edit, Download, Search, X, Upload, Building2, FileText, Users, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner@2.0.3";
import { Checkbox } from "./ui/checkbox";
import { cn } from "../lib/utils";

// Sample data
const insurersData = [
  { 
    id: 1, 
    name: "HDFC ERGO Health Insurance", 
    code: "HDFC001", 
    type: "Private",
    status: "Active",
    apiEnabled: "Yes",
    officer: {
      firstName: "Rajesh",
      lastName: "Kumar",
      mobile: "+91 9876543210",
      email: "rajesh.kumar@hdfcergo.com"
    }
  },
  { 
    id: 2, 
    name: "Star Health Insurance", 
    code: "STAR002", 
    type: "Private",
    status: "Active",
    apiEnabled: "Yes",
    officer: {
      firstName: "Priya",
      lastName: "Sharma",
      mobile: "+91 9876543211",
      email: "priya.sharma@starhealth.com"
    }
  },
  { 
    id: 3, 
    name: "National Insurance Company", 
    code: "NIC003", 
    type: "PSU",
    status: "Active",
    apiEnabled: "No",
    officer: {
      firstName: "Amit",
      lastName: "Patel",
      mobile: "+91 9876543212",
      email: "amit.patel@nationalinsurance.com"
    }
  }
];

const reasonsData = [
  { id: 1, code: "R001", reason: "Dissatisfied with claim settlement process", status: "Active" },
  { id: 2, code: "R002", reason: "High premium rates compared to market", status: "Active" },
  { id: 3, code: "R003", reason: "Limited network hospitals in the area", status: "Active" },
  { id: 4, code: "R004", reason: "Poor customer service experience", status: "Active" }
];

const relationshipsData = [
  { id: 1, code: "REL001", relationship: "Self", status: "Active" },
  { id: 2, code: "REL002", relationship: "Spouse", status: "Active" },
  { id: 3, code: "REL003", relationship: "Son", status: "Active" },
  { id: 4, code: "REL004", relationship: "Daughter", status: "Active" },
  { id: 5, code: "REL005", relationship: "Father", status: "Active" },
  { id: 6, code: "REL006", relationship: "Mother", status: "Active" }
];

const validationsData = [
  { id: 1, code: "VAL001", description: "Current year policy must be active for portability eligibility", status: "Active" },
  { id: 2, code: "VAL002", description: "Previous year continuous coverage verification required", status: "Active" },
  { id: 3, code: "VAL003", description: "No claims in last 12 months validation check", status: "Active" }
];

interface MasterTab {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
}

const masterTabs: MasterTab[] = [
  {
    id: "insurers",
    name: "Insurers",
    icon: Building2,
    color: "blue",
    description: "Manage insurance company details and configurations"
  },
  {
    id: "reasons",
    name: "Reason for Portability",
    icon: FileText,
    color: "purple",
    description: "Define reasons for policy portability requests"
  },
  {
    id: "relationships",
    name: "Relationship",
    icon: Users,
    color: "green",
    description: "Configure member relationship types"
  },
  {
    id: "validations",
    name: "Current Year Previous Validation",
    icon: CheckCircle,
    color: "orange",
    description: "Set validation rules for portability eligibility"
  }
];

export function Masters() {
  const [selectedTab, setSelectedTab] = useState<string>("insurers");
  
  // Dialog states
  const [showInsurerDialog, setShowInsurerDialog] = useState(false);
  const [showReasonDialog, setShowReasonDialog] = useState(false);
  const [showRelationshipDialog, setShowRelationshipDialog] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);

  // Search states
  const [insurerSearch, setInsurerSearch] = useState("");
  const [reasonSearch, setReasonSearch] = useState("");
  const [relationshipSearch, setRelationshipSearch] = useState("");
  const [validationSearch, setValidationSearch] = useState("");

  // Filtered data
  const [filteredInsurers, setFilteredInsurers] = useState(insurersData);
  const [filteredReasons, setFilteredReasons] = useState(reasonsData);
  const [filteredRelationships, setFilteredRelationships] = useState(relationshipsData);
  const [filteredValidations, setFilteredValidations] = useState(validationsData);

  // Selection states
  const [selectedInsurers, setSelectedInsurers] = useState<number[]>([]);
  const [selectedReasons, setSelectedReasons] = useState<number[]>([]);
  const [selectedRelationships, setSelectedRelationships] = useState<number[]>([]);
  const [selectedValidations, setSelectedValidations] = useState<number[]>([]);

  // Form states
  const [newInsurer, setNewInsurer] = useState({
    status: "Active",
    code: "",
    name: "",
    type: "",
    logo: null as File | null,
    officerFirstName: "",
    officerLastName: "",
    officerMobile: "",
    officerEmail: "",
    apiEnabled: "No"
  });

  const [newReason, setNewReason] = useState({
    status: "Active",
    code: "",
    reason: ""
  });

  const [newRelationship, setNewRelationship] = useState({
    status: "Active",
    code: "",
    relationship: ""
  });

  const [newValidation, setNewValidation] = useState({
    status: "Active",
    code: "",
    description: ""
  });

  // Search handlers
  const handleInsurerSearch = () => {
    const filtered = insurersData.filter(insurer =>
      insurer.name.toLowerCase().includes(insurerSearch.toLowerCase())
    );
    setFilteredInsurers(filtered);
  };

  const handleReasonSearch = () => {
    const filtered = reasonsData.filter(reason =>
      reason.reason.toLowerCase().includes(reasonSearch.toLowerCase())
    );
    setFilteredReasons(filtered);
  };

  const handleRelationshipSearch = () => {
    const filtered = relationshipsData.filter(rel =>
      rel.relationship.toLowerCase().includes(relationshipSearch.toLowerCase())
    );
    setFilteredRelationships(filtered);
  };

  const handleValidationSearch = () => {
    const filtered = validationsData.filter(val =>
      val.description.toLowerCase().includes(validationSearch.toLowerCase())
    );
    setFilteredValidations(filtered);
  };

  const handleInsurerReset = () => {
    setInsurerSearch("");
    setFilteredInsurers(insurersData);
    setSelectedInsurers([]);
  };

  const handleReasonReset = () => {
    setReasonSearch("");
    setFilteredReasons(reasonsData);
    setSelectedReasons([]);
  };

  const handleRelationshipReset = () => {
    setRelationshipSearch("");
    setFilteredRelationships(relationshipsData);
    setSelectedRelationships([]);
  };

  const handleValidationReset = () => {
    setValidationSearch("");
    setFilteredValidations(validationsData);
    setSelectedValidations([]);
  };

  // Submit handlers
  const handleAddInsurer = () => {
    if (!newInsurer.code || !newInsurer.name || !newInsurer.type) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success("Insurer added successfully!");
    setShowInsurerDialog(false);
    setNewInsurer({
      status: "Active",
      code: "",
      name: "",
      type: "",
      logo: null,
      officerFirstName: "",
      officerLastName: "",
      officerMobile: "",
      officerEmail: "",
      apiEnabled: "No"
    });
  };

  const handleAddReason = () => {
    if (!newReason.code || !newReason.reason) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success("Reason added successfully!");
    setShowReasonDialog(false);
    setNewReason({ status: "Active", code: "", reason: "" });
  };

  const handleAddRelationship = () => {
    if (!newRelationship.code || !newRelationship.relationship) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success("Relationship added successfully!");
    setShowRelationshipDialog(false);
    setNewRelationship({ status: "Active", code: "", relationship: "" });
  };

  const handleAddValidation = () => {
    if (!newValidation.code || !newValidation.description) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success("Validation added successfully!");
    setShowValidationDialog(false);
    setNewValidation({ status: "Active", code: "", description: "" });
  };

  // Extract handlers
  const handleExtractInsurers = (type: "single" | "multiple" | "all", id?: number) => {
    if (type === "single" && id) {
      toast.success(`Extracting insurer ID: ${id}`);
    } else if (type === "multiple") {
      toast.success(`Extracting ${selectedInsurers.length} selected insurers`);
    } else if (type === "all") {
      toast.success(`Extracting all ${filteredInsurers.length} insurers`);
    }
  };

  const handleExtractReasons = (type: "single" | "multiple" | "all", id?: number) => {
    if (type === "single" && id) {
      toast.success(`Extracting reason ID: ${id}`);
    } else if (type === "multiple") {
      toast.success(`Extracting ${selectedReasons.length} selected reasons`);
    } else if (type === "all") {
      toast.success(`Extracting all ${filteredReasons.length} reasons`);
    }
  };

  const toggleInsurerSelection = (id: number) => {
    setSelectedInsurers(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleReasonSelection = (id: number) => {
    setSelectedReasons(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleRelationshipSelection = (id: number) => {
    setSelectedRelationships(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleValidationSelection = (id: number) => {
    setSelectedValidations(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Get current tab details
  const currentTab = masterTabs.find(tab => tab.id === selectedTab);

  // Render content based on selected tab
  const renderTabContent = () => {
    switch (selectedTab) {
      case "insurers":
        return renderInsurersContent();
      case "reasons":
        return renderReasonsContent();
      case "relationships":
        return renderRelationshipsContent();
      case "validations":
        return renderValidationsContent();
      default:
        return null;
    }
  };

  const renderInsurersContent = () => (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl text-[#04274F]">Insurers Management</h2>
          <p className="text-sm text-[#6E6E6E] mt-1">{currentTab?.description}</p>
        </div>
        <Button 
          onClick={() => setShowInsurerDialog(true)}
          className="bg-gradient-to-r from-[#2877BB] to-[#1F6098]"
        >
          <Plus className="size-4 mr-2" />
          Add New Insurer
        </Button>
      </div>

      {/* Search Panel */}
      <Card className="border-[#E3EDFF] shadow-md">
        <CardHeader>
          <CardTitle className="text-[#04274F]">Search Insurers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="insurerSearch" className="text-[#04274F]">Search by Insurer Name</Label>
              <Input 
                id="insurerSearch"
                placeholder="Enter insurer name" 
                value={insurerSearch}
                onChange={(e) => setInsurerSearch(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleInsurerSearch}
              className="bg-gradient-to-r from-[#2877BB] to-[#1F6098]"
            >
              <Search className="size-4 mr-2" />
              Search
            </Button>
            <Button 
              variant="outline" 
              onClick={handleInsurerReset}
              className="border-[#2877BB] text-[#2877BB]"
            >
              <X className="size-4 mr-2" />
              Reset
            </Button>
          </div>

          {filteredInsurers.length > 0 && (
            <div className="flex gap-2 mt-4 pt-4 border-t border-[#E3EDFF]">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleExtractInsurers("multiple")}
                disabled={selectedInsurers.length === 0}
                className="border-[#2877BB] text-[#2877BB]"
              >
                <Download className="size-4 mr-2" />
                Extract Selected ({selectedInsurers.length})
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleExtractInsurers("all")}
                className="border-emerald-600 text-emerald-600"
              >
                <Download className="size-4 mr-2" />
                Extract All ({filteredInsurers.length})
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#04274F]">Search Results</h3>
          <span className="text-sm text-[#6E6E6E]">{filteredInsurers.length} insurers found</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInsurers.map((insurer) => (
            <Card key={insurer.id} className="border-[#E3EDFF] hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <Checkbox 
                    checked={selectedInsurers.includes(insurer.id)}
                    onCheckedChange={() => toggleInsurerSelection(insurer.id)}
                  />
                  <Badge 
                    variant={insurer.status === "Active" ? "default" : "secondary"}
                    className={insurer.status === "Active" ? "bg-emerald-100 text-emerald-700" : ""}
                  >
                    {insurer.status}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[#04274F]">{insurer.name}</h4>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[#6E6E6E]">Code:</span>
                      <p className="text-[#2D2D2D]">{insurer.code}</p>
                    </div>
                    <div>
                      <span className="text-[#6E6E6E]">Type:</span>
                      <p className="text-[#2D2D2D]">{insurer.type}</p>
                    </div>
                    <div>
                      <span className="text-[#6E6E6E]">API:</span>
                      <p className="text-[#2D2D2D]">{insurer.apiEnabled}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E3EDFF]">
                    <p className="text-xs text-[#6E6E6E] mb-1">Nodal Officer</p>
                    <p className="text-xs text-[#2D2D2D]">{insurer.officer.firstName} {insurer.officer.lastName}</p>
                    <p className="text-xs text-[#6E6E6E]">{insurer.officer.email}</p>
                    <p className="text-xs text-[#6E6E6E]">{insurer.officer.mobile}</p>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-[#E3EDFF]">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1 border-[#2877BB] text-[#2877BB]"
                      onClick={() => handleExtractInsurers("single", insurer.id)}
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReasonsContent = () => (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl text-[#04274F]">Reasons for Portability</h2>
          <p className="text-sm text-[#6E6E6E] mt-1">{currentTab?.description}</p>
        </div>
        <Button 
          onClick={() => setShowReasonDialog(true)}
          className="bg-gradient-to-r from-[#2877BB] to-[#1F6098]"
        >
          <Plus className="size-4 mr-2" />
          Add New Reason
        </Button>
      </div>

      {/* Search Panel */}
      <Card className="border-[#E3EDFF] shadow-md">
        <CardHeader>
          <CardTitle className="text-[#04274F]">Search Reasons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="reasonSearch" className="text-[#04274F]">Search by Reason Description</Label>
              <Input 
                id="reasonSearch"
                placeholder="Enter reason description" 
                value={reasonSearch}
                onChange={(e) => setReasonSearch(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleReasonSearch}
              className="bg-gradient-to-r from-[#2877BB] to-[#1F6098]"
            >
              <Search className="size-4 mr-2" />
              Search
            </Button>
            <Button 
              variant="outline" 
              onClick={handleReasonReset}
              className="border-[#2877BB] text-[#2877BB]"
            >
              <X className="size-4 mr-2" />
              Reset
            </Button>
          </div>

          {filteredReasons.length > 0 && (
            <div className="flex gap-2 mt-4 pt-4 border-t border-[#E3EDFF]">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleExtractReasons("multiple")}
                disabled={selectedReasons.length === 0}
                className="border-[#2877BB] text-[#2877BB]"
              >
                <Download className="size-4 mr-2" />
                Extract Selected ({selectedReasons.length})
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleExtractReasons("all")}
                className="border-emerald-600 text-emerald-600"
              >
                <Download className="size-4 mr-2" />
                Extract All ({filteredReasons.length})
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#04274F]">Search Results</h3>
          <span className="text-sm text-[#6E6E6E]">{filteredReasons.length} reasons found</span>
        </div>

        <div className="grid gap-3">
          {filteredReasons.map((reason) => (
            <Card key={reason.id} className="border-[#E3EDFF]">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Checkbox 
                    checked={selectedReasons.includes(reason.id)}
                    onCheckedChange={() => toggleReasonSelection(reason.id)}
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm px-2 py-1 bg-[#E3EDFF] text-[#2877BB] rounded">{reason.code}</span>
                          <Badge 
                            variant={reason.status === "Active" ? "default" : "secondary"}
                            className={reason.status === "Active" ? "bg-emerald-100 text-emerald-700" : ""}
                          >
                            {reason.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-[#2D2D2D]">{reason.reason}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-[#2877BB] text-[#2877BB]"
                        >
                          <Edit className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRelationshipsContent = () => (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl text-[#04274F]">Relationship Management</h2>
          <p className="text-sm text-[#6E6E6E] mt-1">{currentTab?.description}</p>
        </div>
        <Button 
          onClick={() => setShowRelationshipDialog(true)}
          className="bg-gradient-to-r from-[#2877BB] to-[#1F6098]"
        >
          <Plus className="size-4 mr-2" />
          Add New Relationship
        </Button>
      </div>

      {/* Search Panel */}
      <Card className="border-[#E3EDFF] shadow-md">
        <CardHeader>
          <CardTitle className="text-[#04274F]">Search Relationships</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="relationshipSearch" className="text-[#04274F]">Search by Relationship Name</Label>
              <Input 
                id="relationshipSearch"
                placeholder="Enter relationship name" 
                value={relationshipSearch}
                onChange={(e) => setRelationshipSearch(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleRelationshipSearch}
              className="bg-gradient-to-r from-[#2877BB] to-[#1F6098]"
            >
              <Search className="size-4 mr-2" />
              Search
            </Button>
            <Button 
              variant="outline" 
              onClick={handleRelationshipReset}
              className="border-[#2877BB] text-[#2877BB]"
            >
              <X className="size-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#04274F]">Search Results</h3>
          <span className="text-sm text-[#6E6E6E]">{filteredRelationships.length} relationships found</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredRelationships.map((rel) => (
            <Card key={rel.id} className="border-[#E3EDFF]">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Checkbox 
                    checked={selectedRelationships.includes(rel.id)}
                    onCheckedChange={() => toggleRelationshipSelection(rel.id)}
                  />
                  <Badge 
                    variant={rel.status === "Active" ? "default" : "secondary"}
                    className={rel.status === "Active" ? "bg-emerald-100 text-emerald-700" : ""}
                  >
                    {rel.status}
                  </Badge>
                </div>
                <div className="text-sm px-2 py-1 bg-[#E3EDFF] text-[#2877BB] rounded inline-block mb-2">
                  {rel.code}
                </div>
                <p className="text-sm text-[#04274F]">{rel.relationship}</p>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="w-full mt-3 border-[#2877BB] text-[#2877BB]"
                >
                  <Edit className="size-4 mr-2" />
                  Edit
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderValidationsContent = () => (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl text-[#04274F]">Validation Rules</h2>
          <p className="text-sm text-[#6E6E6E] mt-1">{currentTab?.description}</p>
        </div>
        <Button 
          onClick={() => setShowValidationDialog(true)}
          className="bg-gradient-to-r from-[#2877BB] to-[#1F6098]"
        >
          <Plus className="size-4 mr-2" />
          Add New Validation
        </Button>
      </div>

      {/* Search Panel */}
      <Card className="border-[#E3EDFF] shadow-md">
        <CardHeader>
          <CardTitle className="text-[#04274F]">Search Validations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="validationSearch" className="text-[#04274F]">Search by Validation Description</Label>
              <Input 
                id="validationSearch"
                placeholder="Enter validation description" 
                value={validationSearch}
                onChange={(e) => setValidationSearch(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleValidationSearch}
              className="bg-gradient-to-r from-[#2877BB] to-[#1F6098]"
            >
              <Search className="size-4 mr-2" />
              Search
            </Button>
            <Button 
              variant="outline" 
              onClick={handleValidationReset}
              className="border-[#2877BB] text-[#2877BB]"
            >
              <X className="size-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#04274F]">Search Results</h3>
          <span className="text-sm text-[#6E6E6E]">{filteredValidations.length} validations found</span>
        </div>

        <div className="grid gap-3">
          {filteredValidations.map((validation) => (
            <Card key={validation.id} className="border-[#E3EDFF]">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Checkbox 
                    checked={selectedValidations.includes(validation.id)}
                    onCheckedChange={() => toggleValidationSelection(validation.id)}
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm px-2 py-1 bg-[#E3EDFF] text-[#2877BB] rounded">{validation.code}</span>
                          <Badge 
                            variant={validation.status === "Active" ? "default" : "secondary"}
                            className={validation.status === "Active" ? "bg-emerald-100 text-emerald-700" : ""}
                          >
                            {validation.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-[#2D2D2D]">{validation.description}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-[#2877BB] text-[#2877BB]"
                        >
                          <Edit className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#04274F]">MASTER DATA MANAGEMENT</h1>
        <p className="text-[#6E6E6E] mt-1">Manage reference data and system configurations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <div className="p-4">
              <h3 className="text-[#04274F] mb-4">Master Categories</h3>
              <div className="space-y-2">
                {masterTabs.map((tab) => {
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left",
                        selectedTab === tab.id
                          ? "bg-[#2877BB] text-white shadow-md"
                          : "hover:bg-[#E3EDFF] text-[#04274F]"
                      )}
                    >
                      <div className={cn(
                        "p-2 rounded-lg shrink-0",
                        selectedTab === tab.id ? "bg-white/20" : "bg-[#E3EDFF]"
                      )}>
                        <TabIcon className={cn(
                          "size-4",
                          selectedTab === tab.id ? "text-white" : tab.color === "blue" ? "text-blue-600" :
                          tab.color === "purple" ? "text-purple-600" :
                          tab.color === "green" ? "text-green-600" :
                          "text-orange-600"
                        )} />
                      </div>
                      <span className="text-sm">{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <Card className="border-[#E3EDFF]">
            <CardContent className="p-6">
              {renderTabContent()}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ADD INSURER DIALOG */}
      <Dialog open={showInsurerDialog} onOpenChange={setShowInsurerDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#04274F]">Add New Insurer</DialogTitle>
            <DialogDescription className="text-[#6E6E6E]">
              Enter the insurance company details
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-[#04274F]">Status *</Label>
              <Select value={newInsurer.status} onValueChange={(value) => setNewInsurer({...newInsurer, status: value})}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="insurerCode" className="text-[#04274F]">Insurer Code *</Label>
                <Input 
                  id="insurerCode"
                  placeholder="Enter insurer code" 
                  value={newInsurer.code}
                  onChange={(e) => setNewInsurer({...newInsurer, code: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="insurerName" className="text-[#04274F]">Insurer Name *</Label>
                <Input 
                  id="insurerName"
                  placeholder="Enter insurer name" 
                  value={newInsurer.name}
                  onChange={(e) => setNewInsurer({...newInsurer, name: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="insurerType" className="text-[#04274F]">Insurer Type *</Label>
                <Select value={newInsurer.type} onValueChange={(value) => setNewInsurer({...newInsurer, type: value})}>
                  <SelectTrigger id="insurerType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Private">Private</SelectItem>
                    <SelectItem value="PSU">PSU</SelectItem>
                    <SelectItem value="Standalone">Standalone</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="insurerLogo" className="text-[#04274F]">Logo</Label>
                <Input 
                  id="insurerLogo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewInsurer({...newInsurer, logo: e.target.files?.[0] || null})}
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-[#04274F] mb-4">Nodal Officer Details</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="officerFirstName" className="text-[#04274F]">First Name *</Label>
                  <Input 
                    id="officerFirstName"
                    placeholder="Enter first name" 
                    value={newInsurer.officerFirstName}
                    onChange={(e) => setNewInsurer({...newInsurer, officerFirstName: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="officerLastName" className="text-[#04274F]">Last Name *</Label>
                  <Input 
                    id="officerLastName"
                    placeholder="Enter last name" 
                    value={newInsurer.officerLastName}
                    onChange={(e) => setNewInsurer({...newInsurer, officerLastName: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="officerMobile" className="text-[#04274F]">Mobile Number *</Label>
                  <Input 
                    id="officerMobile"
                    type="tel"
                    placeholder="Enter mobile number" 
                    value={newInsurer.officerMobile}
                    onChange={(e) => setNewInsurer({...newInsurer, officerMobile: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="officerEmail" className="text-[#04274F]">Email ID *</Label>
                  <Input 
                    id="officerEmail"
                    type="email"
                    placeholder="Enter email address" 
                    value={newInsurer.officerEmail}
                    onChange={(e) => setNewInsurer({...newInsurer, officerEmail: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiEnabled" className="text-[#04274F]">API Enable *</Label>
              <Select value={newInsurer.apiEnabled} onValueChange={(value) => setNewInsurer({...newInsurer, apiEnabled: value})}>
                <SelectTrigger id="apiEnabled">
                  <SelectValue placeholder="Select API status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowInsurerDialog(false)}
              className="border-[#6E6E6E] text-[#6E6E6E]"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddInsurer}
              className="bg-gradient-to-r from-[#2877BB] to-[#1F6098]"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ADD REASON DIALOG */}
      <Dialog open={showReasonDialog} onOpenChange={setShowReasonDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#04274F]">Add New Reason for Portability</DialogTitle>
            <DialogDescription className="text-[#6E6E6E]">
              Enter the reason code and description
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reasonStatus" className="text-[#04274F]">Status *</Label>
              <Select value={newReason.status} onValueChange={(value) => setNewReason({...newReason, status: value})}>
                <SelectTrigger id="reasonStatus">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reasonCode" className="text-[#04274F]">Reason Code *</Label>
              <Input 
                id="reasonCode"
                placeholder="Enter reason code" 
                value={newReason.code}
                onChange={(e) => setNewReason({...newReason, code: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reasonText" className="text-[#04274F]">Reason *</Label>
              <Textarea 
                id="reasonText"
                placeholder="Enter reason description (max 200 characters)" 
                value={newReason.reason}
                onChange={(e) => setNewReason({...newReason, reason: e.target.value})}
                maxLength={200}
                rows={4}
              />
              <p className="text-xs text-[#6E6E6E] text-right">{newReason.reason.length}/200 characters</p>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowReasonDialog(false)}
              className="border-[#6E6E6E] text-[#6E6E6E]"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddReason}
              className="bg-gradient-to-r from-[#2877BB] to-[#1F6098]"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ADD RELATIONSHIP DIALOG */}
      <Dialog open={showRelationshipDialog} onOpenChange={setShowRelationshipDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#04274F]">Add New Relationship</DialogTitle>
            <DialogDescription className="text-[#6E6E6E]">
              Enter the relationship code and name
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="relStatus" className="text-[#04274F]">Status *</Label>
              <Select value={newRelationship.status} onValueChange={(value) => setNewRelationship({...newRelationship, status: value})}>
                <SelectTrigger id="relStatus">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="relCode" className="text-[#04274F]">Relationship Code *</Label>
              <Input 
                id="relCode"
                placeholder="Enter relationship code" 
                value={newRelationship.code}
                onChange={(e) => setNewRelationship({...newRelationship, code: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="relName" className="text-[#04274F]">Relationship *</Label>
              <Input 
                id="relName"
                placeholder="Enter relationship name" 
                value={newRelationship.relationship}
                onChange={(e) => setNewRelationship({...newRelationship, relationship: e.target.value})}
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowRelationshipDialog(false)}
              className="border-[#6E6E6E] text-[#6E6E6E]"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddRelationship}
              className="bg-gradient-to-r from-[#2877BB] to-[#1F6098]"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ADD VALIDATION DIALOG */}
      <Dialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#04274F]">Add New Validation Rule</DialogTitle>
            <DialogDescription className="text-[#6E6E6E]">
              Enter the validation code and description
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="valStatus" className="text-[#04274F]">Status *</Label>
              <Select value={newValidation.status} onValueChange={(value) => setNewValidation({...newValidation, status: value})}>
                <SelectTrigger id="valStatus">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="valCode" className="text-[#04274F]">Validation Code *</Label>
              <Input 
                id="valCode"
                placeholder="Enter validation code" 
                value={newValidation.code}
                onChange={(e) => setNewValidation({...newValidation, code: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valDesc" className="text-[#04274F]">Description *</Label>
              <Textarea 
                id="valDesc"
                placeholder="Enter validation description (max 200 characters)" 
                value={newValidation.description}
                onChange={(e) => setNewValidation({...newValidation, description: e.target.value})}
                maxLength={200}
                rows={4}
              />
              <p className="text-xs text-[#6E6E6E] text-right">{newValidation.description.length}/200 characters</p>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowValidationDialog(false)}
              className="border-[#6E6E6E] text-[#6E6E6E]"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddValidation}
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
