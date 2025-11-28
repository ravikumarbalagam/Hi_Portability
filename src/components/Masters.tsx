import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";

const insurers = [
  { id: 1, name: "Star Health Insurance", code: "STAR", status: "Active" },
  { id: 2, name: "Care Health Insurance", code: "CARE", status: "Active" },
  { id: 3, name: "Max Bupa Health Insurance", code: "MAX", status: "Active" },
  { id: 4, name: "Niva Bupa Health Insurance", code: "NIVA", status: "Active" }
];

const policyTypes = [
  { id: 1, name: "Individual Health Insurance", code: "IND", status: "Active" },
  { id: 2, name: "Family Floater", code: "FAM", status: "Active" },
  { id: 3, name: "Senior Citizen", code: "SEN", status: "Active" }
];

export function Masters() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-slate-900">Master Data Management</h1>
        <p className="text-slate-500 mt-1">Manage reference data and configurations</p>
      </div>

      <Tabs defaultValue="insurers">
        <TabsList>
          <TabsTrigger value="insurers">Insurers</TabsTrigger>
          <TabsTrigger value="policy-types">Policy Types</TabsTrigger>
          <TabsTrigger value="request-types">Request Types</TabsTrigger>
        </TabsList>

        <TabsContent value="insurers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Insurer Master</CardTitle>
                  <CardDescription>Manage insurance companies</CardDescription>
                </div>
                <Button>
                  <Plus className="size-4 mr-2" />
                  Add Insurer
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {insurers.map((insurer) => (
                    <TableRow key={insurer.id}>
                      <TableCell>{insurer.name}</TableCell>
                      <TableCell>{insurer.code}</TableCell>
                      <TableCell>{insurer.status}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            <Edit className="size-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="size-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policy-types" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Policy Type Master</CardTitle>
                  <CardDescription>Manage policy categories</CardDescription>
                </div>
                <Button>
                  <Plus className="size-4 mr-2" />
                  Add Policy Type
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {policyTypes.map((type) => (
                    <TableRow key={type.id}>
                      <TableCell>{type.name}</TableCell>
                      <TableCell>{type.code}</TableCell>
                      <TableCell>{type.status}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            <Edit className="size-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="size-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="request-types" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Request Type Master</CardTitle>
              <CardDescription>Manage types of portability requests</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500 text-sm">Request types configuration coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
