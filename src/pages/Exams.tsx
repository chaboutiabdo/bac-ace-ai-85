import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle, Bot, Eye } from "lucide-react";
import Navigation from "@/components/layout/Navigation";

interface Exam {
  id: string;
  subject: string;
  stream: string;
  year: number;
  title: string;
  solved: boolean;
}

const mockExams: Exam[] = [
  { id: "1", subject: "Math", stream: "Sciences", year: 2023, title: "Math - Sciences 2023", solved: true },
  { id: "2", subject: "Physics", stream: "Sciences", year: 2023, title: "Physics - Sciences 2023", solved: false },
  { id: "3", subject: "Math", stream: "Math", year: 2022, title: "Math - Math 2022", solved: true },
  { id: "4", subject: "Physics", stream: "Sciences", year: 2022, title: "Physics - Sciences 2022", solved: false },
];

const Exams = () => {
  const [selectedStream, setSelectedStream] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  const filteredExams = mockExams.filter(exam => {
    return (!selectedStream || selectedStream === "all" || exam.stream === selectedStream) &&
           (!selectedSubject || selectedSubject === "all" || exam.subject === selectedSubject) &&
           (!selectedYear || selectedYear === "all" || exam.year.toString() === selectedYear);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Previous BAC Exams
            </h1>
            <p className="text-muted-foreground text-lg">
              Practice with official past exams and get AI-powered solutions
            </p>
          </div>

          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Filter Exams
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={selectedStream} onValueChange={setSelectedStream}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Stream" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Streams</SelectItem>
                  <SelectItem value="Sciences">Sciences</SelectItem>
                  <SelectItem value="Math">Math</SelectItem>
                  <SelectItem value="Letters">Letters</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Math">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredExams.map((exam) => (
              <Card key={exam.id} className="group hover:shadow-lg transition-all duration-300 border-primary/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {exam.solved && <CheckCircle className="h-5 w-5 text-success" />}
                      {exam.title}
                    </CardTitle>
                    <Badge variant={exam.solved ? "default" : "secondary"}>
                      {exam.solved ? "Solved" : "New"}
                    </Badge>
                  </div>
                  <CardDescription>
                    {exam.stream} Stream • {exam.year}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      View Exam
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Solution
                    </Button>
                    <Button variant="default" size="sm" className="w-full bg-gradient-to-r from-primary to-accent text-white">
                      <Bot className="h-4 w-4 mr-2" />
                      Solve with AI
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Exams;