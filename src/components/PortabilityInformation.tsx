import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { 
  Search, 
  Download, 
  FileDown, 
  Calendar as CalendarIcon, 
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import { toast } from "sonner@2.0.3";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

const insurers = [
  "National Insurance",
  "Narayana Health Insurance",
  "Galaxy Health Insurance",
  "State Farm",
  "SBI General Insurance",
  "United India Insurance",
  "ICICI Lombard",
  "HiZuno General Insurance",
  "Niv Bupa Health Insurance",
  "Aditya Birla Health Insurance",
  "Oriental Insurance",
  "New India Assurance",
  "TATA AIG",
  "Kotak Mahindra General Insurance",
  "Liberty General Insurance"
];

interface PolicyRecord {
  id: number;
  policyNumber: string;
  existingInsurer: string;
  responseSentDate?: string;
  policyStartDate: string;
  policyEndDate: string;
  policyStatus: string;
  policyStatusUpdatedDate?: string;
  requestReceivedDate: string;
  certificateNumber?: string;
  memberReferenceKey: string;
  policyType: string;
  dateOfBirth?: string;
  requestUploadDate?: string;
  tat?: number;
  responseReceiptDate?: string;
}

const mockPolicyRecords: PolicyRecord[] = [
  {
    id: 1,
    policyNumber: "POL-2024-1001",
    existingInsurer: "National Insurance",
    responseSentDate: "2024-12-10",
    policyStartDate: "2024-01-15",
    policyEndDate: "2025-01-14",
    policyStatus: "Active",
    policyStatusUpdatedDate: "2024-12-10",
    requestReceivedDate: "2024-12-05",
    certificateNumber: "CERT-2024-A-1001",
    memberReferenceKey: "MRK-12345-ABC",
    policyType: "Retail",
    dateOfBirth: "1985-06-15",
    requestUploadDate: "2024-12-04",
    tat: 5,
    responseReceiptDate: "2024-12-10"
  },
  {
    id: 2,
    policyNumber: "POL-2024-1002",
    existingInsurer: "ICICI Lombard",
    responseSentDate: "2024-12-11",
    policyStartDate: "2024-02-20",
    policyEndDate: "2025-02-19",
    policyStatus: "Active",
    policyStatusUpdatedDate: "2024-12-11",
    requestReceivedDate: "2024-12-06",
    certificateNumber: "CERT-2024-A-1002",
    memberReferenceKey: "MRK-12346-DEF",
    policyType: "Group",
    dateOfBirth: "1990-03-22",
    requestUploadDate: "2024-12-05",
    tat: 6,
    responseReceiptDate: "2024-12-11"
  },
  {
    id: 3,
    policyNumber: "POL-2024-1004",
    existingInsurer: "SBI General Insurance",
    responseSentDate: "2024-12-12",
    policyStartDate: "2024-03-10",
    policyEndDate: "2025-03-09",
    policyStatus: "Active",
    policyStatusUpdatedDate: "2024-12-12",
    requestReceivedDate: "2024-12-07",
    certificateNumber: "CERT-2024-A-1004",
    memberReferenceKey: "MRK-12347-GHI",
    policyType: "Group",
    dateOfBirth: "1988-11-08",
    requestUploadDate: "2024-12-06",
    tat: 7,
    responseReceiptDate: "2024-12-12"
  },
  {
    id: 4,
    policyNumber: "POL-2024-1003",
    existingInsurer: "Niv Bupa Health Insurance",
    responseSentDate: "2024-12-13",
    policyStartDate: "2024-04-05",
    policyEndDate: "2025-04-04",
    policyStatus: "Active",
    policyStatusUpdatedDate: "2024-12-13",
    requestReceivedDate: "2024-12-08",
    certificateNumber: "CERT-2024-A-1003",
    memberReferenceKey: "MRK-12348-JKL",
    policyType: "Retail",
    dateOfBirth: "1982-09-17",
    requestUploadDate: "2024-12-07",
    tat: 8,
    responseReceiptDate: "2024-12-13"
  }
];

interface UploadRecord {
  id: number;
  fileName: string;
  fileStatus: string;
  totalRecords: number;
  policyType: string;
  createdBy: string;
  dateCreated: string;
  updatedBy: string;
  lastUpdated: string;
  successCount?: number;
  errorCount?: number;
  responseGeneratedDate?: string;
}

const mockUploadRecords: UploadRecord[] = [
  {
    id: 1,
    fileName: "Retail_Invalid_Upload_Dec2024.xlsx",
    fileStatus: "Processed",
    totalRecords: 150,
    policyType: "Retail",
    createdBy: "Rajesh Kumar",
    dateCreated: "2024-12-15 10:30 AM",
    updatedBy: "System",
    lastUpdated: "2024-12-15 10:35 AM",
    successCount: 120,
    errorCount: 30
  },
  {
    id: 2,
    fileName: "Group_Status_Update_Dec2024.xlsx",
    fileStatus: "Completed",
    totalRecords: 250,
    policyType: "Group",
    createdBy: "Priya Sharma",
    dateCreated: "2024-12-14 03:20 PM",
    updatedBy: "System",
    lastUpdated: "2024-12-14 03:28 PM",
    successCount: 245,
    errorCount: 5,
    responseGeneratedDate: "2024-12-14 03:28 PM"
  }
];

interface TabItem {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
}

const portabilityTabs: TabItem[] = [
  {
    id: "tab1",
    name: "Download Response",
    icon: Download,
    color: "blue",
    description: "Download response files for acquiring policies"
  },
  {
    id: "tab2",
    name: "Pending Response",
    icon: Clock,
    color: "orange",
    description: "View policies with pending responses"
  },
  {
    id: "tab3",
    name: "Update Status",
    icon: RefreshCw,
    color: "purple",
    description: "Update policy status information"
  },
  {
    id: "tab4",
    name: "Invalid Upload",
    icon: AlertCircle,
    color: "red",
    description: "Manage invalid policy upload records"
  },
  {
    id: "tab5",
    name: "Bulk Status Update",
    icon: FileSpreadsheet,
    color: "green",
    description: "Perform bulk status updates via file upload"
  }
];

export function PortabilityInformation() {
  const [selectedTab, setSelectedTab] = useState<string>("tab1");
  
  // Tab 1 states
  const [tab1FromDate, setTab1FromDate] = useState<Date>();
  const [tab1ToDate, setTab1ToDate] = useState<Date>();
  const [tab1RetailChecked, setTab1RetailChecked] = useState(false);
  const [tab1GroupChecked, setTab1GroupChecked] = useState(false);
  const [tab1Results, setTab1Results] = useState<PolicyRecord[]>([]);
  const [tab1ShowResults, setTab1ShowResults] = useState(false);

  // Tab 2 states
  const [tab2FromDate, setTab2FromDate] = useState<Date>();
  const [tab2ToDate, setTab2ToDate] = useState<Date>();
  const [tab2Insurer, setTab2Insurer] = useState("");
  const [tab2Results, setTab2Results] = useState<PolicyRecord[]>([]);
  const [tab2ShowResults, setTab2ShowResults] = useState(false);

  // Tab 3 states
  const [tab3Insurer, setTab3Insurer] = useState("");
  const [tab3FileName, setTab3FileName] = useState("");
  const [tab3Results, setTab3Results] = useState<PolicyRecord[]>([]);
  const [tab3ShowResults, setTab3ShowResults] = useState(false);
  const [selectedPolicies, setSelectedPolicies] = useState<number[]>([]);
  const [bulkStatus, setBulkStatus] = useState("");

  // Tab 4 states
  const [tab4PolicyType, setTab4PolicyType] = useState("");
  const [tab4Results, setTab4Results] = useState<UploadRecord[]>([]);
  const [tab4ShowResults, setTab4ShowResults] = useState(false);

  // Tab 5 states
  const [tab5PolicyType, setTab5PolicyType] = useState("");
  const [tab5Results, setTab5Results] = useState<UploadRecord[]>([]);
  const [tab5ShowResults, setTab5ShowResults] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Tab 1 handlers
  const handleTab1Search = () => {
    if (!tab1FromDate || !tab1ToDate) {
      toast.error("Please select date range");
      return;
    }
    if (!tab1RetailChecked && !tab1GroupChecked) {
      toast.error("Please select at least one policy category");
      return;
    }
    setTab1Results(mockPolicyRecords);
    setTab1ShowResults(true);
    setCurrentPage(1);
    toast.success("Response files retrieved successfully");
  };

  const handleTab1Download = () => {
    toast.success("Downloading response file...");
  };

  // Tab 2 handlers
  const handleTab2Search = () => {
    if (!tab2FromDate || !tab2ToDate) {
      toast.error("Please select date range");
      return;
    }
    if (!tab2Insurer) {
      toast.error("Please select an insurer");
      return;
    }
    setTab2Results(mockPolicyRecords);
    setTab2ShowResults(true);
    setCurrentPage(1);
    toast.success(`Found ${mockPolicyRecords.length} pending policies`);
  };

  // Tab 3 handlers
  const handleTab3Search = () => {
    if (!tab3Insurer) {
      toast.error("Please select an insurer");
      return;
    }
    setTab3Results(mockPolicyRecords);
    setTab3ShowResults(true);
    setCurrentPage(1);
    toast.success(`Found ${mockPolicyRecords.length} policies`);
  };

  const handleSelectPolicy = (id: number) => {
    if (selectedPolicies.includes(id)) {
      setSelectedPolicies(selectedPolicies.filter(pId => pId !== id));
    } else {
      setSelectedPolicies([...selectedPolicies, id]);
    }
  };

  const handleUpdateStatus = () => {
    if (selectedPolicies.length === 0) {
      toast.error("Please select at least one policy");
      return;
    }
    toast.success(`Updating status for ${selectedPolicies.length} selected policies`);
  };

  // Tab 4 handlers
  const handleTab4Search = () => {
    let filteredData = [...mockUploadRecords];
    if (tab4PolicyType === "retail") {
      filteredData = filteredData.filter(r => r.policyType === "Retail");
    } else if (tab4PolicyType === "group") {
      filteredData = filteredData.filter(r => r.policyType === "Group");
    }
    setTab4Results(filteredData);
    setTab4ShowResults(true);
    setCurrentPage(1);
    toast.success(`Found ${filteredData.length} upload records`);
  };

  // Tab 5 handlers
  const handleTab5Search = () => {
    let filteredData = [...mockUploadRecords];
    if (tab5PolicyType === "retail") {
      filteredData = filteredData.filter(r => r.policyType === "Retail");
    } else if (tab5PolicyType === "group") {
      filteredData = filteredData.filter(r => r.policyType === "Group");
    }
    setTab5Results(filteredData);
    setTab5ShowResults(true);
    setCurrentPage(1);
    toast.success(`Found ${filteredData.length} status update records`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case "Pending":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Pending</Badge>;
      case "Cancelled":
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelled</Badge>;
      case "Processed":
      case "Completed":
        return <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Get current tab details
  const currentTab = portabilityTabs.find(tab => tab.id === selectedTab);

  // Render content based on selected tab
  const renderTabContent = () => {
    switch (selectedTab) {
      case "tab1":
        return renderTab1Content();
      case "tab2":
        return renderTab2Content();
      case "tab3":
        return renderTab3Content();
      case "tab4":
        return renderTab4Content();
      case "tab5":
        return renderTab5Content();
      default:
        return null;
    }
  };

  const renderTab1Content = () => (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl text-[#04274F]">Download Response File</h2>
        <p className="text-sm text-[#6E6E6E] mt-1">{currentTab?.description}</p>
      </div>

      {/* Search Panel */}
      <Card className="border-[#E3EDFF] shadow-md">
        <CardHeader>
          <CardTitle className="text-[#04274F]">Search Panel</CardTitle>
          <p className="text-sm text-[#6E6E6E]">Filter response files by date range and policy category</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Response Received From Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left", !tab1FromDate && "text-[#6E6E6E]")}
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {tab1FromDate ? format(tab1FromDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={tab1FromDate} onSelect={setTab1FromDate} />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Response Received To Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left", !tab1ToDate && "text-[#6E6E6E]")}
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {tab1ToDate ? format(tab1ToDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={tab1ToDate} onSelect={setTab1ToDate} />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Policy Category</Label>
            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="retail" 
                  checked={tab1RetailChecked}
                  onCheckedChange={(checked) => setTab1RetailChecked(checked as boolean)}
                />
                <label htmlFor="retail" className="text-sm cursor-pointer">Retail</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="group" 
                  checked={tab1GroupChecked}
                  onCheckedChange={(checked) => setTab1GroupChecked(checked as boolean)}
                />
                <label htmlFor="group" className="text-sm cursor-pointer">Group</label>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={handleTab1Search}
              className="bg-gradient-to-r from-[#2877BB] to-[#1F6098]"
            >
              <Search className="size-4 mr-2" />
              Search
            </Button>
            {tab1ShowResults && (
              <Button 
                onClick={handleTab1Download}
                variant="outline"
                className="border-[#2877BB] text-[#2877BB]"
              >
                <Download className="size-4 mr-2" />
                Download Response File
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {tab1ShowResults && (
        <Card className="border-[#E3EDFF]">
          <CardHeader>
            <CardTitle className="text-[#04274F]">Response Files</CardTitle>
            <p className="text-sm text-[#6E6E6E]">{tab1Results.length} records found</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Policy Number</TableHead>
                    <TableHead>Existing Insurer</TableHead>
                    <TableHead>Response Sent Date</TableHead>
                    <TableHead>Policy Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>TAT (Days)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tab1Results.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-mono text-sm">{record.policyNumber}</TableCell>
                      <TableCell>{record.existingInsurer}</TableCell>
                      <TableCell>{record.responseSentDate}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{record.policyType}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(record.policyStatus)}</TableCell>
                      <TableCell>{record.tat}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderTab2Content = () => (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl text-[#04274F]">Pending Response Policies</h2>
        <p className="text-sm text-[#6E6E6E] mt-1">{currentTab?.description}</p>
      </div>

      {/* Search Panel */}
      <Card className="border-[#E3EDFF] shadow-md">
        <CardHeader>
          <CardTitle className="text-[#04274F]">Search Panel</CardTitle>
          <p className="text-sm text-[#6E6E6E]">Filter pending policies by date range and insurer</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Request Received From Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left", !tab2FromDate && "text-[#6E6E6E]")}
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {tab2FromDate ? format(tab2FromDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={tab2FromDate} onSelect={setTab2FromDate} />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Request Received To Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left", !tab2ToDate && "text-[#6E6E6E]")}
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {tab2ToDate ? format(tab2ToDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={tab2ToDate} onSelect={setTab2ToDate} />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Existing Insurer</Label>
            <Select value={tab2Insurer} onValueChange={setTab2Insurer}>
              <SelectTrigger>
                <SelectValue placeholder="Select insurer" />
              </SelectTrigger>
              <SelectContent>
                {insurers.map((insurer) => (
                  <SelectItem key={insurer} value={insurer}>{insurer}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleTab2Search}
            className="bg-gradient-to-r from-[#2877BB] to-[#1F6098]"
          >
            <Search className="size-4 mr-2" />
            Search
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {tab2ShowResults && (
        <Card className="border-[#E3EDFF]">
          <CardHeader>
            <CardTitle className="text-[#04274F]">Pending Policies</CardTitle>
            <p className="text-sm text-[#6E6E6E]">{tab2Results.length} pending policies found</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Policy Number</TableHead>
                    <TableHead>Existing Insurer</TableHead>
                    <TableHead>Request Received Date</TableHead>
                    <TableHead>Policy Type</TableHead>
                    <TableHead>Member Reference Key</TableHead>
                    <TableHead>Days Pending</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tab2Results.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-mono text-sm">{record.policyNumber}</TableCell>
                      <TableCell>{record.existingInsurer}</TableCell>
                      <TableCell>{record.requestReceivedDate}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{record.policyType}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{record.memberReferenceKey}</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-500">{record.tat}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderTab3Content = () => (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl text-[#04274F]">Update Policy Status</h2>
        <p className="text-sm text-[#6E6E6E] mt-1">{currentTab?.description}</p>
      </div>

      {/* Search Panel */}
      <Card className="border-[#E3EDFF] shadow-md">
        <CardHeader>
          <CardTitle className="text-[#04274F]">Search Panel</CardTitle>
          <p className="text-sm text-[#6E6E6E]">Search policies to update their status</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Existing Insurer</Label>
              <Select value={tab3Insurer} onValueChange={setTab3Insurer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select insurer" />
                </SelectTrigger>
                <SelectContent>
                  {insurers.map((insurer) => (
                    <SelectItem key={insurer} value={insurer}>{insurer}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>File Name (Optional)</Label>
              <Input 
                placeholder="Enter file name"
                value={tab3FileName}
                onChange={(e) => setTab3FileName(e.target.value)}
              />
            </div>
          </div>

          <Button 
            onClick={handleTab3Search}
            className="bg-gradient-to-r from-[#2877BB] to-[#1F6098]"
          >
            <Search className="size-4 mr-2" />
            Search
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {tab3ShowResults && (
        <>
          <Card className="border-[#E3EDFF] bg-[#E3EDFF]/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Label>Update Status To:</Label>
                  <Select value={bulkStatus} onValueChange={setBulkStatus}>
                    <SelectTrigger className="w-48 bg-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleUpdateStatus}
                  disabled={selectedPolicies.length === 0 || !bulkStatus}
                  className="bg-gradient-to-r from-[#2877BB] to-[#1F6098]"
                >
                  <RefreshCw className="size-4 mr-2" />
                  Update Selected ({selectedPolicies.length})
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E3EDFF]">
            <CardHeader>
              <CardTitle className="text-[#04274F]">Policies for Status Update</CardTitle>
              <p className="text-sm text-[#6E6E6E]">{tab3Results.length} policies found</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox 
                          checked={selectedPolicies.length === tab3Results.length}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedPolicies(tab3Results.map(r => r.id));
                            } else {
                              setSelectedPolicies([]);
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>Policy Number</TableHead>
                      <TableHead>Existing Insurer</TableHead>
                      <TableHead>Policy Type</TableHead>
                      <TableHead>Current Status</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tab3Results.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedPolicies.includes(record.id)}
                            onCheckedChange={() => handleSelectPolicy(record.id)}
                          />
                        </TableCell>
                        <TableCell className="font-mono text-sm">{record.policyNumber}</TableCell>
                        <TableCell>{record.existingInsurer}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{record.policyType}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(record.policyStatus)}</TableCell>
                        <TableCell>{record.policyStartDate}</TableCell>
                        <TableCell>{record.policyEndDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );

  const renderTab4Content = () => (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl text-[#04274F]">Invalid Policy Upload Records</h2>
        <p className="text-sm text-[#6E6E6E] mt-1">{currentTab?.description}</p>
      </div>

      {/* Search Panel */}
      <Card className="border-[#E3EDFF] shadow-md">
        <CardHeader>
          <CardTitle className="text-[#04274F]">Search Panel</CardTitle>
          <p className="text-sm text-[#6E6E6E]">Filter invalid upload records by policy type</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Policy Type</Label>
            <Select value={tab4PolicyType} onValueChange={setTab4PolicyType}>
              <SelectTrigger>
                <SelectValue placeholder="Select policy type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="group">Group</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleTab4Search}
            className="bg-gradient-to-r from-[#2877BB] to-[#1F6098]"
          >
            <Search className="size-4 mr-2" />
            Search
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {tab4ShowResults && (
        <Card className="border-[#E3EDFF]">
          <CardHeader>
            <CardTitle className="text-[#04274F]">Invalid Upload Records</CardTitle>
            <p className="text-sm text-[#6E6E6E]">{tab4Results.length} records found</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Policy Type</TableHead>
                    <TableHead>Total Records</TableHead>
                    <TableHead>Success</TableHead>
                    <TableHead>Errors</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Date Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tab4Results.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-mono text-sm">{record.fileName}</TableCell>
                      <TableCell>{getStatusBadge(record.fileStatus)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{record.policyType}</Badge>
                      </TableCell>
                      <TableCell>{record.totalRecords}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="size-4" />
                          {record.successCount}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-red-600">
                          <XCircle className="size-4" />
                          {record.errorCount}
                        </div>
                      </TableCell>
                      <TableCell>{record.createdBy}</TableCell>
                      <TableCell>{record.dateCreated}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="border-[#2877BB] text-[#2877BB]">
                          <Download className="size-4 mr-2" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderTab5Content = () => (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl text-[#04274F]">Bulk Status Update</h2>
        <p className="text-sm text-[#6E6E6E] mt-1">{currentTab?.description}</p>
      </div>

      {/* Upload Section */}
      <Card className="border-[#E3EDFF] shadow-md">
        <CardHeader>
          <CardTitle className="text-[#04274F]">Upload Status Update File</CardTitle>
          <p className="text-sm text-[#6E6E6E]">Upload Excel file with policy status updates</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-[#E3EDFF] rounded-lg p-8 text-center">
            <Upload className="size-12 mx-auto text-[#2877BB] mb-4" />
            <p className="text-sm text-[#6E6E6E] mb-4">
              Drag and drop your file here or click to browse
            </p>
            <Button variant="outline" className="border-[#2877BB] text-[#2877BB]">
              <Upload className="size-4 mr-2" />
              Choose File
            </Button>
            <p className="text-xs text-[#6E6E6E] mt-4">
              Supported format: .xlsx, .xls (Max 10MB)
            </p>
          </div>

          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-[#2877BB] to-[#1F6098]">
              <Upload className="size-4 mr-2" />
              Upload and Process
            </Button>
            <Button variant="outline" className="border-[#2877BB] text-[#2877BB]">
              <FileDown className="size-4 mr-2" />
              Download Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Panel */}
      <Card className="border-[#E3EDFF] shadow-md">
        <CardHeader>
          <CardTitle className="text-[#04274F]">View Upload History</CardTitle>
          <p className="text-sm text-[#6E6E6E]">Search previous bulk status update records</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Policy Type</Label>
            <Select value={tab5PolicyType} onValueChange={setTab5PolicyType}>
              <SelectTrigger>
                <SelectValue placeholder="Select policy type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="group">Group</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleTab5Search}
            className="bg-gradient-to-r from-[#2877BB] to-[#1F6098]"
          >
            <Search className="size-4 mr-2" />
            Search
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {tab5ShowResults && (
        <Card className="border-[#E3EDFF]">
          <CardHeader>
            <CardTitle className="text-[#04274F]">Upload History</CardTitle>
            <p className="text-sm text-[#6E6E6E]">{tab5Results.length} records found</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Policy Type</TableHead>
                    <TableHead>Total Records</TableHead>
                    <TableHead>Success</TableHead>
                    <TableHead>Errors</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Response Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tab5Results.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-mono text-sm">{record.fileName}</TableCell>
                      <TableCell>{getStatusBadge(record.fileStatus)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{record.policyType}</Badge>
                      </TableCell>
                      <TableCell>{record.totalRecords}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="size-4" />
                          {record.successCount}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-red-600">
                          <XCircle className="size-4" />
                          {record.errorCount}
                        </div>
                      </TableCell>
                      <TableCell>{record.createdBy}</TableCell>
                      <TableCell>{record.dateCreated}</TableCell>
                      <TableCell>{record.responseGeneratedDate || "-"}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-[#2877BB] text-[#2877BB]">
                            <Download className="size-4 mr-2" />
                            Result
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#04274F]">PORTABILITY INFORMATION</h1>
        <p className="text-[#6E6E6E] mt-1">Manage policy portability requests, responses, and status updates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <div className="p-4">
              <h3 className="text-[#04274F] mb-4">Portability Operations</h3>
              <div className="space-y-2">
                {portabilityTabs.map((tab) => {
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
                          selectedTab === tab.id ? "text-white" : 
                          tab.color === "blue" ? "text-blue-600" :
                          tab.color === "orange" ? "text-orange-600" :
                          tab.color === "purple" ? "text-purple-600" :
                          tab.color === "red" ? "text-red-600" :
                          "text-green-600"
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
    </div>
  );
}
