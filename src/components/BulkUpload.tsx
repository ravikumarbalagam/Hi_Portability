import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  CheckCircle2, 
  XCircle, 
  Search,
  Calendar as CalendarIcon,
  File
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import { toast } from "sonner@2.0.3";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";

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

const sampleTemplates = [
  { id: 1, name: "Retail File Upload Format", icon: FileSpreadsheet, color: "text-blue-600" },
  { id: 2, name: "Group File Upload Format", icon: FileSpreadsheet, color: "text-purple-600" },
  { id: 3, name: "Porting Reason", icon: File, color: "text-green-600" },
  { id: 4, name: "Insurer List", icon: File, color: "text-orange-600" },
  { id: 5, name: "Current Previous Year", icon: File, color: "text-indigo-600" },
  { id: 6, name: "Gender", icon: File, color: "text-pink-600" },
  { id: 7, name: "Policy Porting Type", icon: File, color: "text-teal-600" }
];

interface UploadRecord {
  id: number;
  fileName: string;
  fileStatus: "Processing" | "Completed" | "Error" | "Partial";
  totalRecords: number;
  createdBy: string;
  dateCreated: string;
  updatedBy: string;
  lastUpdated: string;
  successCount: number;
  errorCount: number;
}

const mockUploadData: UploadRecord[] = [
  {
    id: 1,
    fileName: "Retail_Policy_Upload_Dec2024.xlsx",
    fileStatus: "Completed",
    totalRecords: 250,
    createdBy: "Rajesh Kumar",
    dateCreated: "2024-12-15 10:30 AM",
    updatedBy: "System",
    lastUpdated: "2024-12-15 10:35 AM",
    successCount: 250,
    errorCount: 0
  },
  {
    id: 2,
    fileName: "Group_Policy_Upload_Dec2024.xlsx",
    fileStatus: "Partial",
    totalRecords: 180,
    createdBy: "Priya Sharma",
    dateCreated: "2024-12-14 03:20 PM",
    updatedBy: "System",
    lastUpdated: "2024-12-14 03:28 PM",
    successCount: 165,
    errorCount: 15
  },
  {
    id: 3,
    fileName: "Retail_Policy_Upload_Nov2024.xlsx",
    fileStatus: "Error",
    totalRecords: 120,
    createdBy: "Amit Patel",
    dateCreated: "2024-12-13 11:45 AM",
    updatedBy: "System",
    lastUpdated: "2024-12-13 11:50 AM",
    successCount: 0,
    errorCount: 120
  },
  {
    id: 4,
    fileName: "Group_Policy_Upload_Nov2024.xlsx",
    fileStatus: "Completed",
    totalRecords: 310,
    createdBy: "Neha Singh",
    dateCreated: "2024-12-12 09:15 AM",
    updatedBy: "System",
    lastUpdated: "2024-12-12 09:22 AM",
    successCount: 310,
    errorCount: 0
  },
  {
    id: 5,
    fileName: "Retail_Policy_Upload_Oct2024.xlsx",
    fileStatus: "Processing",
    totalRecords: 95,
    createdBy: "Vikram Reddy",
    dateCreated: "2024-12-11 02:30 PM",
    updatedBy: "System",
    lastUpdated: "2024-12-11 02:32 PM",
    successCount: 45,
    errorCount: 0
  }
];

export function BulkUpload() {
  const [selectedInsurer, setSelectedInsurer] = useState("");
  const [selectedPolicyType, setSelectedPolicyType] = useState("");
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [searchResults, setSearchResults] = useState<UploadRecord[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleUploadRetail = () => {
    toast.info("Opening Retail Policy upload dialog...");
    // Simulate file upload dialog
  };

  const handleUploadGroup = () => {
    toast.info("Opening Group Policy upload dialog...");
    // Simulate file upload dialog
  };

  const handleDownloadTemplate = (templateName: string) => {
    toast.success(`Downloading ${templateName}...`);
  };

  const handleSearch = () => {
    // Filter data based on search criteria
    let filteredData = [...mockUploadData];

    if (selectedInsurer) {
      // In real implementation, filter by insurer
      toast.info(`Filtering by insurer: ${selectedInsurer}`);
    }

    if (selectedPolicyType) {
      filteredData = filteredData.filter(record => 
        record.fileName.toLowerCase().includes(selectedPolicyType.toLowerCase())
      );
    }

    if (fromDate || toDate) {
      // In real implementation, filter by date range
      toast.info("Filtering by date range");
    }

    setSearchResults(filteredData);
    setShowResults(true);
    toast.success(`Found ${filteredData.length} upload records`);
  };

  const handleDownloadFile = (fileName: string, type: "original" | "success" | "error") => {
    toast.success(`Downloading ${type} file: ${fileName}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case "Partial":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Partial Success</Badge>;
      case "Error":
        return <Badge className="bg-red-500 hover:bg-red-600">Error</Badge>;
      case "Processing":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Processing</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Action Buttons */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-[#04274F]">Bulk Upload for Acquiring Request</h1>
          <p className="text-[#6E6E6E] mt-1">Upload multiple policy requests using Excel templates</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleUploadRetail} className="bg-[#2877BB] hover:bg-[#1F6098]">
            <Upload className="size-4 mr-2" />
            Upload Retail Policy Request File
          </Button>
          <Button onClick={handleUploadGroup} className="bg-[#1F6098] hover:bg-[#04274F]">
            <Upload className="size-4 mr-2" />
            Upload Group Policy Request File
          </Button>
        </div>
      </div>

      {/* Master Sample Download Section */}
      <Card>
        <div className="p-6">
          <h2 className="text-[#04274F] mb-2">Master Sample Download</h2>
          <p className="text-[#6E6E6E] mb-6">Download template files and reference data for bulk uploads</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleTemplates.map((template) => {
              const IconComponent = template.icon;
              return (
                <div
                  key={template.id}
                  className="flex items-center justify-between p-4 border border-[#2877BB]/20 rounded-lg hover:bg-[#E3EDFF]/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className={cn("size-8", template.color)} />
                    <div>
                      <div className="text-sm text-[#04274F]">{template.name}</div>
                      <div className="text-xs text-[#6E6E6E]">Excel format</div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadTemplate(template.name)}
                  >
                    <Download className="size-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Filter Section */}
      <Card>
        <div className="p-6">
          <h2 className="text-[#04274F] mb-2">Filter Uploaded Files</h2>
          <p className="text-[#6E6E6E] mb-6">Search and filter bulk upload records</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Insurance Company */}
            <div className="space-y-2">
              <Label htmlFor="filter-insurer">Insurance Company</Label>
              <Select value={selectedInsurer} onValueChange={setSelectedInsurer}>
                <SelectTrigger id="filter-insurer">
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

            {/* Policy Type */}
            <div className="space-y-2">
              <Label htmlFor="filter-policy-type">Policy Type</Label>
              <Select value={selectedPolicyType} onValueChange={setSelectedPolicyType}>
                <SelectTrigger id="filter-policy-type">
                  <SelectValue placeholder="Select policy type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="group">Group</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* From Date */}
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

            {/* To Date */}
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

          <Button onClick={handleSearch} className="bg-[#2877BB] hover:bg-[#1F6098]">
            <Search className="size-4 mr-2" />
            Search
          </Button>
        </div>
      </Card>

      {/* Search Results Display */}
      {showResults && (
        <Card>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-[#04274F]">Upload History</h2>
                <p className="text-[#6E6E6E] mt-1">
                  Showing {searchResults.length} upload record{searchResults.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#E3EDFF]/50">
                    <TableHead className="text-[#04274F]">File Name</TableHead>
                    <TableHead className="text-[#04274F]">File Status</TableHead>
                    <TableHead className="text-[#04274F]">Total Records</TableHead>
                    <TableHead className="text-[#04274F]">Success / Error</TableHead>
                    <TableHead className="text-[#04274F]">Created By</TableHead>
                    <TableHead className="text-[#04274F]">Date Created</TableHead>
                    <TableHead className="text-[#04274F]">Updated By</TableHead>
                    <TableHead className="text-[#04274F]">Last Updated</TableHead>
                    <TableHead className="text-[#04274F]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="size-4 text-[#2877BB]" />
                          <span className="text-sm text-[#04274F]">{record.fileName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(record.fileStatus)}</TableCell>
                      <TableCell>
                        <span className="text-sm text-[#04274F]">{record.totalRecords}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-sm text-green-600">
                            <CheckCircle2 className="size-3" />
                            {record.successCount}
                          </span>
                          <span className="text-[#6E6E6E]">/</span>
                          <span className="flex items-center gap-1 text-sm text-red-600">
                            <XCircle className="size-3" />
                            {record.errorCount}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-[#04274F]">{record.createdBy}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-[#6E6E6E]">{record.dateCreated}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-[#04274F]">{record.updatedBy}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-[#6E6E6E]">{record.lastUpdated}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadFile(record.fileName, "original")}
                            className="text-[#2877BB] border-[#2877BB] hover:bg-[#E3EDFF]"
                          >
                            <Download className="size-3 mr-1" />
                            Original
                          </Button>
                          {record.successCount > 0 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadFile(record.fileName, "success")}
                              className="text-green-600 border-green-500 hover:bg-green-50"
                            >
                              <CheckCircle2 className="size-3 mr-1" />
                              Success
                            </Button>
                          )}
                          {record.errorCount > 0 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadFile(record.fileName, "error")}
                              className="text-red-600 border-red-500 hover:bg-red-50"
                            >
                              <XCircle className="size-3 mr-1" />
                              Error
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>
      )}

      {/* Information Card */}
      <Card className="bg-[#E3EDFF] border-[#2877BB]/20">
        <div className="p-6">
          <h3 className="text-[#04274F] mb-3">Upload Guidelines</h3>
          <div className="text-sm text-[#1F6098] space-y-2">
            <p>• Download the appropriate template (Retail or Group) before uploading</p>
            <p>• Ensure all mandatory fields are filled correctly in the template</p>
            <p>• Maximum file size: 10 MB, Maximum records: 500 per file</p>
            <p>• Supported formats: .xlsx, .xls, .csv</p>
            <p>• Use the reference files (Porting Reason, Insurer List, etc.) for valid values</p>
            <p>• Date format should be DD/MM/YYYY</p>
            <p>• Success and Error files will be generated after processing for your review</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
