import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { MultiSelect } from "./ui/multi-select";
import { 
  Calendar as CalendarIcon, 
  FileDown, 
  Search,
  FileText,
  TrendingUp,
  BarChart3,
  Activity,
  DollarSign,
  CheckCircle,
  XCircle,
  FileCheck,
  Database,
  Settings,
  FileSpreadsheet,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import { toast } from "sonner@2.0.3";
import { Checkbox } from "./ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

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

interface ReportItem {
  id: string;
  name: string;
  pageTitle: string;
  icon: any;
  description: string;
}

interface ReportGroup {
  id: string;
  name: string;
  icon: any;
  color: string;
  reports: ReportItem[];
}

const reportGroups: ReportGroup[] = [
  {
    id: "policy-requests",
    name: "Policy Request Reports",
    icon: FileText,
    color: "blue",
    reports: [
      {
        id: "requests-accepted",
        name: "Requests Accepted",
        pageTitle: "PIR Accepted Report Download",
        icon: CheckCircle,
        description: "Download report of all accepted policy portability requests"
      },
      {
        id: "requests-received",
        name: "Requests Received",
        pageTitle: "PIR Received Report Download",
        icon: FileCheck,
        description: "Download report of all received policy portability requests"
      },
      {
        id: "requests-rejected",
        name: "Requests Rejected",
        pageTitle: "PIR Rejected Report Download",
        icon: XCircle,
        description: "Download report of all rejected policy portability requests"
      },
      {
        id: "acquiring-request",
        name: "Acquiring Request Policies",
        pageTitle: "PIR Policy-wise Request Report Download",
        icon: FileSpreadsheet,
        description: "Download policy-wise acquiring request report"
      },
      {
        id: "policy-existing",
        name: "Policy-wise Existing Data",
        pageTitle: "Existing Insurer Report Download",
        icon: Database,
        description: "Download policy-wise existing data report"
      }
    ]
  },
  {
    id: "summary-reports",
    name: "Summary & Analysis Reports",
    icon: BarChart3,
    color: "purple",
    reports: [
      {
        id: "insurer-typewise",
        name: "Insurer Type-Wise Summary",
        pageTitle: "Insurer Type Wise Portability Report Download",
        icon: TrendingUp,
        description: "Download insurer type-wise portability status summary"
      },
      {
        id: "reason-wise",
        name: "Reason-wise Policies",
        pageTitle: "Reason-wise Portability Report Download",
        icon: AlertCircle,
        description: "Download reason-wise number of policies report"
      },
      {
        id: "status-pending",
        name: "Status Update Pending",
        pageTitle: "Status Updation Porting Report Download",
        icon: Activity,
        description: "Download status updation pending policies report"
      },
      {
        id: "insurer-summary",
        name: "Insurer-wise Summary",
        pageTitle: "Summary Report Download",
        icon: BarChart3,
        description: "Download insurer-wise existing summary report"
      }
    ]
  },
  {
    id: "system-reports",
    name: "System & Technical Reports",
    icon: Settings,
    color: "green",
    reports: [
      {
        id: "api-log",
        name: "API Log",
        pageTitle: "GET API LOG DETAILS BY SEARCH",
        icon: Database,
        description: "Search and view API request/response logs"
      },
      {
        id: "hit-reconciliation",
        name: "Hit Reconciliation",
        pageTitle: "Hit Reconciliation Report Download",
        icon: Activity,
        description: "Download hit reconciliation report"
      },
      {
        id: "detailed-policy",
        name: "Detailed Policy Report",
        pageTitle: "Detailed Policy Report Download",
        icon: FileText,
        description: "Download detailed policy information report"
      }
    ]
  },
  {
    id: "usage-billing",
    name: "Usage & Billing Reports",
    icon: DollarSign,
    color: "orange",
    reports: [
      {
        id: "usage-billing",
        name: "Usage Count & Billing",
        pageTitle: "Usage Count and Billing Report Download",
        icon: DollarSign,
        description: "Download usage count and billing report"
      },
      {
        id: "usage-response",
        name: "Usage - Policy Response",
        pageTitle: "Usage Summary Report for Policy Response",
        icon: FileCheck,
        description: "Download usage summary for policy response"
      },
      {
        id: "usage-status",
        name: "Usage - Status Update",
        pageTitle: "Usage Summary Report for Policy Status Update",
        icon: Activity,
        description: "Download usage summary for status updates"
      },
      {
        id: "usage-invalid",
        name: "Usage - Invalid Policy",
        pageTitle: "Usage Summary Report for Invalid Policy",
        icon: XCircle,
        description: "Download usage summary for invalid policies"
      },
      {
        id: "usage-request",
        name: "Usage - Policy Request",
        pageTitle: "Usage Summary Report for Policy Request",
        icon: FileSpreadsheet,
        description: "Download usage summary for policy requests"
      }
    ]
  }
];

interface APILogResult {
  id: number;
  timestamp: string;
  insurerName: string;
  methodType: string;
  policyType: string;
  requestData: string;
  responseData: string;
  statusCode: number;
}

const mockAPILogs: APILogResult[] = [
  {
    id: 1,
    timestamp: "2024-12-18 10:30:45",
    insurerName: "ICICI Lombard",
    methodType: "POST",
    policyType: "Retail",
    requestData: '{"policyNumber": "POL-2024-1001"}',
    responseData: '{"status": "success", "data": {...}}',
    statusCode: 200
  },
  {
    id: 2,
    timestamp: "2024-12-18 10:28:12",
    insurerName: "SBI General Insurance",
    methodType: "GET",
    policyType: "Group",
    requestData: '{"requestId": "REQ-2024-5678"}',
    responseData: '{"status": "success", "data": {...}}',
    statusCode: 200
  }
];

export function Reports() {
  const [selectedReport, setSelectedReport] = useState<string>("requests-accepted");
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [policyType, setPolicyType] = useState("");

  // API Log specific states
  const [apiSearchText, setApiSearchText] = useState("");
  const [apiInsurer, setApiInsurer] = useState("");
  const [apiMethodType, setApiMethodType] = useState("");
  const [apiResults, setApiResults] = useState<APILogResult[]>([]);
  const [showApiResults, setShowApiResults] = useState(false);

  // Multi-select states
  const [selectedInsurersMulti, setSelectedInsurersMulti] = useState<string[]>([]);
  const [usedMethod, setUsedMethod] = useState("");
  const [timePeriod, setTimePeriod] = useState("");

  const handleExtract = (reportName: string) => {
    if (!fromDate || !toDate) {
      toast.error("Please select date range");
      return;
    }
    if (!policyType) {
      toast.error("Please select policy type");
      return;
    }
    toast.success(`Extracting ${reportName}...`);
  };

  const handleAPILogSearch = () => {
    setApiResults(mockAPILogs);
    setShowApiResults(true);
    toast.success("API logs retrieved successfully");
  };

  const handleInsurerToggle = (insurer: string) => {
    setSelectedInsurersMulti(prev =>
      prev.includes(insurer)
        ? prev.filter(i => i !== insurer)
        : [...prev, insurer]
    );
  };

  const getCurrentReport = () => {
    for (const group of reportGroups) {
      const report = group.reports.find(r => r.id === selectedReport);
      if (report) return report;
    }
    return reportGroups[0].reports[0];
  };

  const currentReport = getCurrentReport();

  const isUsageReport = selectedReport.startsWith("usage-") && selectedReport !== "usage-billing";
  const isAPILog = selectedReport === "api-log";
  const isHitReconciliation = selectedReport === "hit-reconciliation";

  const renderStandardReportForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label>From Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left", !fromDate && "text-[#6E6E6E]")}
              >
                <CalendarIcon className="mr-2 size-4" />
                {fromDate ? format(fromDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={fromDate} onSelect={setFromDate} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>To Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left", !toDate && "text-[#6E6E6E]")}
              >
                <CalendarIcon className="mr-2 size-4" />
                {toDate ? format(toDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={toDate} onSelect={setToDate} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Policy Type</Label>
          <Select value={policyType} onValueChange={setPolicyType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="both">Both</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="group">Group</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Button onClick={() => handleExtract(currentReport.name)} className="bg-[#2877BB] hover:bg-[#1F6098]">
          <FileDown className="size-4 mr-2" />
          Extract
        </Button>
      </div>
    </div>
  );

  const renderAPILogForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2 md:col-span-2 lg:col-span-3">
          <Label>Search by Request/Response</Label>
          <Input
            placeholder="Enter search text..."
            value={apiSearchText}
            onChange={(e) => setApiSearchText(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>From Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left", !fromDate && "text-[#6E6E6E]")}
              >
                <CalendarIcon className="mr-2 size-4" />
                {fromDate ? format(fromDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={fromDate} onSelect={setFromDate} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>To Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left", !toDate && "text-[#6E6E6E]")}
              >
                <CalendarIcon className="mr-2 size-4" />
                {toDate ? format(toDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={toDate} onSelect={setToDate} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Insurer Name</Label>
          <Select value={apiInsurer} onValueChange={setApiInsurer}>
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
          <Label>Method Type</Label>
          <Select value={apiMethodType} onValueChange={setApiMethodType}>
            <SelectTrigger>
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Policy Type</Label>
          <Select value={policyType} onValueChange={setPolicyType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="both">Both</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="group">Group</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Button onClick={handleAPILogSearch} className="bg-[#2877BB] hover:bg-[#1F6098]">
          <Search className="size-4 mr-2" />
          Get Details
        </Button>
      </div>

      {showApiResults && (
        <Card className="mt-6">
          <div className="p-6">
            <h3 className="text-[#04274F] mb-4">API Log Results</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#E3EDFF]/50">
                    <TableHead className="text-[#04274F]">Timestamp</TableHead>
                    <TableHead className="text-[#04274F]">Insurer Name</TableHead>
                    <TableHead className="text-[#04274F]">Method Type</TableHead>
                    <TableHead className="text-[#04274F]">Policy Type</TableHead>
                    <TableHead className="text-[#04274F]">Status Code</TableHead>
                    <TableHead className="text-[#04274F]">Request Data</TableHead>
                    <TableHead className="text-[#04274F]">Response Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiResults.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-[#6E6E6E]">{log.timestamp}</TableCell>
                      <TableCell className="text-[#04274F]">{log.insurerName}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {log.methodType}
                        </span>
                      </TableCell>
                      <TableCell className="text-[#04274F]">{log.policyType}</TableCell>
                      <TableCell>
                        <span className={cn(
                          "px-2 py-1 rounded text-xs",
                          log.statusCode === 200 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        )}>
                          {log.statusCode}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-[#6E6E6E] max-w-xs truncate">{log.requestData}</TableCell>
                      <TableCell className="text-xs text-[#6E6E6E] max-w-xs truncate">{log.responseData}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>
      )}
    </div>
  );

  const renderHitReconciliationForm = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Insurance Company (Multi-select)</Label>
        <MultiSelect
          options={insurers}
          selected={selectedInsurersMulti}
          onChange={setSelectedInsurersMulti}
          placeholder="Select insurance companies..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label>Policy Type</Label>
          <Select value={policyType} onValueChange={setPolicyType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
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
                className={cn("w-full justify-start text-left", !fromDate && "text-[#6E6E6E]")}
              >
                <CalendarIcon className="mr-2 size-4" />
                {fromDate ? format(fromDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={fromDate} onSelect={setFromDate} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>To Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left", !toDate && "text-[#6E6E6E]")}
              >
                <CalendarIcon className="mr-2 size-4" />
                {toDate ? format(toDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={toDate} onSelect={setToDate} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div>
        <Button onClick={() => handleExtract("Hit Reconciliation Report")} className="bg-[#2877BB] hover:bg-[#1F6098]">
          <FileDown className="size-4 mr-2" />
          Extract
        </Button>
      </div>
    </div>
  );

  const renderUsageReportForm = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Insurance Company (Multi-select)</Label>
        <MultiSelect
          options={insurers}
          selected={selectedInsurersMulti}
          onChange={setSelectedInsurersMulti}
          placeholder="Select insurance companies..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label>Used Method</Label>
          <Select value={usedMethod} onValueChange={setUsedMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="api">API</SelectItem>
              <SelectItem value="upload">File Upload</SelectItem>
              <SelectItem value="manual">Manual Entry</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Time Period</Label>
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger>
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Policy Type</Label>
          <Select value={policyType} onValueChange={setPolicyType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="both">Both</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="group">Group</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>From Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left", !fromDate && "text-[#6E6E6E]")}
              >
                <CalendarIcon className="mr-2 size-4" />
                {fromDate ? format(fromDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={fromDate} onSelect={setFromDate} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>To Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left", !toDate && "text-[#6E6E6E]")}
              >
                <CalendarIcon className="mr-2 size-4" />
                {toDate ? format(toDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={toDate} onSelect={setToDate} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div>
        <Button onClick={() => handleExtract(currentReport.name)} className="bg-[#2877BB] hover:bg-[#1F6098]">
          <FileDown className="size-4 mr-2" />
          Extract
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#04274F]">REPORT DASHBOARD</h1>
        <p className="text-[#6E6E6E] mt-1">Generate and extract comprehensive reports for policy portability data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <div className="p-4">
              <h3 className="text-[#04274F] mb-4">Report Categories</h3>
              <Accordion type="single" collapsible defaultValue="policy-requests">
                {reportGroups.map((group) => {
                  const GroupIcon = group.icon;
                  return (
                    <AccordionItem key={group.id} value={group.id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2 rounded-lg",
                            group.color === "blue" && "bg-blue-100",
                            group.color === "purple" && "bg-purple-100",
                            group.color === "green" && "bg-green-100",
                            group.color === "orange" && "bg-orange-100"
                          )}>
                            <GroupIcon className={cn(
                              "size-5",
                              group.color === "blue" && "text-blue-600",
                              group.color === "purple" && "text-purple-600",
                              group.color === "green" && "text-green-600",
                              group.color === "orange" && "text-orange-600"
                            )} />
                          </div>
                          <span className="text-sm text-[#04274F]">{group.name}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 ml-2 mt-2">
                          {group.reports.map((report) => {
                            const ReportIcon = report.icon;
                            return (
                              <button
                                key={report.id}
                                onClick={() => setSelectedReport(report.id)}
                                className={cn(
                                  "w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left",
                                  selectedReport === report.id
                                    ? "bg-[#2877BB] text-white shadow-md"
                                    : "hover:bg-[#E3EDFF] text-[#04274F]"
                                )}
                              >
                                <ReportIcon className={cn(
                                  "size-4 shrink-0",
                                  selectedReport === report.id ? "text-white" : "text-[#2877BB]"
                                )} />
                                <span className="text-sm">{report.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <Card>
            <div className="p-6">
              {/* Report Header */}
              <div className="mb-6 pb-6 border-b border-[#2877BB]/20">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#E3EDFF] rounded-lg">
                    {(() => {
                      const ReportIcon = currentReport.icon;
                      return <ReportIcon className="size-6 text-[#2877BB]" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-[#04274F] mb-1">{currentReport.pageTitle}</h2>
                    <p className="text-sm text-[#6E6E6E]">{currentReport.description}</p>
                  </div>
                </div>
              </div>

              {/* Report Form */}
              {isAPILog && renderAPILogForm()}
              {isHitReconciliation && renderHitReconciliationForm()}
              {isUsageReport && renderUsageReportForm()}
              {!isAPILog && !isHitReconciliation && !isUsageReport && renderStandardReportForm()}
            </div>
          </Card>
        </div>
      </div>

      {/* Information Card */}
      <Card className="bg-[#E3EDFF] border-[#2877BB]/20">
        <div className="p-6">
          <h3 className="text-[#04274F] mb-3">Report Information</h3>
          <div className="text-sm text-[#1F6098] space-y-2">
            <p>• All reports are generated in Excel format for easy data analysis</p>
            <p>• Select appropriate date range to get accurate report data</p>
            <p>• Policy Type selection filters data for Retail, Group, or Both categories</p>
            <p>• Usage Summary reports support multi-select for insurers to generate consolidated reports</p>
            <p>• API Log provides detailed request/response tracking for debugging and audit purposes</p>
            <p>• All report extractions are logged for compliance and audit trails</p>
          </div>
        </div>
      </Card>
    </div>
  );
}