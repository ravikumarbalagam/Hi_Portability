import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Search, Filter, Download, CheckCircle, XCircle, Eye, Clock } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner@2.0.3";

const pendingPolicies = [
  {
    id: "REQ-2024-001",
    previousPolicy: "POL-2023-5678",
    previousInsurer: "Star Health",
    memberName: "Rajesh Kumar",
    requestDate: "2024-11-20",
    daysOverdue: 5,
    priority: "High"
  },
  {
    id: "REQ-2024-002",
    previousPolicy: "POL-2023-5679",
    previousInsurer: "Care Health",
    memberName: "Priya Sharma",
    requestDate: "2024-11-22",
    daysOverdue: 3,
    priority: "Medium"
  },
  {
    id: "REQ-2024-003",
    previousPolicy: "POL-2023-5680",
    previousInsurer: "Max Bupa",
    memberName: "Amit Patel",
    requestDate: "2024-11-23",
    daysOverdue: 2,
    priority: "Medium"
  },
  {
    id: "REQ-2024-004",
    previousPolicy: "POL-2023-5681",
    previousInsurer: "Niva Bupa",
    memberName: "Sunita Reddy",
    requestDate: "2024-11-24",
    daysOverdue: 1,
    priority: "Low"
  },
  {
    id: "REQ-2024-005",
    previousPolicy: "POL-2023-5682",
    previousInsurer: "Aditya Birla",
    memberName: "Vikram Singh",
    requestDate: "2024-11-24",
    daysOverdue: 1,
    priority: "Low"
  },
];

export function PendingPolicies() {
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const [actionDialog, setActionDialog] = useState<"approve" | "reject" | null>(null);

  const handleApprove = () => {
    toast.success(`Request ${selectedPolicy?.id} approved successfully`);
    setActionDialog(null);
    setSelectedPolicy(null);
  };

  const handleReject = () => {
    toast.success(`Request ${selectedPolicy?.id} rejected`);
    setActionDialog(null);
    setSelectedPolicy(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Policies Pending Your Response</h1>
          <p className="text-slate-500 mt-1">Review and respond to portability requests awaiting action</p>
        </div>
        <Badge variant="destructive" className="text-sm px-3 py-1">
          {pendingPolicies.length} Pending
        </Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input placeholder="Search by policy number, member name..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Previous Insurer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Insurers</SelectItem>
                <SelectItem value="star">Star Health</SelectItem>
                <SelectItem value="care">Care Health</SelectItem>
                <SelectItem value="max">Max Bupa</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="size-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pending Requests Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Pending Requests</CardTitle>
              <CardDescription>Requests awaiting your approval or rejection</CardDescription>
            </div>
            <Button variant="outline">
              <Download className="size-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Previous Policy</TableHead>
                <TableHead>Previous Insurer</TableHead>
                <TableHead>Member Name</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Days Overdue</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingPolicies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell>{policy.id}</TableCell>
                  <TableCell>{policy.previousPolicy}</TableCell>
                  <TableCell>{policy.previousInsurer}</TableCell>
                  <TableCell>{policy.memberName}</TableCell>
                  <TableCell>{policy.requestDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="size-3 text-amber-600" />
                      <span className={policy.daysOverdue > 3 ? "text-red-600" : "text-amber-600"}>
                        {policy.daysOverdue} days
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        policy.priority === "High"
                          ? "destructive"
                          : policy.priority === "Medium"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {policy.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedPolicy(policy)}
                      >
                        <Eye className="size-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedPolicy(policy);
                          setActionDialog("approve");
                        }}
                      >
                        <CheckCircle className="size-4 text-green-600" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedPolicy(policy);
                          setActionDialog("reject");
                        }}
                      >
                        <XCircle className="size-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Approve Dialog */}
      <Dialog open={actionDialog === "approve"} onOpenChange={() => setActionDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Request</DialogTitle>
            <DialogDescription>
              Confirm approval of portability request {selectedPolicy?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Member Name</Label>
              <div className="text-sm text-slate-700">{selectedPolicy?.memberName}</div>
            </div>
            <div className="space-y-2">
              <Label>Previous Policy</Label>
              <div className="text-sm text-slate-700">{selectedPolicy?.previousPolicy}</div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="approve-remarks">Remarks (Optional)</Label>
              <Textarea id="approve-remarks" placeholder="Add any remarks..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)}>
              Cancel
            </Button>
            <Button onClick={handleApprove}>
              <CheckCircle className="size-4 mr-2" />
              Approve Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={actionDialog === "reject"} onOpenChange={() => setActionDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Request</DialogTitle>
            <DialogDescription>
              Provide reason for rejecting portability request {selectedPolicy?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reject-reason">Reason for Rejection *</Label>
              <Select>
                <SelectTrigger id="reject-reason">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incomplete">Incomplete Information</SelectItem>
                  <SelectItem value="mismatch">Data Mismatch</SelectItem>
                  <SelectItem value="notfound">Policy Not Found</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reject-remarks">Additional Remarks</Label>
              <Textarea id="reject-remarks" placeholder="Provide detailed explanation..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              <XCircle className="size-4 mr-2" />
              Reject Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* SLA Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Service Level Agreement (SLA)</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-2">
          <p>• Standard response time: 48 hours from request date</p>
          <p>• High priority requests should be processed within 24 hours</p>
          <p>• Overdue requests are highlighted in red and should be prioritized</p>
          <p>• Provide clear reasons when rejecting a request to maintain transparency</p>
        </CardContent>
      </Card>
    </div>
  );
}
