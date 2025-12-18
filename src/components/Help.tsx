import { Card } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { 
  LayoutDashboard, 
  Users, 
  Database, 
  FileText, 
  Upload, 
  RefreshCw,
  Clock,
  BarChart3,
  UserCircle,
  BookOpen,
  Video,
  FileQuestion,
  Mail,
  Phone,
  ExternalLink
} from "lucide-react";
import { Button } from "./ui/button";

export function Help() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#04274F]">HELP & USER GUIDE</h1>
        <p className="text-[#6E6E6E] mt-1">
          Complete guide to using the IIB Health Insurance Portability Application
        </p>
      </div>

      {/* Quick Start Guide */}
      <Card className="bg-gradient-to-r from-[#2877BB] to-[#1F6098] border-none">
        <div className="p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <BookOpen className="size-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-white mb-2">Welcome to IIB Portability Portal</h2>
              <p className="text-white/90 text-sm leading-relaxed">
                This application enables insurers to request and receive policy, member, and claims data 
                from the IIB database. Navigate through the modules using the left sidebar and follow the 
                step-by-step workflows for efficient data management.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Module-wise Help */}
      <Card>
        <div className="p-6">
          <h3 className="text-[#04274F] mb-4">Module Guide</h3>
          <Accordion type="single" collapsible className="w-full">
            {/* Dashboard */}
            <AccordionItem value="dashboard">
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="size-5 text-[#2877BB]" />
                  <span className="text-[#04274F]">Dashboard</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-8 space-y-3 text-sm text-[#6E6E6E]">
                  <p><strong className="text-[#04274F]">Purpose:</strong> View real-time overview of all portability activities.</p>
                  <p><strong className="text-[#04274F]">Key Features:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Statistical cards showing total requests, pending, accepted, and rejected policies</li>
                    <li>Quick action buttons for common tasks</li>
                    <li>Recent activities timeline</li>
                    <li>Custom date range selection for filtering data</li>
                  </ul>
                  <p><strong className="text-[#04274F]">How to Use:</strong> Select date range from the dropdown to view statistics for specific periods.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Users */}
            <AccordionItem value="users">
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <Users className="size-5 text-[#2877BB]" />
                  <span className="text-[#04274F]">Users Management</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-8 space-y-3 text-sm text-[#6E6E6E]">
                  <p><strong className="text-[#04274F]">Purpose:</strong> Manage user accounts and permissions.</p>
                  <p><strong className="text-[#04274F]">Key Features:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Add new users with role assignments</li>
                    <li>Edit existing user details and permissions</li>
                    <li>Activate/Deactivate user accounts</li>
                    <li>Search and filter users by name, email, role, or status</li>
                  </ul>
                  <p><strong className="text-[#04274F]">How to Use:</strong></p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Click "Add New User" to create a new account</li>
                    <li>Fill in required details: name, email, role, department</li>
                    <li>Use the search bar to find specific users</li>
                    <li>Click edit icon to modify user information</li>
                  </ol>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Masters */}
            <AccordionItem value="masters">
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <Database className="size-5 text-[#2877BB]" />
                  <span className="text-[#04274F]">Masters</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-8 space-y-3 text-sm text-[#6E6E6E]">
                  <p><strong className="text-[#04274F]">Purpose:</strong> Manage master data used across the application.</p>
                  <p><strong className="text-[#04274F]">4 Master Tabs:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Insurer Master:</strong> Manage insurance company details</li>
                    <li><strong>Product Master:</strong> Manage insurance product types</li>
                    <li><strong>Reason Master:</strong> Manage rejection/acceptance reasons</li>
                    <li><strong>Document Master:</strong> Manage required document types</li>
                  </ul>
                  <p><strong className="text-[#04274F]">How to Use:</strong></p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Select the tab for the master data you want to manage</li>
                    <li>Click "Add New" to create a new entry</li>
                    <li>Fill in required details in the dialog</li>
                    <li>Use edit/delete icons to modify or remove entries</li>
                    <li>Toggle active/inactive status as needed</li>
                  </ol>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Single Policy Request */}
            <AccordionItem value="single-policy">
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <FileText className="size-5 text-[#2877BB]" />
                  <span className="text-[#04274F]">Single Policy Request</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-8 space-y-3 text-sm text-[#6E6E6E]">
                  <p><strong className="text-[#04274F]">Purpose:</strong> Request portability information for individual policies.</p>
                  <p><strong className="text-[#04274F]">3-Step Process:</strong></p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li><strong>Select Insurer:</strong> Choose the previous/existing insurer from dropdown</li>
                    <li><strong>Policy Details:</strong> Enter policy number, member details, and dates</li>
                    <li><strong>View Report:</strong> Review and download the portability report</li>
                  </ol>
                  <p><strong className="text-[#04274F]">Tips:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Ensure policy number is accurate to avoid errors</li>
                    <li>Fill all mandatory fields before proceeding</li>
                    <li>Use "Back" button to review previous steps</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Bulk Upload */}
            <AccordionItem value="bulk-upload">
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <Upload className="size-5 text-[#2877BB]" />
                  <span className="text-[#04274F]">Bulk Upload</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-8 space-y-3 text-sm text-[#6E6E6E]">
                  <p><strong className="text-[#04274F]">Purpose:</strong> Upload multiple policy requests in a single operation.</p>
                  <p><strong className="text-[#04274F]">How to Use:</strong></p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Download the template file from the "Download Template" section</li>
                    <li>Fill the template with policy details (Excel/CSV format)</li>
                    <li>Upload the completed file using drag-and-drop or file browser</li>
                    <li>Review validation results and error reports</li>
                    <li>Submit valid records for processing</li>
                  </ol>
                  <p><strong className="text-[#04274F]">File Requirements:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Accepted formats: .xlsx, .xls, .csv</li>
                    <li>Maximum file size: 10MB</li>
                    <li>Maximum records: 1000 per file</li>
                  </ul>
                  <p><strong className="text-[#04274F]">Upload History:</strong> Track all previous uploads with status, date, and download options.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Portability Information */}
            <AccordionItem value="portability-info">
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <RefreshCw className="size-5 text-[#2877BB]" />
                  <span className="text-[#04274F]">Portability Information</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-8 space-y-3 text-sm text-[#6E6E6E]">
                  <p><strong className="text-[#04274F]">Purpose:</strong> View and manage portability requests in detail.</p>
                  <p><strong className="text-[#04274F]">5 Tabs:</strong></p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>All Requests:</strong> Complete list of all portability requests with search and filter</li>
                    <li><strong>Pending Requests:</strong> Requests awaiting action or response</li>
                    <li><strong>Accepted Requests:</strong> Successfully approved portability cases</li>
                    <li><strong>Rejected Requests:</strong> Cases that were denied with reasons</li>
                    <li><strong>In Progress:</strong> Requests currently being processed</li>
                  </ul>
                  <p><strong className="text-[#04274F]">Features:</strong> Advanced search, Excel export, view detailed reports for each request.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Pending Policies */}
            <AccordionItem value="pending-policies">
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <Clock className="size-5 text-[#2877BB]" />
                  <span className="text-[#04274F]">View/Upload Data Pending for Response</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-8 space-y-3 text-sm text-[#6E6E6E]">
                  <p><strong className="text-[#04274F]">Purpose:</strong> Respond to data requests from other insurers.</p>
                  <p><strong className="text-[#04274F]">Key Sections:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Pending Counts:</strong> Cards showing counts by request type (New, Follow-up, Urgent)</li>
                    <li><strong>Master File Downloads:</strong> Download template files for bulk responses</li>
                    <li><strong>Search & Filter:</strong> Find specific pending requests by multiple criteria</li>
                    <li><strong>Upload Response:</strong> Submit policy data for pending requests</li>
                  </ul>
                  <p><strong className="text-[#04274F]">How to Respond:</strong></p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Search for the pending request</li>
                    <li>Download master file template if doing bulk upload</li>
                    <li>Prepare policy/claims/member data</li>
                    <li>Upload response file or enter data manually</li>
                    <li>Submit for review and approval</li>
                  </ol>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Reports */}
            <AccordionItem value="reports">
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <BarChart3 className="size-5 text-[#2877BB]" />
                  <span className="text-[#04274F]">Reports Dashboard</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-8 space-y-3 text-sm text-[#6E6E6E]">
                  <p><strong className="text-[#04274F]">Purpose:</strong> Generate and download comprehensive reports.</p>
                  <p><strong className="text-[#04274F]">17 Report Types in 4 Categories:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Policy Request Reports:</strong> Accepted, Received, Rejected, Acquiring requests</li>
                    <li><strong>Summary & Analysis:</strong> Insurer-wise, Reason-wise, Status summaries</li>
                    <li><strong>System & Technical:</strong> API logs, Hit reconciliation, Detailed policy</li>
                    <li><strong>Usage & Billing:</strong> Usage count, billing, and usage summaries</li>
                  </ul>
                  <p><strong className="text-[#04274F]">How to Generate:</strong></p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Select report category from left sidebar</li>
                    <li>Choose specific report type</li>
                    <li>Select date range and filters (Policy Type, Insurer, etc.)</li>
                    <li>Click "Extract" to generate and download report</li>
                  </ol>
                  <p><strong className="text-[#04274F]">Note:</strong> All reports are generated in Excel format for easy analysis.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* My Profile */}
            <AccordionItem value="profile">
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <UserCircle className="size-5 text-[#2877BB]" />
                  <span className="text-[#04274F]">My Profile</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-8 space-y-3 text-sm text-[#6E6E6E]">
                  <p><strong className="text-[#04274F]">Purpose:</strong> Manage your personal account settings.</p>
                  <p><strong className="text-[#04274F]">Features:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>View and edit personal information</li>
                    <li>Change password and security settings</li>
                    <li>Update contact details and preferences</li>
                    <li>View your role and permissions</li>
                    <li>Manage notification settings</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Card>

      {/* Common Tasks */}
      <Card>
        <div className="p-6">
          <h3 className="text-[#04274F] mb-4">Common Tasks & Quick Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#E3EDFF] rounded-lg">
              <h4 className="text-[#04274F] mb-2">How to submit a portability request?</h4>
              <ol className="text-sm text-[#6E6E6E] space-y-1 list-decimal pl-4">
                <li>Go to "Single Policy Request"</li>
                <li>Select the existing insurer</li>
                <li>Enter policy and member details</li>
                <li>Review and submit</li>
              </ol>
            </div>

            <div className="p-4 bg-[#E3EDFF] rounded-lg">
              <h4 className="text-[#04274F] mb-2">How to upload bulk requests?</h4>
              <ol className="text-sm text-[#6E6E6E] space-y-1 list-decimal pl-4">
                <li>Go to "Bulk Upload"</li>
                <li>Download template file</li>
                <li>Fill template with data</li>
                <li>Upload and submit</li>
              </ol>
            </div>

            <div className="p-4 bg-[#E3EDFF] rounded-lg">
              <h4 className="text-[#04274F] mb-2">How to respond to pending requests?</h4>
              <ol className="text-sm text-[#6E6E6E] space-y-1 list-decimal pl-4">
                <li>Go to "Pending Policies"</li>
                <li>Search for the request</li>
                <li>Download master template</li>
                <li>Upload response data</li>
              </ol>
            </div>

            <div className="p-4 bg-[#E3EDFF] rounded-lg">
              <h4 className="text-[#04274F] mb-2">How to generate reports?</h4>
              <ol className="text-sm text-[#6E6E6E] space-y-1 list-decimal pl-4">
                <li>Go to "Reports"</li>
                <li>Select report category</li>
                <li>Choose date range</li>
                <li>Click "Extract"</li>
              </ol>
            </div>
          </div>
        </div>
      </Card>

      {/* Video Tutorials & Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Video className="size-6 text-[#2877BB]" />
              <h3 className="text-[#04274F]">Video Tutorials</h3>
            </div>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#" className="flex items-center gap-2">
                  <span>Getting Started with IIB Portal</span>
                  <ExternalLink className="size-4 ml-auto" />
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#" className="flex items-center gap-2">
                  <span>How to Submit Policy Requests</span>
                  <ExternalLink className="size-4 ml-auto" />
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#" className="flex items-center gap-2">
                  <span>Bulk Upload Tutorial</span>
                  <ExternalLink className="size-4 ml-auto" />
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#" className="flex items-center gap-2">
                  <span>Reports Generation Guide</span>
                  <ExternalLink className="size-4 ml-auto" />
                </a>
              </Button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileQuestion className="size-6 text-[#2877BB]" />
              <h3 className="text-[#04274F]">Additional Resources</h3>
            </div>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#" className="flex items-center gap-2">
                  <span>User Manual (PDF)</span>
                  <ExternalLink className="size-4 ml-auto" />
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#" className="flex items-center gap-2">
                  <span>File Format Specifications</span>
                  <ExternalLink className="size-4 ml-auto" />
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#" className="flex items-center gap-2">
                  <span>API Documentation</span>
                  <ExternalLink className="size-4 ml-auto" />
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#" className="flex items-center gap-2">
                  <span>FAQs</span>
                  <ExternalLink className="size-4 ml-auto" />
                </a>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Contact Support */}
      <Card className="bg-[#E3EDFF] border-[#2877BB]/20">
        <div className="p-6">
          <h3 className="text-[#04274F] mb-4">Need More Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#2877BB] rounded-lg">
                <Mail className="size-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-[#04274F]">Email Support</div>
                <a href="mailto:support@iib.gov.in" className="text-sm text-[#2877BB] hover:underline">
                  support@iib.gov.in
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#2877BB] rounded-lg">
                <Phone className="size-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-[#04274F]">Phone Support</div>
                <a href="tel:18001234567" className="text-sm text-[#2877BB] hover:underline">
                  1800-123-4567
                </a>
                <div className="text-xs text-[#6E6E6E]">Mon-Fri, 9:00 AM - 6:00 PM</div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-white rounded-lg">
            <p className="text-sm text-[#6E6E6E]">
              <strong className="text-[#04274F]">Support Hours:</strong> Our support team is available Monday through Friday, 
              9:00 AM to 6:00 PM IST. For urgent issues outside business hours, please email us and we'll respond 
              as soon as possible.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}