import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarIcon, Search, Send } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import { toast } from "sonner@2.0.3";

export function SinglePolicyRequest() {
  const [policyStartDate, setPolicyStartDate] = useState<Date>();
  const [searchResults, setSearchResults] = useState<any>(null);

  const handleSearch = () => {
    // Simulate search
    setSearchResults({
      policyNumber: "POL-2023-9876",
      memberName: "Rajesh Kumar",
      previousInsurer: "Star Health Insurance",
      policyType: "Individual",
      sumInsured: "₹5,00,000",
      status: "Active"
    });
    toast.success("Policy found in IIB database");
  };

  const handleSubmitRequest = () => {
    toast.success("Policy data request submitted successfully");
    setSearchResults(null);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-slate-900">Single Policy Request</h1>
        <p className="text-slate-500 mt-1">Request policy, member, and claims data for a single policy</p>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle>Search Policy</CardTitle>
          <CardDescription>Enter policy details to search in IIB database</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="previous-policy">Previous Policy Number</Label>
              <Input id="previous-policy" placeholder="Enter policy number" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="previous-insurer">Previous Insurer</Label>
              <Select>
                <SelectTrigger id="previous-insurer">
                  <SelectValue placeholder="Select insurer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="star">Star Health Insurance</SelectItem>
                  <SelectItem value="care">Care Health Insurance</SelectItem>
                  <SelectItem value="max">Max Bupa Health Insurance</SelectItem>
                  <SelectItem value="niva">Niva Bupa Health Insurance</SelectItem>
                  <SelectItem value="aditya">Aditya Birla Health Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="member-name">Member Name</Label>
              <Input id="member-name" placeholder="Enter member name" />
            </div>

            <div className="space-y-2">
              <Label>Policy Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left",
                      !policyStartDate && "text-slate-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {policyStartDate ? format(policyStartDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={policyStartDate}
                    onSelect={setPolicyStartDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input id="mobile" placeholder="Enter mobile number" />
            </div>
          </div>

          <Button onClick={handleSearch} className="w-full md:w-auto">
            <Search className="size-4 mr-2" />
            Search Policy
          </Button>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-900">Policy Found</CardTitle>
            <CardDescription className="text-green-700">Review policy details before submitting request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-green-700">Policy Number</div>
                <div className="text-sm text-green-900">{searchResults.policyNumber}</div>
              </div>
              <div>
                <div className="text-xs text-green-700">Member Name</div>
                <div className="text-sm text-green-900">{searchResults.memberName}</div>
              </div>
              <div>
                <div className="text-xs text-green-700">Previous Insurer</div>
                <div className="text-sm text-green-900">{searchResults.previousInsurer}</div>
              </div>
              <div>
                <div className="text-xs text-green-700">Policy Type</div>
                <div className="text-sm text-green-900">{searchResults.policyType}</div>
              </div>
              <div>
                <div className="text-xs text-green-700">Sum Insured</div>
                <div className="text-sm text-green-900">{searchResults.sumInsured}</div>
              </div>
              <div>
                <div className="text-xs text-green-700">Status</div>
                <div className="text-sm text-green-900">{searchResults.status}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Request Form */}
      {searchResults && (
        <Card>
          <CardHeader>
            <CardTitle>Submit Data Request</CardTitle>
            <CardDescription>Provide additional details for the portability request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-policy">New Policy Number</Label>
                <Input id="new-policy" placeholder="Enter new policy number" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="request-type">Request Type</Label>
                <Select>
                  <SelectTrigger id="request-type">
                    <SelectValue placeholder="Select request type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Policy Data</SelectItem>
                    <SelectItem value="member">Member Data Only</SelectItem>
                    <SelectItem value="claims">Claims Data Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks (Optional)</Label>
              <Textarea id="remarks" placeholder="Add any additional information" rows={3} />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSubmitRequest}>
                <Send className="size-4 mr-2" />
                Submit Request
              </Button>
              <Button variant="outline" onClick={() => setSearchResults(null)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Information Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Information</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-2">
          <p>• Ensure all policy details are accurate before submitting the request</p>
          <p>• Policy data requests are typically processed within 24-48 hours</p>
          <p>• You will be notified once the previous insurer responds to your request</p>
          <p>• Downloaded data includes policy details, member information, and claims history</p>
        </CardContent>
      </Card>
    </div>
  );
}
