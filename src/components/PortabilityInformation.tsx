import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Search, Download, Eye, FileDown } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner@2.0.3";

const approvedRequests = [
  {
    id: "REQ-2024-101",
    previousPolicy: "POL-2023-1234",
    previousInsurer: "Star Health",
    newPolicy: "POL-2024-9876",
    memberName: "Anjali Mehta",
    approvedDate: "2024-11-20",
    status: "Data Available"
  },
  {
    id: "REQ-2024-102",
    previousPolicy: "POL-2023-1235",
    previousInsurer: "Care Health",
    newPolicy: "POL-2024-9877",
    memberName: "Karthik Nair",
    approvedDate: "2024-11-21",
    status: "Data Available"
  },
  {
    id: "REQ-2024-103",
    previousPolicy: "POL-2023-1236",
    previousInsurer: "Max Bupa",
    newPolicy: "POL-2024-9878",
    memberName: "Sneha Gupta",
    approvedDate: "2024-11-22",
    status: "Processing"
  },
];

const mockPolicyData = {
  policyDetails: {
    policyNumber: "POL-2023-1234",
    policyType: "Individual Health Insurance",
    sumInsured: "₹5,00,000",
    policyStartDate: "01/04/2023",
    policyEndDate: "31/03/2024",
    premium: "₹12,500",
    zone: "Zone A"
  },
  memberDetails: {
    name: "Anjali Mehta",
    dob: "15/06/1985",
    gender: "Female",
    relation: "Self",
    mobile: "+91-9876543210",
    email: "anjali.mehta@email.com"
  },
  claimsHistory: [
    {
      claimNumber: "CLM-2023-5678",
      claimDate: "15/08/2023",
      hospitalName: "Apollo Hospital",
      claimAmount: "₹45,000",
      approvedAmount: "₹42,000",
      status: "Settled"
    },
    {
      claimNumber: "CLM-2023-5679",
      claimDate: "20/12/2023",
      hospitalName: "Max Hospital",
      claimAmount: "₹28,000",
      approvedAmount: "₹28,000",
      status: "Settled"
    }
  ]
};

export function PortabilityInformation() {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);

  const handleDownload = (requestId: string, type: string) => {
    toast.success(`${type} downloaded successfully for ${requestId}`);
  };

  const handleViewDetails = (request: any) => {
    setSelectedRequest(request);
    setViewDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-slate-900">Portability Information</h1>
        <p className="text-slate-500 mt-1">View and download approved policy, member, and claims data</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input placeholder="Search by request ID, policy number..." className="pl-10" />
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
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Data Available</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Search className="size-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Approved Requests Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Approved Requests</CardTitle>
              <CardDescription>Download policy data for approved portability requests</CardDescription>
            </div>
            <Button variant="outline">
              <Download className="size-4 mr-2" />
              Bulk Download
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Previous Policy</TableHead>
                <TableHead>New Policy</TableHead>
                <TableHead>Member Name</TableHead>
                <TableHead>Previous Insurer</TableHead>
                <TableHead>Approved Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvedRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{request.previousPolicy}</TableCell>
                  <TableCell>{request.newPolicy}</TableCell>
                  <TableCell>{request.memberName}</TableCell>
                  <TableCell>{request.previousInsurer}</TableCell>
                  <TableCell>{request.approvedDate}</TableCell>
                  <TableCell>
                    <Badge variant={request.status === "Data Available" ? "default" : "secondary"}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleViewDetails(request)}
                      >
                        <Eye className="size-4" />
                      </Button>
                      {request.status === "Data Available" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDownload(request.id, "Complete Data")}
                        >
                          <FileDown className="size-4 text-blue-600" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Details Dialog */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Policy Data - {selectedRequest?.id}</DialogTitle>
            <DialogDescription>
              Complete portability information for {selectedRequest?.memberName}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="policy" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="policy">Policy Details</TabsTrigger>
              <TabsTrigger value="member">Member Details</TabsTrigger>
              <TabsTrigger value="claims">Claims History</TabsTrigger>
            </TabsList>

            <TabsContent value="policy" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Policy Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(mockPolicyData.policyDetails).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <div className="text-xs text-slate-500 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="text-sm text-slate-900">{value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Button className="w-full" onClick={() => handleDownload(selectedRequest?.id, "Policy Data")}>
                <Download className="size-4 mr-2" />
                Download Policy Data
              </Button>
            </TabsContent>

            <TabsContent value="member" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Member Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(mockPolicyData.memberDetails).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <div className="text-xs text-slate-500 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="text-sm text-slate-900">{value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Button className="w-full" onClick={() => handleDownload(selectedRequest?.id, "Member Data")}>
                <Download className="size-4 mr-2" />
                Download Member Data
              </Button>
            </TabsContent>

            <TabsContent value="claims" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Claims History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Claim Number</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Hospital</TableHead>
                        <TableHead>Claim Amount</TableHead>
                        <TableHead>Approved</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockPolicyData.claimsHistory.map((claim) => (
                        <TableRow key={claim.claimNumber}>
                          <TableCell>{claim.claimNumber}</TableCell>
                          <TableCell>{claim.claimDate}</TableCell>
                          <TableCell>{claim.hospitalName}</TableCell>
                          <TableCell>{claim.claimAmount}</TableCell>
                          <TableCell>{claim.approvedAmount}</TableCell>
                          <TableCell>
                            <Badge>{claim.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Button className="w-full" onClick={() => handleDownload(selectedRequest?.id, "Claims Data")}>
                <Download className="size-4 mr-2" />
                Download Claims History
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Information Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Download Information</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-2">
          <p>• Downloaded data is available in PDF and Excel formats</p>
          <p>• Data includes complete policy details, member information, and claims history</p>
          <p>• All downloads are logged for audit purposes</p>
          <p>• Data is encrypted and secure during download</p>
          <p>• Use bulk download option to download multiple policy data at once</p>
        </CardContent>
      </Card>
    </div>
  );
}
