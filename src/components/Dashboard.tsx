import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { 
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  CalendarIcon
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { format } from "date-fns";

const portStats = [
  {
    title: "Port Requests Received",
    overall: "1,000",
    today: "0",
    icon: ArrowDownLeft,
    gradient: "from-[#2877BB] to-[#1F6098]",
    iconBg: "bg-white/20",
    textColor: "text-[#2877BB]"
  },
  {
    title: "Accepted Port Requests",
    overall: "2,000",
    today: "0",
    icon: CheckCircle2,
    gradient: "from-emerald-500 to-emerald-600",
    iconBg: "bg-white/20",
    textColor: "text-emerald-600"
  },
  {
    title: "Pending Port Requests",
    overall: "1,200",
    today: "0",
    icon: Clock,
    gradient: "from-amber-500 to-orange-500",
    iconBg: "bg-white/20",
    textColor: "text-amber-600"
  },
  {
    title: "Rejected Port Requests",
    overall: "900",
    today: "0",
    icon: XCircle,
    gradient: "from-rose-500 to-red-600",
    iconBg: "bg-white/20",
    textColor: "text-rose-600"
  },
];

// TAT Data for different time periods
const tatDataByPeriod = {
  day: [
    { time: "00:00", requests: 5, updated: 4 },
    { time: "04:00", requests: 3, updated: 3 },
    { time: "08:00", requests: 12, updated: 10 },
    { time: "12:00", requests: 18, updated: 15 },
    { time: "16:00", requests: 15, updated: 14 },
    { time: "20:00", requests: 8, updated: 7 },
  ],
  week: [
    { time: "Mon", requests: 45, updated: 42 },
    { time: "Tue", requests: 52, updated: 48 },
    { time: "Wed", requests: 48, updated: 45 },
    { time: "Thu", requests: 55, updated: 50 },
    { time: "Fri", requests: 60, updated: 55 },
    { time: "Sat", requests: 30, updated: 28 },
    { time: "Sun", requests: 25, updated: 24 },
  ],
  month: [
    { time: "Week 1", requests: 180, updated: 165 },
    { time: "Week 2", requests: 210, updated: 195 },
    { time: "Week 3", requests: 195, updated: 180 },
    { time: "Week 4", requests: 220, updated: 205 },
  ],
  quarter: [
    { time: "Month 1", requests: 805, updated: 745 },
    { time: "Month 2", requests: 890, updated: 825 },
    { time: "Month 3", requests: 920, updated: 860 },
  ],
};

// TAT Analysis data
const tatAnalysisData = [
  { status: "Received", count: 1200 },
  { status: "Responded", count: 950 },
  { status: "Pending", count: 250 },
];

// Response TAT data
const responseTatData = [
  { time: "< 24hrs", count: 450 },
  { time: "24-48hrs", count: 320 },
  { time: "48-72hrs", count: 180 },
  { time: "> 72hrs", count: 50 },
];

// Port-In requests over time
const portInOverTime = [
  { month: "Jan", count: 120 },
  { month: "Feb", count: 145 },
  { month: "Mar", count: 180 },
  { month: "Apr", count: 165 },
  { month: "May", count: 195 },
  { month: "Jun", count: 210 },
  { month: "Jul", count: 185 },
  { month: "Aug", count: 220 },
];

// Request and Response Status over time
const statusOverTime = [
  { month: "Jan", received: 120, approved: 95, rejected: 15, pending: 10 },
  { month: "Feb", received: 145, approved: 115, rejected: 18, pending: 12 },
  { month: "Mar", received: 180, approved: 145, rejected: 20, pending: 15 },
  { month: "Apr", received: 165, approved: 130, rejected: 22, pending: 13 },
  { month: "May", received: 195, approved: 155, rejected: 25, pending: 15 },
  { month: "Jun", received: 210, approved: 170, rejected: 28, pending: 12 },
];

// Port-In vs Port-Out metrics
const portInOutData = [
  { name: "Port-In", value: 1200, color: "#3b82f6" },
  { name: "Port-Out", value: 800, color: "#10b981" },
];

const COLORS = ["#3b82f6", "#10b981"];

export function Dashboard() {
  const [tatPeriod, setTatPeriod] = useState<"day" | "week" | "month" | "quarter" | "custom">("week");
  const [tatAnalysisPeriod, setTatAnalysisPeriod] = useState<"day" | "week" | "month" | "quarter" | "custom">("week");
  const [responseTatPeriod, setResponseTatPeriod] = useState<"day" | "week" | "month" | "quarter" | "custom">("week");
  const [portInPeriod, setPortInPeriod] = useState<"day" | "week" | "month" | "quarter" | "custom">("week");
  const [statusOverTimePeriod, setStatusOverTimePeriod] = useState<"day" | "week" | "month" | "quarter" | "custom">("week");
  const [portMetricsPeriod, setPortMetricsPeriod] = useState<"day" | "week" | "month" | "quarter" | "custom">("week");

  // Date range states for custom selection
  const [tatDateRange, setTatDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [tatAnalysisDateRange, setTatAnalysisDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [responseTatDateRange, setResponseTatDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [portInDateRange, setPortInDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [statusOverTimeDateRange, setStatusOverTimeDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [portMetricsDateRange, setPortMetricsDateRange] = useState<{ from?: Date; to?: Date }>({});

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#04274F]">Dashboard</h1>
          <p className="text-[#6E6E6E] mt-1">Overview of health insurance portability requests</p>
        </div>
        <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-emerald-100 px-4 py-2 rounded-full border border-emerald-200">
          <div className="size-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-emerald-700">System Online</span>
        </div>
      </div>

      {/* Port Request Stats Grid - Modern Cards with Gradient */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portStats.map((stat) => {
          const Icon = stat.icon;
          
          return (
            <Card key={stat.title} className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${stat.gradient}`}>
              {/* Decorative Circle */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              
              <CardContent className="p-6 relative z-10">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <p className="text-white/90 text-sm">{stat.title}</p>
                    <div className={`p-2.5 rounded-xl ${stat.iconBg} backdrop-blur-sm`}>
                      <Icon className="size-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-white/70 mb-1">Overall</div>
                      <div className="text-white text-3xl">{stat.overall}</div>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-white/20">
                      <div className="text-xs text-white/70">Today:</div>
                      <div className="text-white text-sm">{stat.today}</div>
                      <div className="ml-auto text-xs text-white/60">0%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Tiles - 2 per row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. TAT from Request to Status Update */}
        <Card className="border-[#E3EDFF] shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-[#F8FBFF]">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-[#04274F] font-extrabold">TAT: Request to Status Update</CardTitle>
                <CardDescription className="text-[#6E6E6E]">Port-In Insurer turnaround time</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Tabs value={tatPeriod} onValueChange={(v) => setTatPeriod(v as any)}>
                  <TabsList>
                    <TabsTrigger value="day" className="text-xs px-2">Day</TabsTrigger>
                    <TabsTrigger value="week" className="text-xs px-2">Week</TabsTrigger>
                    <TabsTrigger value="month" className="text-xs px-2">Month</TabsTrigger>
                    <TabsTrigger value="quarter" className="text-xs px-2">Quarter</TabsTrigger>
                    <TabsTrigger value="custom" className="text-xs px-2">Custom</TabsTrigger>
                  </TabsList>
                </Tabs>
                {tatPeriod === "custom" && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {tatDateRange.from ? (
                          tatDateRange.to ? (
                            `${format(tatDateRange.from, "MMM dd")} - ${format(tatDateRange.to, "MMM dd")}`
                          ) : (
                            format(tatDateRange.from, "MMM dd, yyyy")
                          )
                        ) : (
                          "Pick dates"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="range"
                        selected={{ from: tatDateRange.from, to: tatDateRange.to }}
                        onSelect={(range) => setTatDateRange(range || {})}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={tatDataByPeriod[tatPeriod]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={2} name="Requests" />
                <Line type="monotone" dataKey="updated" stroke="#10b981" strokeWidth={2} name="Updated" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 2. TAT Analysis for Requests vs Responses */}
        <Card className="border-[#E3EDFF] shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-[#F8FBFF]">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-[#04274F] font-extrabold">TAT Analysis</CardTitle>
                <CardDescription className="text-[#6E6E6E]">Port-In requests vs responses received and pending</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Tabs value={tatAnalysisPeriod} onValueChange={(v) => setTatAnalysisPeriod(v as any)}>
                  <TabsList>
                    <TabsTrigger value="day" className="text-xs px-2">Day</TabsTrigger>
                    <TabsTrigger value="week" className="text-xs px-2">Week</TabsTrigger>
                    <TabsTrigger value="month" className="text-xs px-2">Month</TabsTrigger>
                    <TabsTrigger value="quarter" className="text-xs px-2">Quarter</TabsTrigger>
                    <TabsTrigger value="custom" className="text-xs px-2">Custom</TabsTrigger>
                  </TabsList>
                </Tabs>
                {tatAnalysisPeriod === "custom" && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {tatAnalysisDateRange.from ? (
                          tatAnalysisDateRange.to ? (
                            `${format(tatAnalysisDateRange.from, "MMM dd")} - ${format(tatAnalysisDateRange.to, "MMM dd")}`
                          ) : (
                            format(tatAnalysisDateRange.from, "MMM dd, yyyy")
                          )
                        ) : (
                          "Pick dates"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="range"
                        selected={{ from: tatAnalysisDateRange.from, to: tatAnalysisDateRange.to }}
                        onSelect={(range) => setTatAnalysisDateRange(range || {})}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={tatAnalysisData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="status" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-gradient-to-br from-[#2877BB]/10 to-[#E3EDFF] rounded-xl border border-[#E3EDFF]">
                <div className="text-xs text-[#6E6E6E]">Received</div>
                <div className="text-[#2877BB] mt-1">1,200</div>
              </div>
              <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                <div className="text-xs text-[#6E6E6E]">Responded</div>
                <div className="text-emerald-700 mt-1">950</div>
              </div>
              <div className="p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                <div className="text-xs text-[#6E6E6E]">Pending</div>
                <div className="text-amber-700 mt-1">250</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. TAT from Response to Status Update */}
        <Card className="border-[#E3EDFF] shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-[#F8FBFF]">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-[#04274F] font-extrabold">TAT: Response to Status Update</CardTitle>
                <CardDescription className="text-[#6E6E6E]">Port-In Insurer response time analysis</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Tabs value={responseTatPeriod} onValueChange={(v) => setResponseTatPeriod(v as any)}>
                  <TabsList>
                    <TabsTrigger value="day" className="text-xs px-2">Day</TabsTrigger>
                    <TabsTrigger value="week" className="text-xs px-2">Week</TabsTrigger>
                    <TabsTrigger value="month" className="text-xs px-2">Month</TabsTrigger>
                    <TabsTrigger value="quarter" className="text-xs px-2">Quarter</TabsTrigger>
                    <TabsTrigger value="custom" className="text-xs px-2">Custom</TabsTrigger>
                  </TabsList>
                </Tabs>
                {responseTatPeriod === "custom" && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {responseTatDateRange.from ? (
                          responseTatDateRange.to ? (
                            `${format(responseTatDateRange.from, "MMM dd")} - ${format(responseTatDateRange.to, "MMM dd")}`
                          ) : (
                            format(responseTatDateRange.from, "MMM dd, yyyy")
                          )
                        ) : (
                          "Pick dates"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="range"
                        selected={{ from: responseTatDateRange.from, to: responseTatDateRange.to }}
                        onSelect={(range) => setResponseTatDateRange(range || {})}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={responseTatData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" fontSize={12} />
                <YAxis dataKey="time" type="category" stroke="#64748b" fontSize={12} width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 4. Port-In Requests Analysis Over Time */}
        <Card className="border-[#E3EDFF] shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-[#F8FBFF]">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-[#04274F] font-extrabold">Port-In Requests Over Time</CardTitle>
                <CardDescription className="text-[#6E6E6E]">Monthly trend analysis of incoming port requests</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Tabs value={portInPeriod} onValueChange={(v) => setPortInPeriod(v as any)}>
                  <TabsList>
                    <TabsTrigger value="day" className="text-xs px-2">Day</TabsTrigger>
                    <TabsTrigger value="week" className="text-xs px-2">Week</TabsTrigger>
                    <TabsTrigger value="month" className="text-xs px-2">Month</TabsTrigger>
                    <TabsTrigger value="quarter" className="text-xs px-2">Quarter</TabsTrigger>
                    <TabsTrigger value="custom" className="text-xs px-2">Custom</TabsTrigger>
                  </TabsList>
                </Tabs>
                {portInPeriod === "custom" && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {portInDateRange.from ? (
                          portInDateRange.to ? (
                            `${format(portInDateRange.from, "MMM dd")} - ${format(portInDateRange.to, "MMM dd")}`
                          ) : (
                            format(portInDateRange.from, "MMM dd, yyyy")
                          )
                        ) : (
                          "Pick dates"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="range"
                        selected={{ from: portInDateRange.from, to: portInDateRange.to }}
                        onSelect={(range) => setPortInDateRange(range || {})}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={portInOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={2} name="Requests" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <div>
                <div className="text-xs text-[#6E6E6E]">Average Monthly Growth</div>
                <div className="text-purple-700 mt-1">+12.5%</div>
              </div>
              <TrendingUp className="size-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        {/* 5. Port-In Requests and Response Status Over Time */}
        <Card className="border-[#E3EDFF] shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-[#F8FBFF]">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-[#04274F] font-extrabold">Request & Response Status Over Time</CardTitle>
                <CardDescription className="text-[#6E6E6E]">Port-In status breakdown by month</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Tabs value={statusOverTimePeriod} onValueChange={(v) => setStatusOverTimePeriod(v as any)}>
                  <TabsList>
                    <TabsTrigger value="day" className="text-xs px-2">Day</TabsTrigger>
                    <TabsTrigger value="week" className="text-xs px-2">Week</TabsTrigger>
                    <TabsTrigger value="month" className="text-xs px-2">Month</TabsTrigger>
                    <TabsTrigger value="quarter" className="text-xs px-2">Quarter</TabsTrigger>
                    <TabsTrigger value="custom" className="text-xs px-2">Custom</TabsTrigger>
                  </TabsList>
                </Tabs>
                {statusOverTimePeriod === "custom" && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {statusOverTimeDateRange.from ? (
                          statusOverTimeDateRange.to ? (
                            `${format(statusOverTimeDateRange.from, "MMM dd")} - ${format(statusOverTimeDateRange.to, "MMM dd")}`
                          ) : (
                            format(statusOverTimeDateRange.from, "MMM dd, yyyy")
                          )
                        ) : (
                          "Pick dates"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="range"
                        selected={{ from: statusOverTimeDateRange.from, to: statusOverTimeDateRange.to }}
                        onSelect={(range) => setStatusOverTimeDateRange(range || {})}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statusOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Bar dataKey="received" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Received" />
                <Bar dataKey="approved" fill="#10b981" radius={[4, 4, 0, 0]} name="Approved" />
                <Bar dataKey="rejected" fill="#ef4444" radius={[4, 4, 0, 0]} name="Rejected" />
                <Bar dataKey="pending" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 6. Port-In and Port-Out Metrics Dashboard */}
        <Card className="border-[#E3EDFF] shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-[#F8FBFF]">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-[#04274F] font-extrabold">Port in and Port Out Metrics Dashboard</CardTitle>
                <CardDescription className="text-[#6E6E6E]">Overall portability movement analysis with detailed metrics</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Tabs value={portMetricsPeriod} onValueChange={(v) => setPortMetricsPeriod(v as any)}>
                  <TabsList>
                    <TabsTrigger value="day" className="text-xs px-2">Day</TabsTrigger>
                    <TabsTrigger value="week" className="text-xs px-2">Week</TabsTrigger>
                    <TabsTrigger value="month" className="text-xs px-2">Month</TabsTrigger>
                    <TabsTrigger value="quarter" className="text-xs px-2">Quarter</TabsTrigger>
                    <TabsTrigger value="custom" className="text-xs px-2">Custom</TabsTrigger>
                  </TabsList>
                </Tabs>
                {portMetricsPeriod === "custom" && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {portMetricsDateRange.from ? (
                          portMetricsDateRange.to ? (
                            `${format(portMetricsDateRange.from, "MMM dd")} - ${format(portMetricsDateRange.to, "MMM dd")}`
                          ) : (
                            format(portMetricsDateRange.from, "MMM dd, yyyy")
                          )
                        ) : (
                          "Pick dates"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="range"
                        selected={{ from: portMetricsDateRange.from, to: portMetricsDateRange.to }}
                        onSelect={(range) => setPortMetricsDateRange(range || {})}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#E3EDFF]">
                    <th className="text-left py-3 px-4 text-sm text-[#04274F] bg-gradient-to-r from-[#E3EDFF] to-[#F0F7FF]">Metric</th>
                    <th className="text-right py-3 px-4 text-sm text-[#04274F] bg-gradient-to-r from-[#E3EDFF] to-[#F0F7FF]">Metric Count</th>
                    <th className="text-right py-3 px-4 text-sm text-[#04274F] bg-gradient-to-r from-[#E3EDFF] to-[#F0F7FF]">Total Count</th>
                    <th className="text-right py-3 px-4 text-sm text-[#04274F] bg-gradient-to-r from-[#E3EDFF] to-[#F0F7FF]">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E3EDFF] hover:bg-[#E3EDFF]/30 transition-colors">
                    <td className="py-3 px-4 text-sm text-[#2D2D2D]">Port-Out Pending Requests Count</td>
                    <td className="py-3 px-4 text-sm text-[#2D2D2D] text-right">626</td>
                    <td className="py-3 px-4 text-sm text-[#2D2D2D] text-right">6,303</td>
                    <td className="py-3 px-4 text-sm text-[#2877BB] text-right">9.93%</td>
                  </tr>
                  <tr className="border-b border-[#E3EDFF] hover:bg-[#E3EDFF]/30 transition-colors">
                    <td className="py-3 px-4 text-sm text-[#2D2D2D]">Port-In Approved Requests Count</td>
                    <td className="py-3 px-4 text-sm text-[#2D2D2D] text-right">2,150</td>
                    <td className="py-3 px-4 text-sm text-[#2D2D2D] text-right">3,450</td>
                    <td className="py-3 px-4 text-sm text-[#2877BB] text-right">62.32%</td>
                  </tr>
                  <tr className="border-b border-[#E3EDFF] hover:bg-[#E3EDFF]/30 transition-colors">
                    <td className="py-3 px-4 text-sm text-[#2D2D2D]">Port-Out Rejected Requests Count</td>
                    <td className="py-3 px-4 text-sm text-[#2D2D2D] text-right">425</td>
                    <td className="py-3 px-4 text-sm text-[#2D2D2D] text-right">6,303</td>
                    <td className="py-3 px-4 text-sm text-[#2877BB] text-right">6.74%</td>
                  </tr>
                  <tr className="border-b border-[#E3EDFF] hover:bg-[#E3EDFF]/30 transition-colors">
                    <td className="py-3 px-4 text-sm text-[#2D2D2D]">Port-In Pending Requests Count</td>
                    <td className="py-3 px-4 text-sm text-[#2D2D2D] text-right">1,200</td>
                    <td className="py-3 px-4 text-sm text-[#2D2D2D] text-right">3,450</td>
                    <td className="py-3 px-4 text-sm text-[#2877BB] text-right">34.78%</td>
                  </tr>
                  <tr className="border-b border-[#E3EDFF] hover:bg-[#E3EDFF]/30 transition-colors">
                    <td className="py-3 px-4 text-sm text-[#2D2D2D]">Port-Out Completed Requests Count</td>
                    <td className="py-3 px-4 text-sm text-[#2D2D2D] text-right">5,252</td>
                    <td className="py-3 px-4 text-sm text-[#2D2D2D] text-right">6,303</td>
                    <td className="py-3 px-4 text-sm text-[#2877BB] text-right">83.33%</td>
                  </tr>
                  <tr className="border-b border-[#E3EDFF] hover:bg-[#E3EDFF]/30 transition-colors">
                    <td className="py-3 px-4 text-sm text-[#2D2D2D]">Port-In Rejected Requests Count</td>
                    <td className="py-3 px-4 text-sm text-[#2D2D2D] text-right">100</td>
                    <td className="py-3 px-4 text-sm text-[#2D2D2D] text-right">3,450</td>
                    <td className="py-3 px-4 text-sm text-[#2877BB] text-right">2.90%</td>
                  </tr>
                  <tr className="border-b border-[#E3EDFF] hover:bg-[#E3EDFF]/30 transition-colors">
                    <td className="py-3 px-4 text-sm text-[#2D2D2D]">Total Port-In Requests</td>
                    <td className="py-3 px-4 text-sm text-[#2D2D2D] text-right">3,450</td>
                    <td className="py-3 px-4 text-sm text-[#2D2D2D] text-right">9,753</td>
                    <td className="py-3 px-4 text-sm text-[#2877BB] text-right">35.38%</td>
                  </tr>
                  <tr className="border-b border-[#E3EDFF] hover:bg-[#E3EDFF]/30 transition-colors">
                    <td className="py-3 px-4 text-sm text-[#2D2D2D]">Total Port-Out Requests</td>
                    <td className="py-3 px-4 text-sm text-[#2D2D2D] text-right">6,303</td>
                    <td className="py-3 px-4 text-sm text-[#2D2D2D] text-right">9,753</td>
                    <td className="py-3 px-4 text-sm text-[#2877BB] text-right">64.62%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-[#2877BB]/10 to-[#E3EDFF] rounded-xl border-l-4 border-[#2877BB] shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#2877BB]/10 rounded-lg">
                    <ArrowDownLeft className="size-6 text-[#2877BB]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#6E6E6E]">Total Port-In</div>
                    <div className="text-[#04274F] mt-1">3,450</div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border-l-4 border-emerald-600 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <ArrowUpRight className="size-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs text-[#6E6E6E]">Total Port-Out</div>
                    <div className="text-[#04274F] mt-1">6,303</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}