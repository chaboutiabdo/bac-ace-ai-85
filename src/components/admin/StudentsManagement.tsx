import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Users, 
  Search, 
  Filter,
  UserPlus,
  Edit,
  Trash2,
  School,
  Trophy,
  Target,
  Clock
} from "lucide-react";
import { StudentApprovalDialog } from "./StudentApprovalDialog";
import { AddStudentDialog } from "./AddStudentDialog";

interface Student {
  id: string;
  name: string;
  email: string;
  school: string | null; // School is now optional
  stream: string;
  score: number;
  quizzesCompleted: number;
  lastActive: string;
  status: "active" | "inactive";
}

export function StudentsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<"approved" | "pending">("approved");

  // Mock data - replace with real data from Supabase
  const [students] = useState<Student[]>([
    {
      id: "1",
      name: "Ahmed Benali",
      email: "ahmed.benali@email.com",
      school: "Lycée Mohamed Boudiaf",
      stream: "Sciences Expérimentales",
      score: 1250,
      quizzesCompleted: 47,
      lastActive: "2024-01-20",
      status: "active"
    },
    {
      id: "2",
      name: "Fatima Zohra",
      email: "fatima.zohra@email.com", 
      school: "Lycée Ibn Khaldoun",
      stream: "Mathématiques",
      score: 980,
      quizzesCompleted: 35,
      lastActive: "2024-01-19",
      status: "active"
    },
    {
      id: "3",
      name: "Mohamed Amari",
      email: "mohamed.amari@email.com",
      school: null,  // Student without school
      stream: "Informatique",
      score: 750,
      quizzesCompleted: 28,
      lastActive: "2024-01-15",
      status: "inactive"
    },
    {
      id: "4",
      name: "Yasmine Khalil",
      email: "yasmine.khalil@email.com",
      school: null,  // Independent learner
      stream: "Gestion Économie",
      score: 1100,
      quizzesCompleted: 52,
      lastActive: "2024-01-22",
      status: "active"
    }
  ]);

  // Mock pending students - replace with real data from Supabase
  const [pendingStudents] = useState([
    {
      id: "pending-1",
      name: "Sara Amrani",
      email: "sara.amrani@email.com",
      school: "Lycée Ibn Sina",
      stream: "Sciences Expérimentales",
      registrationDate: "2024-01-21"
    },
    {
      id: "pending-2",
      name: "Youssef Bennani",
      email: "youssef.bennani@email.com",
      school: null, // No school
      stream: "Technique Mathématiques",
      registrationDate: "2024-01-20"
    }
  ]);

  const schools = ["Lycée Mohamed Boudiaf", "Lycée Ibn Khaldoun", "Lycée El Houria"];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSchool = schoolFilter === "all" || 
                         (schoolFilter === "no-school" && !student.school) ||
                         student.school === schoolFilter;
    return matchesSearch && matchesSchool;
  });

  const filteredPendingStudents = pendingStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSchool = schoolFilter === "all" || 
                         (schoolFilter === "no-school" && !student.school) ||
                         student.school === schoolFilter;
    return matchesSearch && matchesSchool;
  });

  const activeStudents = students.filter(s => s.status === "active").length;
  const totalScore = students.reduce((sum, s) => sum + s.score, 0);
  const avgScore = Math.round(totalScore / students.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Users className="h-8 w-8" />
            Students Management
          </h1>
          <p className="text-muted-foreground">View and manage student accounts</p>
        </div>
        <AddStudentDialog>
          <Button className="gradient-primary text-white">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </AddStudentDialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{students.length}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-success" />
              <div>
                <p className="text-2xl font-bold">{activeStudents}</p>
                <p className="text-sm text-muted-foreground">Active Students</p>
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
                <p className="text-sm text-muted-foreground">Avg Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              <div>
                <p className="text-2xl font-bold">{pendingStudents.length}</p>
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Students Management</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={activeTab === "approved" ? "default" : "outline"}
                onClick={() => setActiveTab("approved")}
                size="sm"
              >
                Approved Students ({students.length})
              </Button>
              <Button
                variant={activeTab === "pending" ? "default" : "outline"}
                onClick={() => setActiveTab("pending")}
                size="sm"
              >
                Pending Approvals ({pendingStudents.length})
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={schoolFilter} onValueChange={setSchoolFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by school" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="no-school">Independent Learners</SelectItem>
                {schools.map((school) => (
                  <SelectItem key={school} value={school}>
                    {school}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Students Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  {activeTab === "approved" ? (
                    <>
                      <TableHead>Student</TableHead>
                      <TableHead>School</TableHead>
                      <TableHead>Stream</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Quizzes</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </>
                  ) : (
                    <>
                      <TableHead>Student</TableHead>
                      <TableHead>School</TableHead>
                      <TableHead>Stream</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeTab === "approved" ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {student.school ? (
                          <span>{student.school}</span>
                        ) : (
                          <Badge variant="secondary" className="text-xs">
                            Independent
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {student.stream}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {student.score.toLocaleString()}
                        </Badge>
                      </TableCell>
                      <TableCell>{student.quizzesCompleted}</TableCell>
                      <TableCell>{new Date(student.lastActive).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={student.status === "active" ? "default" : "secondary"}
                        >
                          {student.status}
                        </Badge>
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
                  ))
                ) : (
                  filteredPendingStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {student.school ? (
                          <span>{student.school}</span>
                        ) : (
                          <Badge variant="secondary" className="text-xs">
                            Independent
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {student.stream}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(student.registrationDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <StudentApprovalDialog student={student}>
                          <Button size="sm" className="gradient-primary text-white">
                            Review Application
                          </Button>
                        </StudentApprovalDialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}