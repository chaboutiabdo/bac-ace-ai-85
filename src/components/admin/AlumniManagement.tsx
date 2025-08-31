import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  GraduationCap, 
  Search, 
  Filter,
  UserPlus,
  Edit,
  Trash2,
  Upload,
  Download,
  Trophy,
  Users,
  Building,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Alumni {
  id: string;
  name: string;
  email: string;
  class: string;
  score: number;
  university: string;
  field: string;
  graduationYear: string;
  currentJob?: string;
  linkedIn?: string;
  status: "active" | "inactive";
}

export function AlumniManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [fieldFilter, setFieldFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCSVDialogOpen, setIsCSVDialogOpen] = useState(false);
  const { toast } = useToast();

  // Mock data - replace with real data from Supabase
  const [alumni, setAlumni] = useState<Alumni[]>([
    {
      id: "1",
      name: "Sara Amrani",
      email: "sara.amrani@email.com",
      class: "Sciences Mathématiques",
      score: 1850,
      university: "Université Mohammed V",
      field: "Génie Informatique",
      graduationYear: "2022",
      currentJob: "Software Engineer at Google",
      linkedIn: "linkedin.com/in/sara-amrani",
      status: "active"
    },
    {
      id: "2", 
      name: "Youssef Bennani",
      email: "youssef.bennani@email.com",
      class: "Sciences Physiques",
      score: 1650,
      university: "INSA Rabat",
      field: "Génie Civil",
      graduationYear: "2021",
      currentJob: "Civil Engineer at OCP Group",
      status: "active"
    },
    {
      id: "3",
      name: "Aicha El Fassi",
      email: "aicha.elfassi@email.com", 
      class: "Sciences de la Vie et de la Terre",
      score: 1750,
      university: "Faculté de Médecine Casablanca",
      field: "Médecine",
      graduationYear: "2023",
      currentJob: "Resident Doctor at CHU",
      status: "active"
    }
  ]);

  // Form state for manual creation
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    class: "",
    score: "",
    university: "",
    field: "",
    graduationYear: "",
    currentJob: "",
    linkedIn: ""
  });

  const classes = ["Sciences Mathématiques", "Sciences Physiques", "Sciences de la Vie et de la Terre", "Lettres Modernes"];
  const fields = ["Génie Informatique", "Génie Civil", "Médecine", "Économie", "Droit", "Architecture"];

  const filteredAlumni = alumni.filter(alumnus => {
    const matchesSearch = alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumnus.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumnus.university.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = classFilter === "all" || alumnus.class === classFilter;
    const matchesField = fieldFilter === "all" || alumnus.field === fieldFilter;
    return matchesSearch && matchesClass && matchesField;
  });

  const handleCreateAlumni = () => {
    if (!formData.name || !formData.email || !formData.class || !formData.score || !formData.university || !formData.field || !formData.graduationYear) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newAlumni: Alumni = {
      id: Date.now().toString(),
      ...formData,
      score: parseInt(formData.score),
      status: "active"
    };

    setAlumni([...alumni, newAlumni]);
    setFormData({
      name: "",
      email: "",
      class: "",
      score: "",
      university: "",
      field: "",
      graduationYear: "",
      currentJob: "",
      linkedIn: ""
    });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Alumni profile created successfully",
    });
  };

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result as string;
      const lines = csv.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      
      const newAlumni: Alumni[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        if (values.length === headers.length && values[0]) {
          newAlumni.push({
            id: Date.now().toString() + i,
            name: values[0] || "",
            email: values[1] || "",
            class: values[2] || "",
            score: parseInt(values[3]) || 0,
            university: values[4] || "",
            field: values[5] || "",
            graduationYear: values[6] || "",
            currentJob: values[7] || "",
            linkedIn: values[8] || "",
            status: "active"
          });
        }
      }
      
      if (newAlumni.length > 0) {
        setAlumni([...alumni, ...newAlumni]);
        setIsCSVDialogOpen(false);
        toast({
          title: "Success",
          description: `${newAlumni.length} alumni profiles imported successfully`,
        });
      }
    };
    reader.readAsText(file);
  };

  const downloadCSVTemplate = () => {
    const csvContent = "Name,Email,Class,Score,University,Field,Graduation Year,Current Job,LinkedIn\nExample Name,example@email.com,Sciences Mathématiques,1500,Université Mohammed V,Génie Informatique,2022,Software Engineer,linkedin.com/in/example";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'alumni_template.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalAlumni = alumni.length;
  const avgScore = Math.round(alumni.reduce((sum, a) => sum + a.score, 0) / alumni.length);
  const uniqueUniversities = new Set(alumni.map(a => a.university)).size;
  const uniqueFields = new Set(alumni.map(a => a.field)).size;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <GraduationCap className="h-8 w-8" />
            Alumni Management
          </h1>
          <p className="text-muted-foreground">Manage alumni profiles and track success stories</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCSVDialogOpen} onOpenChange={setIsCSVDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import CSV
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Alumni from CSV</DialogTitle>
                <DialogDescription>
                  Upload a CSV file to bulk import alumni profiles. Download the template below for the correct format.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Button onClick={downloadCSVTemplate} variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download CSV Template
                </Button>
                <div>
                  <Label htmlFor="csv-upload">Upload CSV File</Label>
                  <Input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleCSVUpload}
                    className="mt-1"
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Alumni
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Alumni Profile</DialogTitle>
                <DialogDescription>
                  Add a new alumni profile with their academic and professional information.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <Label htmlFor="class">BAC Class *</Label>
                  <Select value={formData.class} onValueChange={(value) => setFormData({...formData, class: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select BAC class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="score">BAC Score *</Label>
                  <Input
                    id="score"
                    type="number"
                    value={formData.score}
                    onChange={(e) => setFormData({...formData, score: e.target.value})}
                    placeholder="BAC score"
                  />
                </div>
                <div>
                  <Label htmlFor="university">University *</Label>
                  <Input
                    id="university"
                    value={formData.university}
                    onChange={(e) => setFormData({...formData, university: e.target.value})}
                    placeholder="University name"
                  />
                </div>
                <div>
                  <Label htmlFor="field">Field of Study *</Label>
                  <Select value={formData.field} onValueChange={(value) => setFormData({...formData, field: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      {fields.map((field) => (
                        <SelectItem key={field} value={field}>{field}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="graduationYear">Graduation Year *</Label>
                  <Input
                    id="graduationYear"
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({...formData, graduationYear: e.target.value})}
                    placeholder="Year of graduation"
                  />
                </div>
                <div>
                  <Label htmlFor="currentJob">Current Job</Label>
                  <Input
                    id="currentJob"
                    value={formData.currentJob}
                    onChange={(e) => setFormData({...formData, currentJob: e.target.value})}
                    placeholder="Current position"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                  <Input
                    id="linkedIn"
                    value={formData.linkedIn}
                    onChange={(e) => setFormData({...formData, linkedIn: e.target.value})}
                    placeholder="LinkedIn URL"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateAlumni} className="gradient-primary text-white">
                  Create Alumni
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{totalAlumni}</p>
                <p className="text-sm text-muted-foreground">Total Alumni</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-accent" />
              <div>
                <p className="text-2xl font-bold">{avgScore}</p>
                <p className="text-sm text-muted-foreground">Avg BAC Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-success" />
              <div>
                <p className="text-2xl font-bold">{uniqueUniversities}</p>
                <p className="text-sm text-muted-foreground">Universities</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-warning" />
              <div>
                <p className="text-2xl font-bold">{uniqueFields}</p>
                <p className="text-sm text-muted-foreground">Fields of Study</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alumni List */}
      <Card>
        <CardHeader>
          <CardTitle>Alumni Directory</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alumni by name, email, or university..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={fieldFilter} onValueChange={setFieldFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fields</SelectItem>
                {fields.map((field) => (
                  <SelectItem key={field} value={field}>{field}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Alumni Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alumni</TableHead>
                  <TableHead>BAC Info</TableHead>
                  <TableHead>University</TableHead>
                  <TableHead>Field</TableHead>
                  <TableHead>Graduation</TableHead>
                  <TableHead>Current Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlumni.map((alumnus) => (
                  <TableRow key={alumnus.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{alumnus.name}</p>
                        <p className="text-sm text-muted-foreground">{alumnus.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{alumnus.class}</p>
                        <Badge variant="outline" className="font-mono text-xs">
                          Score: {alumnus.score}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{alumnus.university}</TableCell>
                    <TableCell>{alumnus.field}</TableCell>
                    <TableCell>{alumnus.graduationYear}</TableCell>
                    <TableCell>
                      <div>
                        {alumnus.currentJob && (
                          <p className="text-sm font-medium">{alumnus.currentJob}</p>
                        )}
                        {alumnus.linkedIn && (
                          <a 
                            href={`https://${alumnus.linkedIn}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline"
                          >
                            LinkedIn Profile
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}