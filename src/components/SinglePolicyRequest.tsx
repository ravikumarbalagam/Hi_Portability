import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarIcon, Check, Building2, FileText, BarChart3 } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import { toast } from "sonner@2.0.3";

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

interface PolicyData {
  policyType: string;
  policyNumber: string;
  dateOfBirth: Date | undefined;
  emailId: string;
  gender: string;
  policyStartDate: Date | undefined;
  policyEndDate: Date | undefined;
  reasonForPort: string;
  currentPreviousYear: string;
  policyPorting: string;
  primaryProposer: string;
  requestReceivedDate: Date | undefined;
  decisionStatus: string;
  decisionDate: Date | undefined;
  yearsContCovered: string;
  comments: string;
}

export function SinglePolicyRequest() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInsurer, setSelectedInsurer] = useState<string>("");
  const [policyData, setPolicyData] = useState<PolicyData>({
    policyType: "",
    policyNumber: "",
    dateOfBirth: undefined,
    emailId: "",
    gender: "",
    policyStartDate: undefined,
    policyEndDate: undefined,
    reasonForPort: "",
    currentPreviousYear: "",
    policyPorting: "",
    primaryProposer: "",
    requestReceivedDate: undefined,
    decisionStatus: "",
    decisionDate: undefined,
    yearsContCovered: "",
    comments: ""
  });

  const handleInsurerSelect = (insurer: string) => {
    setSelectedInsurer(insurer);
  };

  const handleContinueToStep2 = () => {
    if (!selectedInsurer) {
      toast.error("Please select an insurer to continue");
      return;
    }
    setCurrentStep(2);
    toast.success(`${selectedInsurer} selected`);
  };

  const handleSubmitPolicy = () => {
    // Validate required fields
    if (!policyData.policyType || !policyData.policyNumber || !policyData.dateOfBirth) {
      toast.error("Please fill all required fields");
      return;
    }
    setCurrentStep(3);
    toast.success("Policy request submitted successfully");
  };

  const handleCancel = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setSelectedInsurer("");
    } else if (currentStep === 3) {
      // Reset everything
      setCurrentStep(1);
      setSelectedInsurer("");
      setPolicyData({
        policyType: "",
        policyNumber: "",
        dateOfBirth: undefined,
        emailId: "",
        gender: "",
        policyStartDate: undefined,
        policyEndDate: undefined,
        reasonForPort: "",
        currentPreviousYear: "",
        policyPorting: "",
        primaryProposer: "",
        requestReceivedDate: undefined,
        decisionStatus: "",
        decisionDate: undefined,
        yearsContCovered: "",
        comments: ""
      });
    }
  };

  const handleNewRequest = () => {
    setCurrentStep(1);
    setSelectedInsurer("");
    setPolicyData({
      policyType: "",
      policyNumber: "",
      dateOfBirth: undefined,
      emailId: "",
      gender: "",
      policyStartDate: undefined,
      policyEndDate: undefined,
      reasonForPort: "",
      currentPreviousYear: "",
      policyPorting: "",
      primaryProposer: "",
      requestReceivedDate: undefined,
      decisionStatus: "",
      decisionDate: undefined,
      yearsContCovered: "",
      comments: ""
    });
    toast.info("Starting new policy request");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#04274F]">Acquiring Request for Single Policy</h1>
        <p className="text-[#6E6E6E] mt-1">Submit portability request for individual policies</p>
      </div>

      {/* 3-Step Progress Widget */}
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {/* Step 1 */}
        <div className="flex flex-col items-center flex-1">
          <div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-all",
              currentStep === 1
                ? "bg-[#2877BB] text-white ring-4 ring-[#E3EDFF]"
                : currentStep > 1
                ? "bg-[#2877BB] text-white"
                : "bg-gray-200 text-gray-500"
            )}
          >
            {currentStep > 1 ? <Check className="size-6" /> : <Building2 className="size-6" />}
          </div>
          <div className="mt-2 text-center">
            <div
              className={cn(
                "text-sm",
                currentStep >= 1 ? "text-[#04274F]" : "text-[#6E6E6E]"
              )}
            >
              Select Insurer
            </div>
          </div>
        </div>

        {/* Connector Line */}
        <div className={cn("flex-1 h-1 mx-2", currentStep > 1 ? "bg-[#2877BB]" : "bg-gray-300")} />

        {/* Step 2 */}
        <div className="flex flex-col items-center flex-1">
          <div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-all",
              currentStep === 2
                ? "bg-[#2877BB] text-white ring-4 ring-[#E3EDFF]"
                : currentStep > 2
                ? "bg-[#2877BB] text-white"
                : "bg-gray-200 text-gray-500"
            )}
          >
            {currentStep > 2 ? <Check className="size-6" /> : <FileText className="size-6" />}
          </div>
          <div className="mt-2 text-center">
            <div
              className={cn(
                "text-sm",
                currentStep >= 2 ? "text-[#04274F]" : "text-[#6E6E6E]"
              )}
            >
              Policy Details
            </div>
          </div>
        </div>

        {/* Connector Line */}
        <div className={cn("flex-1 h-1 mx-2", currentStep > 2 ? "bg-[#2877BB]" : "bg-gray-300")} />

        {/* Step 3 */}
        <div className="flex flex-col items-center flex-1">
          <div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-all",
              currentStep === 3
                ? "bg-[#2877BB] text-white ring-4 ring-[#E3EDFF]"
                : "bg-gray-200 text-gray-500"
            )}
          >
            <BarChart3 className="size-6" />
          </div>
          <div className="mt-2 text-center">
            <div
              className={cn(
                "text-sm",
                currentStep >= 3 ? "text-[#04274F]" : "text-[#6E6E6E]"
              )}
            >
              View Report
            </div>
          </div>
        </div>
      </div>

      {/* Step 1: Select Existing Insurer */}
      {currentStep === 1 && (
        <Card>
          <div className="p-6">
            <h2 className="text-[#04274F] mb-2">Step 1: Select Existing Insurer</h2>
            <p className="text-[#6E6E6E] mb-6">Choose the insurer from which the policy is being ported</p>

            {/* Dropdown Selection */}
            <div className="mb-6">
              <Label htmlFor="insurer-dropdown">Select Insurer from Dropdown</Label>
              <Select value={selectedInsurer} onValueChange={handleInsurerSelect}>
                <SelectTrigger id="insurer-dropdown" className="w-full mt-2">
                  <SelectValue placeholder="Choose an insurer" />
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

            <div className="mb-6">
              <h3 className="text-[#1F6098] mb-4">Or Select from Visual Grid</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {insurers.map((insurer) => (
                  <button
                    key={insurer}
                    onClick={() => handleInsurerSelect(insurer)}
                    className={cn(
                      "p-4 rounded-lg border-2 transition-all hover:shadow-md",
                      selectedInsurer === insurer
                        ? "border-[#2877BB] bg-[#E3EDFF] shadow-md"
                        : "border-gray-200 hover:border-[#2877BB]/50"
                    )}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className={cn(
                          "w-16 h-16 rounded-full flex items-center justify-center",
                          selectedInsurer === insurer ? "bg-[#2877BB]" : "bg-gray-100"
                        )}
                      >
                        <Building2
                          className={cn(
                            "size-8",
                            selectedInsurer === insurer ? "text-white" : "text-gray-400"
                          )}
                        />
                      </div>
                      <div className="text-center">
                        <div className={cn(
                          "text-sm",
                          selectedInsurer === insurer ? "text-[#04274F]" : "text-[#6E6E6E]"
                        )}>
                          {insurer}
                        </div>
                      </div>
                      {selectedInsurer === insurer && (
                        <div className="absolute top-2 right-2">
                          <div className="bg-[#2877BB] rounded-full p-1">
                            <Check className="size-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleContinueToStep2} disabled={!selectedInsurer}>
                Continue to Policy Details
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Step 2: Policy Details Form */}
      {currentStep === 2 && (
        <Card>
          <div className="p-6">
            <h2 className="text-[#04274F] mb-2">Step 2: Policy Details</h2>
            <p className="text-[#6E6E6E] mb-6">
              Enter complete policy information for <span className="text-[#2877BB]">{selectedInsurer}</span>
            </p>

            <CardContent className="space-y-6 p-0">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="policy-type">Policy Type <span className="text-red-500">*</span></Label>
                  <Select
                    value={policyData.policyType}
                    onValueChange={(value) => setPolicyData({ ...policyData, policyType: value })}
                  >
                    <SelectTrigger id="policy-type">
                      <SelectValue placeholder="Select policy type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="group">Group</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="policy-number">Policy Number <span className="text-red-500">*</span></Label>
                  <Input
                    id="policy-number"
                    placeholder="Enter policy number"
                    value={policyData.policyNumber}
                    onChange={(e) => setPolicyData({ ...policyData, policyNumber: e.target.value })}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Date of Birth <span className="text-red-500">*</span></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left",
                          !policyData.dateOfBirth && "text-[#6E6E6E]"
                        )}
                      >
                        <CalendarIcon className="mr-2 size-4" />
                        {policyData.dateOfBirth ? format(policyData.dateOfBirth, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={policyData.dateOfBirth}
                        onSelect={(date) => setPolicyData({ ...policyData, dateOfBirth: date })}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email ID</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={policyData.emailId}
                    onChange={(e) => setPolicyData({ ...policyData, emailId: e.target.value })}
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={policyData.gender}
                    onValueChange={(value) => setPolicyData({ ...policyData, gender: value })}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Policy Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left",
                          !policyData.policyStartDate && "text-[#6E6E6E]"
                        )}
                      >
                        <CalendarIcon className="mr-2 size-4" />
                        {policyData.policyStartDate ? format(policyData.policyStartDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={policyData.policyStartDate}
                        onSelect={(date) => setPolicyData({ ...policyData, policyStartDate: date })}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Policy End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left",
                          !policyData.policyEndDate && "text-[#6E6E6E]"
                        )}
                      >
                        <CalendarIcon className="mr-2 size-4" />
                        {policyData.policyEndDate ? format(policyData.policyEndDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={policyData.policyEndDate}
                        onSelect={(date) => setPolicyData({ ...policyData, policyEndDate: date })}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason-port">Reason for Port</Label>
                  <Select
                    value={policyData.reasonForPort}
                    onValueChange={(value) => setPolicyData({ ...policyData, reasonForPort: value })}
                  >
                    <SelectTrigger id="reason-port">
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="better-coverage">Better Coverage</SelectItem>
                      <SelectItem value="lower-premium">Lower Premium</SelectItem>
                      <SelectItem value="service-issues">Service Issues</SelectItem>
                      <SelectItem value="network-hospitals">Network Hospitals</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 5 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="current-previous-year">Current Previous Year</Label>
                  <Select
                    value={policyData.currentPreviousYear}
                    onValueChange={(value) => setPolicyData({ ...policyData, currentPreviousYear: value })}
                  >
                    <SelectTrigger id="current-previous-year">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="policy-porting">Policy Porting</Label>
                  <Select
                    value={policyData.policyPorting}
                    onValueChange={(value) => setPolicyData({ ...policyData, policyPorting: value })}
                  >
                    <SelectTrigger id="policy-porting">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 6 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primary-proposer">Primary Proposer</Label>
                  <Select
                    value={policyData.primaryProposer}
                    onValueChange={(value) => setPolicyData({ ...policyData, primaryProposer: value })}
                  >
                    <SelectTrigger id="primary-proposer">
                      <SelectValue placeholder="Select proposer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="self">Self</SelectItem>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Request Received Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left",
                          !policyData.requestReceivedDate && "text-[#6E6E6E]"
                        )}
                      >
                        <CalendarIcon className="mr-2 size-4" />
                        {policyData.requestReceivedDate ? format(policyData.requestReceivedDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={policyData.requestReceivedDate}
                        onSelect={(date) => setPolicyData({ ...policyData, requestReceivedDate: date })}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Row 7 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="decision-status">Decision Status</Label>
                  <Select
                    value={policyData.decisionStatus}
                    onValueChange={(value) => setPolicyData({ ...policyData, decisionStatus: value })}
                  >
                    <SelectTrigger id="decision-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="under-review">Under Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Decision Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left",
                          !policyData.decisionDate && "text-[#6E6E6E]"
                        )}
                      >
                        <CalendarIcon className="mr-2 size-4" />
                        {policyData.decisionDate ? format(policyData.decisionDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={policyData.decisionDate}
                        onSelect={(date) => setPolicyData({ ...policyData, decisionDate: date })}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Row 8 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="years-covered">No. of Years Continuously Covered</Label>
                  <Input
                    id="years-covered"
                    type="number"
                    placeholder="Enter number of years"
                    value={policyData.yearsContCovered}
                    onChange={(e) => setPolicyData({ ...policyData, yearsContCovered: e.target.value })}
                  />
                </div>
              </div>

              {/* Comments */}
              <div className="space-y-2">
                <Label htmlFor="comments">Comments</Label>
                <Textarea
                  id="comments"
                  placeholder="Add any additional information or notes"
                  rows={4}
                  value={policyData.comments}
                  onChange={(e) => setPolicyData({ ...policyData, comments: e.target.value })}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button onClick={handleSubmitPolicy}>
                  Submit
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      )}

      {/* Step 3: View Report */}
      {currentStep === 3 && (
        <Card>
          <div className="p-6">
            <h2 className="text-[#04274F] mb-2">Step 3: Policy Request Report</h2>
            <p className="text-[#6E6E6E] mb-6">Review the submitted policy portability request</p>

            <div className="bg-[#E3EDFF] border border-[#2877BB]/20 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#2877BB] rounded-full p-3">
                  <Check className="size-6 text-white" />
                </div>
                <div>
                  <h3 className="text-[#04274F]">Request Submitted Successfully</h3>
                  <p className="text-sm text-[#6E6E6E]">Your policy portability request has been recorded</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Insurer Information */}
              <div>
                <h3 className="text-[#1F6098] mb-3 pb-2 border-b border-[#2877BB]/20">Insurer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-[#6E6E6E]">Existing Insurer</div>
                    <div className="text-[#04274F] mt-1">{selectedInsurer}</div>
                  </div>
                </div>
              </div>

              {/* Policy Details */}
              <div>
                <h3 className="text-[#1F6098] mb-3 pb-2 border-b border-[#2877BB]/20">Policy Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-[#6E6E6E]">Policy Type</div>
                    <div className="text-[#04274F] mt-1 capitalize">{policyData.policyType || "—"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6E6E6E]">Policy Number</div>
                    <div className="text-[#04274F] mt-1">{policyData.policyNumber || "—"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6E6E6E]">Date of Birth</div>
                    <div className="text-[#04274F] mt-1">
                      {policyData.dateOfBirth ? format(policyData.dateOfBirth, "PPP") : "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6E6E6E]">Email ID</div>
                    <div className="text-[#04274F] mt-1">{policyData.emailId || "—"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6E6E6E]">Gender</div>
                    <div className="text-[#04274F] mt-1 capitalize">{policyData.gender || "—"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6E6E6E]">Policy Start Date</div>
                    <div className="text-[#04274F] mt-1">
                      {policyData.policyStartDate ? format(policyData.policyStartDate, "PPP") : "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6E6E6E]">Policy End Date</div>
                    <div className="text-[#04274F] mt-1">
                      {policyData.policyEndDate ? format(policyData.policyEndDate, "PPP") : "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6E6E6E]">Reason for Port</div>
                    <div className="text-[#04274F] mt-1 capitalize">
                      {policyData.reasonForPort ? policyData.reasonForPort.replace("-", " ") : "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6E6E6E]">Current Previous Year</div>
                    <div className="text-[#04274F] mt-1">{policyData.currentPreviousYear || "—"}</div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-[#1F6098] mb-3 pb-2 border-b border-[#2877BB]/20">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-[#6E6E6E]">Policy Porting</div>
                    <div className="text-[#04274F] mt-1 capitalize">{policyData.policyPorting || "—"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6E6E6E]">Primary Proposer</div>
                    <div className="text-[#04274F] mt-1 capitalize">{policyData.primaryProposer || "—"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6E6E6E]">Request Received Date</div>
                    <div className="text-[#04274F] mt-1">
                      {policyData.requestReceivedDate ? format(policyData.requestReceivedDate, "PPP") : "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6E6E6E]">Decision Status</div>
                    <div className="text-[#04274F] mt-1 capitalize">{policyData.decisionStatus || "—"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6E6E6E]">Decision Date</div>
                    <div className="text-[#04274F] mt-1">
                      {policyData.decisionDate ? format(policyData.decisionDate, "PPP") : "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6E6E6E]">Years Continuously Covered</div>
                    <div className="text-[#04274F] mt-1">{policyData.yearsContCovered || "—"} years</div>
                  </div>
                </div>
              </div>

              {/* Comments */}
              {policyData.comments && (
                <div>
                  <h3 className="text-[#1F6098] mb-3 pb-2 border-b border-[#2877BB]/20">Comments</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-[#04274F]">{policyData.comments}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button onClick={handleNewRequest}>
                  Submit New Request
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Information Card */}
      {currentStep === 1 && (
        <Card className="bg-[#E3EDFF] border-[#2877BB]/20">
          <div className="p-6">
            <h3 className="text-[#04274F] mb-3">Information</h3>
            <div className="text-sm text-[#1F6098] space-y-2">
              <p>• Select the existing insurer from which the policy is being ported</p>
              <p>• You can choose from the dropdown menu or click on the visual grid</p>
              <p>• Once selected, you'll proceed to enter detailed policy information</p>
              <p>• Ensure all details are accurate before final submission</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
