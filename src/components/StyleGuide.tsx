import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle,
  Shield
} from "lucide-react";

export function StyleGuide() {
  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-[#04274F]">IIB Design System Style Guide</h1>
        <p className="text-[#6E6E6E] mt-2">
          Comprehensive design system for Insurance Information Bureau - Health Insurance Portability Application
        </p>
      </div>

      {/* Color Palette */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#04274F]">Color Palette</CardTitle>
          <CardDescription>Primary colors used throughout the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Primary Colors */}
          <div>
            <h3 className="text-[#1F6098] mb-4">Primary Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <div className="h-24 bg-[#2877BB] rounded-lg border border-slate-200 flex items-center justify-center">
                  <span className="text-white">Primary</span>
                </div>
                <div className="text-sm">
                  <div className="text-[#04274F]">Primary Blue</div>
                  <div className="text-[#6E6E6E] font-mono text-xs">#2877BB</div>
                  <div className="text-[#6E6E6E] text-xs">Buttons, Links, Active States</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="h-24 bg-[#04274F] rounded-lg border border-slate-200 flex items-center justify-center">
                  <span className="text-white">Heading</span>
                </div>
                <div className="text-sm">
                  <div className="text-[#04274F]">Heading Dark</div>
                  <div className="text-[#6E6E6E] font-mono text-xs">#04274F</div>
                  <div className="text-[#6E6E6E] text-xs">H1, H2 Headings, Primary Text</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="h-24 bg-[#1F6098] rounded-lg border border-slate-200 flex items-center justify-center">
                  <span className="text-white">Subtitle</span>
                </div>
                <div className="text-sm">
                  <div className="text-[#04274F]">Subtitle Blue</div>
                  <div className="text-[#6E6E6E] font-mono text-xs">#1F6098</div>
                  <div className="text-[#6E6E6E] text-xs">H3, H4, Secondary Text</div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Colors */}
          <div>
            <h3 className="text-[#1F6098] mb-4">Secondary Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <div className="h-24 bg-[#E3EDFF] rounded-lg border border-slate-200 flex items-center justify-center">
                  <span className="text-[#04274F]">Lighter</span>
                </div>
                <div className="text-sm">
                  <div className="text-[#04274F]">Light Blue</div>
                  <div className="text-[#6E6E6E] font-mono text-xs">#E3EDFF</div>
                  <div className="text-[#6E6E6E] text-xs">Backgrounds, Hover States</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="h-24 bg-[#2D2D2D] rounded-lg border border-slate-200 flex items-center justify-center">
                  <span className="text-white">Dark BG</span>
                </div>
                <div className="text-sm">
                  <div className="text-[#04274F]">Dark Background</div>
                  <div className="text-[#6E6E6E] font-mono text-xs">#2D2D2D</div>
                  <div className="text-[#6E6E6E] text-xs">Dark Mode, Footers</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="h-24 bg-[#6E6E6E] rounded-lg border border-slate-200 flex items-center justify-center">
                  <span className="text-white">Gray</span>
                </div>
                <div className="text-sm">
                  <div className="text-[#04274F]">Neutral Gray</div>
                  <div className="text-[#6E6E6E] font-mono text-xs">#6E6E6E</div>
                  <div className="text-[#6E6E6E] text-xs">Helper Text, Captions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Semantic Colors */}
          <div>
            <h3 className="text-[#1F6098] mb-4">Semantic Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-3">
                <div className="h-20 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">Success</span>
                </div>
                <div className="text-xs text-[#6E6E6E]">Approved, Completed</div>
              </div>
              <div className="space-y-3">
                <div className="h-20 bg-amber-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">Warning</span>
                </div>
                <div className="text-xs text-[#6E6E6E]">Pending, In Progress</div>
              </div>
              <div className="space-y-3">
                <div className="h-20 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">Error</span>
                </div>
                <div className="text-xs text-[#6E6E6E]">Rejected, Failed</div>
              </div>
              <div className="space-y-3">
                <div className="h-20 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">Info</span>
                </div>
                <div className="text-xs text-[#6E6E6E]">Information, Neutral</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#04274F]">Typography</CardTitle>
          <CardDescription>Text styles and hierarchy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h1 className="text-[#04274F]">Heading 1 - Page Title</h1>
              <p className="text-xs text-[#6E6E6E] mt-1">2xl / Medium / #04274F</p>
            </div>
            <Separator />
            <div>
              <h2 className="text-[#04274F]">Heading 2 - Section Title</h2>
              <p className="text-xs text-[#6E6E6E] mt-1">xl / Medium / #04274F</p>
            </div>
            <Separator />
            <div>
              <h3 className="text-[#1F6098]">Heading 3 - Subsection</h3>
              <p className="text-xs text-[#6E6E6E] mt-1">lg / Medium / #1F6098</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-[#1F6098]">Heading 4 - Card Title</h4>
              <p className="text-xs text-[#6E6E6E] mt-1">base / Medium / #1F6098</p>
            </div>
            <Separator />
            <div>
              <p className="text-[#04274F]">Body Text - Regular paragraph text used throughout the application</p>
              <p className="text-xs text-[#6E6E6E] mt-1">base / Normal / #04274F</p>
            </div>
            <Separator />
            <div>
              <p className="text-[#6E6E6E]">Helper Text - Secondary information and captions</p>
              <p className="text-xs text-[#6E6E6E] mt-1">sm / Normal / #6E6E6E</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#04274F]">Buttons</CardTitle>
          <CardDescription>Button variants and states</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="text-[#1F6098] mb-3">Primary Actions</h4>
            <div className="flex flex-wrap gap-3">
              <Button>Primary Button</Button>
              <Button disabled>Disabled Button</Button>
              <Button size="sm">Small Button</Button>
              <Button size="lg">Large Button</Button>
            </div>
          </div>

          <div>
            <h4 className="text-[#1F6098] mb-3">Secondary Actions</h4>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline">Outline Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="link">Link Button</Button>
            </div>
          </div>

          <div>
            <h4 className="text-[#1F6098] mb-3">Special Actions</h4>
            <div className="flex flex-wrap gap-3">
              <Button variant="destructive">Destructive Button</Button>
              <Button variant="outline" size="icon">
                <FileText className="size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Elements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#04274F]">Form Elements</CardTitle>
          <CardDescription>Input fields and form controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Text Input</Label>
              <Input placeholder="Enter text..." />
            </div>
            <div className="space-y-2">
              <Label>Disabled Input</Label>
              <Input placeholder="Disabled" disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#04274F]">Badges & Status</CardTitle>
          <CardDescription>Status indicators and labels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          
          <Separator />
          
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-green-600">Approved</Badge>
            <Badge className="bg-amber-600">Pending</Badge>
            <Badge className="bg-red-600">Rejected</Badge>
            <Badge className="bg-blue-600">Processing</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Icons */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#04274F]">Icons</CardTitle>
          <CardDescription>Commonly used icons with color variations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-[#E3EDFF] rounded-lg">
                <FileText className="size-6 text-[#2877BB]" />
              </div>
              <span className="text-xs text-[#6E6E6E]">File Text</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle2 className="size-6 text-green-600" />
              </div>
              <span className="text-xs text-[#6E6E6E]">Check Circle</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-red-50 rounded-lg">
                <XCircle className="size-6 text-red-600" />
              </div>
              <span className="text-xs text-[#6E6E6E]">X Circle</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-amber-50 rounded-lg">
                <Clock className="size-6 text-amber-600" />
              </div>
              <span className="text-xs text-[#6E6E6E]">Clock</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-amber-50 rounded-lg">
                <AlertCircle className="size-6 text-amber-600" />
              </div>
              <span className="text-xs text-[#6E6E6E]">Alert Circle</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-[#E3EDFF] rounded-lg">
                <Shield className="size-6 text-[#2877BB]" />
              </div>
              <span className="text-xs text-[#6E6E6E]">Shield</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#04274F]">Cards</CardTitle>
          <CardDescription>Card components and layouts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F6098]">Standard Card</CardTitle>
                <CardDescription>With header and content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#6E6E6E]">Card content goes here with descriptive text.</p>
              </CardContent>
            </Card>

            <Card className="bg-[#E3EDFF] border-[#2877BB]">
              <CardHeader>
                <CardTitle className="text-[#04274F]">Highlighted Card</CardTitle>
                <CardDescription className="text-[#1F6098]">With custom background</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#04274F]">Important information card with light blue background.</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Spacing & Layout */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#04274F]">Spacing & Layout</CardTitle>
          <CardDescription>Consistent spacing system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="w-16 h-8 bg-[#2877BB]"></div>
              <span className="text-sm text-[#6E6E6E]">8px - Tight spacing</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 h-8 bg-[#2877BB]"></div>
              <span className="text-sm text-[#6E6E6E]">16px - Default spacing</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 h-8 bg-[#2877BB]"></div>
              <span className="text-sm text-[#6E6E6E]">24px - Section spacing</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-40 h-8 bg-[#2877BB]"></div>
              <span className="text-sm text-[#6E6E6E]">32px - Large spacing</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Border Radius */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#04274F]">Border Radius</CardTitle>
          <CardDescription>Rounded corners system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-[#2877BB] rounded-sm"></div>
              <span className="text-xs text-[#6E6E6E] mt-2 block">Small (4px)</span>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-[#2877BB] rounded-md"></div>
              <span className="text-xs text-[#6E6E6E] mt-2 block">Medium (6px)</span>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-[#2877BB] rounded-lg"></div>
              <span className="text-xs text-[#6E6E6E] mt-2 block">Large (10px)</span>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-[#2877BB] rounded-xl"></div>
              <span className="text-xs text-[#6E6E6E] mt-2 block">XL (14px)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
