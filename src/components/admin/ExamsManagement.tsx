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
  FileText, 
  Upload, 
  Search, 
  Filter,
  Download,
  Edit,
  Trash2,
  Calendar,
  Book
} from "lucide-react";
import { UploadExamDialog } from "./UploadExamDialog";
import { AddSolutionDialog } from "./AddSolutionDialog";

interface Exam {
  id: string;
  title: string;
  subject: string;
  year: number;
  type: "practice" | "official";
  difficulty: "easy" | "medium" | "hard";
  questions: number;
  uploadDate: string;
  downloads: number;
}

export function ExamsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");

  // Mock data - replace with real data from Supabase
  const [exams] = useState<Exam[]>([
    {
      id: "1",
      title: "BAC Mathematics 2023 - Session 1",
      subject: "Mathematics",
      year: 2023,
      type: "official",
      difficulty: "hard",
      questions: 25,
      uploadDate: "2024-01-15",
      downloads: 1247
    },
    {
      id: "2",
      title: "BAC Physics 2023 - Practice Test",
      subject: "Physics", 
      year: 2023,
      type: "practice",
      difficulty: "medium",
      questions: 30,
      uploadDate: "2024-01-18",
      downloads: 892
    },
    {
      id: "3",
      title: "BAC Chemistry 2022 - Session 2",
      subject: "Chemistry",
      year: 2022,
      type: "official", 
      difficulty: "hard",
      questions: 20,
      uploadDate: "2024-01-20",
      downloads: 675
    }
  ]);

  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "Literature"];
  const years = [2024, 2023, 2022, 2021, 2020];

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === "all" || exam.subject === subjectFilter;
    const matchesYear = yearFilter === "all" || exam.year.toString() === yearFilter;
    return matchesSearch && matchesSubject && matchesYear;
  });

  const totalDownloads = exams.reduce((sum, exam) => sum + exam.downloads, 0);
  const officialExams = exams.filter(e => e.type === "official").length;
  const practiceExams = exams.filter(e => e.type === "practice").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Exams Management
          </h1>
          <p className="text-muted-foreground">Upload and manage BAC examination papers</p>
        </div>
        <UploadExamDialog>
          <Button className="gradient-primary text-white">
            <Upload className="h-4 w-4 mr-2" />
            Upload Exam
          </Button>
        </UploadExamDialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{exams.length}</p>
                <p className="text-sm text-muted-foreground">Total Exams</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-success" />
              <div>
                <p className="text-2xl font-bold">{officialExams}</p>
                <p className="text-sm text-muted-foreground">Official Papers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Book className="h-5 w-5 text-accent" />
              <div>
                <p className="text-2xl font-bold">{practiceExams}</p>
                <p className="text-sm text-muted-foreground">Practice Tests</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-warning" />
              <div>
                <p className="text-2xl font-bold">{totalDownloads.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Downloads</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exams List */}
      <Card>
        <CardHeader>
          <CardTitle>Examination Papers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search exams by title or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Exams Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exam Title</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExams.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{exam.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Uploaded {new Date(exam.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{exam.subject}</TableCell>
                    <TableCell>{exam.year}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={exam.type === "official" ? "default" : "secondary"}
                      >
                        {exam.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          exam.difficulty === "hard" ? "destructive" :
                          exam.difficulty === "medium" ? "secondary" : "outline"
                        }
                      >
                        {exam.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell>{exam.questions}</TableCell>
                    <TableCell>{exam.downloads.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" title="Download exam">
                          <Download className="h-4 w-4" />
                        </Button>
                        <AddSolutionDialog examTitle={exam.title}>
                          <Button variant="ghost" size="sm" title="Add/Edit solution">
                            <FileText className="h-4 w-4 text-success" />
                          </Button>
                        </AddSolutionDialog>
                        <Button variant="ghost" size="sm" title="Edit exam">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Delete exam">
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