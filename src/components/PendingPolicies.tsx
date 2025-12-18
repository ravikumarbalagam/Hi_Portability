import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { 
  Search, 
  Download, 
  Upload, 
  FileSpreadsheet, 
  Calendar as CalendarIcon,
  XCircle,
  File
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

interface UploadRecord {
  id: number;
  fileName: string;
  status: string;
  totalRecords: number;
  successRecords: number;
  errorRecords: number;
  responseGeneratedDate: string;
  policyType: string;
  createdBy: string;
  dateCreated: string;
  updatedBy: string;
  lastUpdated: string;
}

const mockUploadRecords: UploadRecord[] = [
  {
    id: 1,
    fileName: "Retail_Policy_Response_Dec2024.xlsx",
    status: "Completed",
    totalRecords: 450,
    successRecords: 442,
    errorRecords: 8,
    responseGeneratedDate: "2024-12-15 02:45 PM",
    policyType: "Retail",
    createdBy: "Rajesh Kumar",
    dateCreated: "2024-12-15 02:30 PM",
    updatedBy: "System",
    lastUpdated: "2024-12-15 02:45 PM"
  },
  {
    id: 2,
    fileName: "Group_Policy_Response_Dec2024.xlsx",
    status: "Partial",
    totalRecords: 320,
    successRecords: 298,
    errorRecords: 22,
    responseGeneratedDate: "2024-12-14 11:20 AM",
    policyType: "Group",
    createdBy: "Priya Sharma",
    dateCreated: "2024-12-14 11:00 AM",
    updatedBy: "System",
    lastUpdated: "2024-12-14 11:20 AM"
  },
  {
    id: 3,
    fileName: "Retail_Policy_Response_Nov2024.xlsx",
    status: "Completed",
    totalRecords: 580,
    successRecords: 580,
    errorRecords: 0,
    responseGeneratedDate: "2024-11-28 04:15 PM",
    policyType: "Retail",
    createdBy: "Amit Patel",
    dateCreated: "2024-11-28 04:00 PM",
    updatedBy: "System",
    lastUpdated: "2024-11-28 04:15 PM"
  },
  {
    id: 4,
    fileName: "Group_Policy_Response_Nov2024.xlsx",
    status: "Partial",
    totalRecords: 275,
    successRecords: 260,
    errorRecords: 15,
    responseGeneratedDate: "2024-11-25 09:30 AM",
    policyType: "Group",
    createdBy: "Neha Singh",
    dateCreated: "2024-11-25 09:10 AM",
    updatedBy: "System",
    lastUpdated: "2024-11-25 09:30 AM"
  },
  {
    id: 5,
    fileName: "Retail_Policy_Response_Oct2024.xlsx",
    status: "Completed",
    totalRecords: 395,
    successRecords: 389,
    errorRecords: 6,
    responseGeneratedDate: "2024-10-30 01:50 PM",
    policyType: "Retail",
    createdBy: "Vikram Reddy",
    dateCreated: "2024-10-30 01:30 PM",
    updatedBy: "System",
    lastUpdated: "2024-10-30 01:50 PM"
  },
  {
    id: 6,
    fileName: "Group_Policy_Response_Oct2024.xlsx",
    status: "Completed",
    totalRecords: 410,
    successRecords: 410,
    errorRecords: 0,
    responseGeneratedDate: "2024-10-22 03:25 PM",
    policyType: "Group",
    createdBy: "Sunita Mehta",
    dateCreated: "2024-10-22 03:00 PM",
    updatedBy: "System",
    lastUpdated: "2024-10-22 03:25 PM"
  }
];

export function PendingPolicies() {
  const [selectedInsurer, setSelectedInsurer] = useState("");
  const [selectedPolicyType, setSelectedPolicyType] = useState("");
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [searchResults, setSearchResults] = useState<UploadRecord[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleUploadRetailResponse = () => {
    toast.info("Opening Retail Policy Response upload dialog...");
  };

  const handleUploadGroupResponse = () => {
    toast.info("Opening Group Policy Response upload dialog...");
  };

  const handleDownloadRetailPending = () => {
    toast.success("Downloading Retail Policy Pending List...");
  };

  const handleDownloadGroupPending = () => {
    toast.success("Downloading Group Policy Pending List...");
  };

  const handleDownloadTemplate = (templateName: string) => {
    toast.success(`Downloading ${templateName}...`);
  };

  const handleSearch = () => {
    let filteredData = [...mockUploadRecords];

    if (selectedPolicyType === "retail") {
      filteredData = filteredData.filter(r => r.policyType === "Retail");
    } else if (selectedPolicyType === "group") {
      filteredData = filteredData.filter(r => r.policyType === "Group");
    }

    if (selectedInsurer) {
      toast.info(`Filtering by insurer: ${selectedInsurer}`);
    }

    if (fromDate || toDate) {
      toast.info("Filtering by date range");
    }

    setSearchResults(filteredData);
    setShowResults(true);
    setCurrentPage(1);
    toast.success(`Found ${filteredData.length} upload records`);
  };

  const handleDownloadFile = (fileName: string, type: "original" | "error") => {
    toast.success(`Downloading ${type} file: ${fileName}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case "Partial":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Partial Success</Badge>;
      case "Processing":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Processing</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Pagination
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecords = searchResults.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Header with Upload Buttons */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-[#04274F]">View/Upload Data Pending for Response</h1>
          <p className="text-[#6E6E6E] mt-1">Upload policy and member data responses for pending portability requests</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleUploadRetailResponse} className="bg-[#2877BB] hover:bg-[#1F6098]">
            <Upload className="size-4 mr-2" />
            Upload Retail Policy Response
          </Button>
          <Button onClick={handleUploadGroupResponse} className="bg-[#1F6098] hover:bg-[#04274F]">
            <Upload className="size-4 mr-2" />
            Upload Group Policy Response
          </Button>
        </div>
      </div>

      {/* Pending Counts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Retail Pending Count */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="text-sm text-blue-700 mb-1">Pending Retail Policies Count</div>
                <div className="text-3xl text-blue-900 mb-3">1000</div>
                <div className="text-xs text-blue-600">(Distinct Policy Numbers)</div>
              </div>
            </div>
            
            <div className="bg-white/60 rounded-lg p-4 mb-4 border border-blue-200">
              <div className="text-sm text-blue-900 space-y-2">
                <p><strong>Note:</strong> Pendency will be reduced only if both Policy and Member data are uploaded.</p>
                <p>If claims are made by any member(s), they should be included in the response file; otherwise, leave blank.</p>
              </div>
            </div>

            <Button 
              onClick={handleDownloadRetailPending} 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Download className="size-4 mr-2" />
              Download Retail Policy Pending List
            </Button>
          </div>
        </Card>

        {/* Group Pending Count */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="text-sm text-purple-700 mb-1">Pending Group Policies Count</div>
                <div className="text-3xl text-purple-900 mb-3">1604</div>
                <div className="text-xs text-purple-600">(Distinct Policy Numbers)</div>
              </div>
            </div>
            
            <div className="bg-white/60 rounded-lg p-4 mb-4 border border-purple-200">
              <div className="text-sm text-purple-900 space-y-2">
                <p><strong>Note:</strong> Pendency will be reduced only if both Policy and Member data are uploaded.</p>
                <p>If claims are made by any member(s), they should be included in the response file; otherwise, leave blank.</p>
              </div>
            </div>

            <Button 
              onClick={handleDownloadGroupPending} 
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Download className="size-4 mr-2" />
              Download Group Policy Pending List
            </Button>
          </div>
        </Card>
      </div>

      {/* Search Section */}
      <Card>
        <div className="p-6">
          <h2 className="text-[#04274F] mb-6">Search Section</h2>

          {/* Master File Sample Download */}
          <div className="mb-6">
            <h3 className="text-[#1F6098] mb-4">Master File Sample Download</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="justify-start border-[#2877BB] text-[#2877BB] hover:bg-[#E3EDFF]"
                onClick={() => handleDownloadTemplate("File Retail Upload Format")}
              >
                <FileSpreadsheet className="size-5 mr-3 text-blue-600" />
                <span className="flex-1 text-left">File Retail Upload Format</span>
                <Download className="size-4" />
              </Button>
              <Button 
                variant="outline" 
                className="justify-start border-[#1F6098] text-[#1F6098] hover:bg-[#E3EDFF]"
                onClick={() => handleDownloadTemplate("File Group Upload Format")}
              >
                <FileSpreadsheet className="size-5 mr-3 text-purple-600" />
                <span className="flex-1 text-left">File Group Upload Format</span>
                <Download className="size-4" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Insurance Company</Label>
                <Select value={selectedInsurer} onValueChange={setSelectedInsurer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select insurer" />
                  </SelectTrigger>
                  <SelectContent>
                    {insurers.map((insurer) => (
                      <SelectItem key={insurer} value={insurer}>
                        {insurer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Policy Type</Label>
                <Select value={selectedPolicyType} onValueChange={setSelectedPolicyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select policy type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="both">Both</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="group">Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>From Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left",
                        !fromDate && "text-[#6E6E6E]"
                      )}
                    >
                      <CalendarIcon className="mr-2 size-4" />
                      {fromDate ? format(fromDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={fromDate}
                      onSelect={setFromDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>To Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left",
                        !toDate && "text-[#6E6E6E]"
                      )}
                    >
                      <CalendarIcon className="mr-2 size-4" />
                      {toDate ? format(toDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={toDate}
                      onSelect={setToDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <Button onClick={handleSearch} className="bg-[#2877BB] hover:bg-[#1F6098]">
                <Search className="size-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Search Results */}
      {showResults && (
        <Card>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-[#04274F]">Search Results</h2>
                <p className="text-[#6E6E6E] mt-1">
                  Showing {startIndex + 1}-{Math.min(endIndex, searchResults.length)} of {searchResults.length} records
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#E3EDFF]/50">
                    <TableHead className="text-[#04274F]">File Name</TableHead>
                    <TableHead className="text-[#04274F]">Status</TableHead>
                    <TableHead className="text-[#04274F]">Total Records</TableHead>
                    <TableHead className="text-[#04274F]">Success Records</TableHead>
                    <TableHead className="text-[#04274F]">Error Records</TableHead>
                    <TableHead className="text-[#04274F]">Response Generated Date & Time</TableHead>
                    <TableHead className="text-[#04274F]">Policy Type</TableHead>
                    <TableHead className="text-[#04274F]">Created By / Date Created</TableHead>
                    <TableHead className="text-[#04274F]">Updated By / Last Updated</TableHead>
                    <TableHead className="text-[#04274F]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentRecords.length > 0 ? (
                    currentRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileSpreadsheet className="size-4 text-[#2877BB]" />
                            <span className="text-sm text-[#04274F]">{record.fileName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(record.status)}</TableCell>
                        <TableCell className="text-[#04274F]">{record.totalRecords}</TableCell>
                        <TableCell className="text-green-600">{record.successRecords}</TableCell>
                        <TableCell className="text-red-600">{record.errorRecords}</TableCell>
                        <TableCell className="text-[#6E6E6E]">{record.responseGeneratedDate}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              record.policyType === "Retail"
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-purple-500 hover:bg-purple-600"
                            }
                          >
                            {record.policyType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="text-[#04274F]">{record.createdBy}</div>
                            <div className="text-[#6E6E6E] text-xs">{record.dateCreated}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="text-[#04274F]">{record.updatedBy}</div>
                            <div className="text-[#6E6E6E] text-xs">{record.lastUpdated}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadFile(record.fileName, "original")}
                              className="text-[#2877BB] border-[#2877BB] hover:bg-[#E3EDFF]"
                            >
                              <File className="size-3 mr-1" />
                              Original File
                            </Button>
                            {record.errorRecords > 0 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownloadFile(record.fileName, "error")}
                                className="text-red-600 border-red-500 hover:bg-red-50"
                              >
                                <XCircle className="size-3 mr-1" />
                                Error File
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center text-[#6E6E6E] py-8">
                        No records found matching your search criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }
                      
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(pageNumber);
                            }}
                            isActive={currentPage === pageNumber}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                        }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Information Card */}
      <Card className="bg-[#E3EDFF] border-[#2877BB]/20">
        <div className="p-6">
          <h3 className="text-[#04274F] mb-3">Important Information</h3>
          <div className="text-sm text-[#1F6098] space-y-2">
            <p>• Upload both Policy and Member data to reduce pendency count for each policy</p>
            <p>• Include claims data in the response file if any member has made claims; otherwise leave blank</p>
            <p>• Download pending list to see all policies awaiting your response</p>
            <p>• Use the master file templates to ensure correct format for uploads</p>
            <p>• Error files contain details of failed records for correction and re-upload</p>
            <p>• All uploads are processed and validated automatically by the system</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
