import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarIcon, Download, FileText, BarChart3, TrendingUp } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import { toast } from "sonner@2.0.3";
import { Checkbox } from "./ui/checkbox";

const reportTypes = [
  {
    id: "portability-summary",
    name: "Portability Summary Report",
    description: "Overview of all portability requests with status breakdown",
    icon: BarChart3
  },
  {
    id: "insurer-wise",
    name: "Insurer-wise Report",
    description: "Requests grouped by previous insurer",
    icon: FileText
  },
  {
    id: "turnaround-time",
    name: "Turnaround Time Report",
    description: "Analysis of request processing times and SLA compliance",
    icon: TrendingUp
  },
  {
    id: "pending-analysis",
    name: "Pending Requests Analysis",
    description: "Detailed view of all pending requests with aging",
    icon: BarChart3
  },
  {
    id: "monthly-trends",
    name: "Monthly Trends Report",
    description: "Month-over-month portability trends and patterns",
    icon: TrendingUp
  },
  {
    id: "bulk-upload",
    name: "Bulk Upload Report",
    description: "Summary of all bulk upload activities",
    icon: FileText
  }
];

export function Reports() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  const handleGenerateReport = () => {
    if (selectedReports.length === 0) {
      toast.error("Please select at least one report type");
      return;
    }
    if (!startDate || !endDate) {
      toast.error("Please select date range");
      return;
    }
    toast.success("Report generation started. You will be notified when ready.");
  };

  const toggleReport = (reportId: string) => {
    setSelectedReports(prev =>
      prev.includes(reportId)
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-slate-900">Reports</h1>
        <p className="text-slate-500 mt-1">Generate and download various portability reports</p>
      </div>

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
          <CardDescription>Select report parameters and date range</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left",
                      !startDate && "text-slate-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {startDate ? format(startDate, "PPP") : "Select start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left",
                      !endDate && "text-slate-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {endDate ? format(endDate, "PPP") : "Select end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="format">Report Format</Label>
              <Select defaultValue="pdf">
                <SelectTrigger id="format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="insurer-filter">Filter by Insurer (Optional)</Label>
              <Select>
                <SelectTrigger id="insurer-filter">
                  <SelectValue placeholder="All insurers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Insurers</SelectItem>
                  <SelectItem value="star">Star Health</SelectItem>
                  <SelectItem value="care">Care Health</SelectItem>
                  <SelectItem value="max">Max Bupa</SelectItem>
                  <SelectItem value="niva">Niva Bupa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Types */}
      <Card>
        <CardHeader>
          <CardTitle>Select Report Types</CardTitle>
          <CardDescription>Choose one or more reports to generate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              const isSelected = selectedReports.includes(report.id);
              
              return (
                <div
                  key={report.id}
                  className={cn(
                    "flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all",
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  )}
                  onClick={() => toggleReport(report.id)}
                >
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleReport(report.id)}
                  />
                  <div className={`p-2 rounded ${isSelected ? "bg-blue-100" : "bg-slate-100"}`}>
                    <Icon className={`size-5 ${isSelected ? "text-blue-600" : "text-slate-600"}`} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm ${isSelected ? "text-blue-900" : "text-slate-900"}`}>
                      {report.name}
                    </div>
                    <div className={`text-xs mt-1 ${isSelected ? "text-blue-700" : "text-slate-500"}`}>
                      {report.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <div className="flex gap-3">
        <Button onClick={handleGenerateReport} className="flex-1">
          <Download className="size-4 mr-2" />
          Generate Selected Reports
        </Button>
        <Button variant="outline" onClick={() => setSelectedReports([])}>
          Clear Selection
        </Button>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Previously generated reports available for download</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Portability Summary - November 2024", date: "2024-11-23", size: "2.4 MB" },
              { name: "Insurer-wise Report - Q3 2024", date: "2024-11-20", size: "1.8 MB" },
              { name: "Turnaround Time Analysis - October 2024", date: "2024-11-15", size: "3.1 MB" }
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <FileText className="size-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-slate-900">{report.name}</div>
                    <div className="text-xs text-slate-500">Generated on {report.date} • {report.size}</div>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="size-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Report Information</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-2">
          <p>• Reports are generated based on selected date range and filters</p>
          <p>• Large reports may take a few minutes to generate</p>
          <p>• Generated reports are stored for 30 days and can be re-downloaded</p>
          <p>• Scheduled reports can be configured to run automatically</p>
          <p>• All report access is logged for audit purposes</p>
        </CardContent>
      </Card>
    </div>
  );
}
