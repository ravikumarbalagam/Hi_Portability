import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Upload, Download, FileSpreadsheet, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { Progress } from "./ui/progress";

export function BulkUpload() {
  const [uploadStatus, setUploadStatus] = useState<"idle" | "processing" | "complete">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResults, setUploadResults] = useState<any>(null);

  const handleFileUpload = () => {
    setUploadStatus("processing");
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus("complete");
          setUploadResults({
            total: 150,
            successful: 142,
            failed: 5,
            duplicate: 3
          });
          toast.success("Bulk upload completed successfully");
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const downloadTemplate = () => {
    toast.success("Template downloaded successfully");
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-slate-900">Bulk Upload for Acquiring Request</h1>
        <p className="text-slate-500 mt-1">Upload multiple policy requests using Excel/CSV template</p>
      </div>

      {/* Download Template */}
      <Card>
        <CardHeader>
          <CardTitle>Step 1: Download Template</CardTitle>
          <CardDescription>Download the Excel template and fill in policy details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <FileSpreadsheet className="size-8 text-green-600 shrink-0 mt-1" />
            <div className="flex-1">
              <div className="text-sm text-slate-900">IIB Bulk Upload Template v2.0</div>
              <div className="text-xs text-slate-500 mt-1">Excel template with predefined columns for policy data</div>
              <div className="text-xs text-slate-600 mt-2">
                <span>Required columns: </span>
                <span className="text-slate-500">Previous Policy Number, Previous Insurer, Member Name, DOB, New Policy Number, Request Type</span>
              </div>
            </div>
            <Button onClick={downloadTemplate} variant="outline">
              <Download className="size-4 mr-2" />
              Download
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-blue-900">Maximum Records</div>
              <div className="text-blue-700 mt-1">500 per upload</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-blue-900">Supported Formats</div>
              <div className="text-blue-700 mt-1">.xlsx, .xls, .csv</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-blue-900">Max File Size</div>
              <div className="text-blue-700 mt-1">10 MB</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Step 2: Upload Filled Template</CardTitle>
          <CardDescription>Upload the completed Excel file with policy requests</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <Upload className="size-12 text-slate-400 mx-auto mb-4" />
            <div className="text-sm text-slate-900 mb-2">
              Drag and drop your file here, or click to browse
            </div>
            <div className="text-xs text-slate-500 mb-4">
              Supported formats: .xlsx, .xls, .csv (Max 10MB)
            </div>
            <Button onClick={handleFileUpload} disabled={uploadStatus === "processing"}>
              <Upload className="size-4 mr-2" />
              Select File
            </Button>
          </div>

          {uploadStatus === "processing" && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-700">Processing upload...</span>
                <span className="text-slate-500">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Results */}
      {uploadStatus === "complete" && uploadResults && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-900">Upload Complete</CardTitle>
            <CardDescription className="text-green-700">Bulk upload processed successfully</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-lg border border-green-200">
                <div className="text-xs text-slate-500">Total Records</div>
                <div className="text-slate-900 mt-1">{uploadResults.total}</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-green-200">
                <div className="flex items-center gap-1 text-xs text-green-700">
                  <CheckCircle2 className="size-3" />
                  Successful
                </div>
                <div className="text-green-900 mt-1">{uploadResults.successful}</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-green-200">
                <div className="flex items-center gap-1 text-xs text-red-700">
                  <XCircle className="size-3" />
                  Failed
                </div>
                <div className="text-red-900 mt-1">{uploadResults.failed}</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-green-200">
                <div className="flex items-center gap-1 text-xs text-amber-700">
                  <AlertCircle className="size-3" />
                  Duplicate
                </div>
                <div className="text-amber-900 mt-1">{uploadResults.duplicate}</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="size-4 mr-2" />
                Download Error Report
              </Button>
              <Button variant="outline" onClick={() => {
                setUploadStatus("idle");
                setUploadResults(null);
              }}>
                Upload Another File
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Guidelines */}
      <Card className="bg-amber-50 border-amber-200">
        <CardHeader>
          <CardTitle className="text-amber-900">Upload Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-amber-800 space-y-2">
          <p>• Ensure all mandatory fields are filled in the template</p>
          <p>• Policy numbers should be unique within the upload file</p>
          <p>• Date format should be DD/MM/YYYY</p>
          <p>• Previous insurer names should match the master list</p>
          <p>• Remove any empty rows before uploading</p>
          <p>• System will validate data and provide detailed error report if any issues found</p>
        </CardContent>
      </Card>
    </div>
  );
}
