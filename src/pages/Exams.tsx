import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Eye, FileText, Sparkles } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useActivityTracking } from "@/hooks/useActivityTracking";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  
  const { user } = useAuth();
  const { trackExamActivity } = useActivityTracking();
  const { toast } = useToast();

  const handleExamAction = async (exam: Exam, action: 'viewed' | 'viewed_solution' | 'solved_with_ai') => {
    if (!user) return;

    try {
      // Track exam activity
      await trackExamActivity(
        exam.id,
        action === 'viewed' ? 'viewed' : action === 'viewed_solution' ? 'downloaded' : 'started_solving',
        exam.title,
        exam.subject,
        exam.year,
        exam.stream
      );

      // Update exam progress for scoring
      const progressUpdate: any = {
        student_id: user.id,
        exam_id: exam.id
      };

      if (action === 'viewed') {
        progressUpdate.viewed_exam = true;
      } else if (action === 'viewed_solution') {
        progressUpdate.viewed_solution = true;
      } else if (action === 'solved_with_ai') {
        progressUpdate.solved_with_ai = true;
      }

      await supabase.from('exam_progress').upsert(progressUpdate);

      toast({
        title: "Success",
        description: `Exam ${action.replace('_', ' ')} successfully`,
      });

    } catch (error) {
      console.error('Error handling exam action:', error);
      toast({
        title: "Error",
        description: "Failed to process exam action",
        variant: "destructive",
      });
    }
  };

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
                    <Button 
                      className="w-full"
                      variant="outline"
                      onClick={() => handleExamAction(exam, 'viewed')}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Exam
                    </Button>
                    <Button 
                      className="w-full"
                      variant="outline"
                      onClick={() => handleExamAction(exam, 'viewed_solution')}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Solutions
                    </Button>
                    <Button 
                      className="w-full relative overflow-hidden group bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                      onClick={() => handleExamAction(exam, 'solved_with_ai')}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex items-center justify-center">
                        <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                        <span className="font-semibold">Solve with AI</span>
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
                      </div>
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