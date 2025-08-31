import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Calendar, 
  Search, 
  Filter,
  Phone,
  MessageCircle,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface SessionBooking {
  id: string;
  studentName: string;
  studentPhone: string;
  alumniName: string;
  alumniField: string;
  topic: string;
  timePreference: string;
  message: string;
  status: "pending" | "approved" | "rejected" | "completed";
  requestDate: string;
  scheduledDate?: string;
}

export function SessionsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedSession, setSelectedSession] = useState<SessionBooking | null>(null);
  const [adminNotes, setAdminNotes] = useState("");

  // Mock data - replace with real data from backend
  const [sessions] = useState<SessionBooking[]>([
    {
      id: "1",
      studentName: "Mohamed Benali",
      studentPhone: "+213 555 123 456",
      alumniName: "Ahmed Benaissa",
      alumniField: "Computer Science",
      topic: "study-strategies",
      timePreference: "evening",
      message: "I need help with organizing my study schedule for mathematics and physics.",
      status: "pending",
      requestDate: "2024-01-15T10:30:00Z"
    },
    {
      id: "2",
      studentName: "Amina Khelif", 
      studentPhone: "+213 555 789 012",
      alumniName: "Fatima Zerhouni",
      alumniField: "Medicine",
      topic: "exam-preparation",
      timePreference: "morning",
      message: "Looking for guidance on BAC biology preparation techniques.",
      status: "approved",
      requestDate: "2024-01-14T14:20:00Z",
      scheduledDate: "2024-01-20T09:00:00Z"
    },
    {
      id: "3",
      studentName: "Yacine Meziani",
      studentPhone: "+213 555 345 678", 
      alumniName: "Youcef Benchikh",
      alumniField: "Engineering",
      topic: "university-choice",
      timePreference: "afternoon",
      message: "Need advice on choosing between different engineering schools.",
      status: "completed",
      requestDate: "2024-01-12T16:45:00Z",
      scheduledDate: "2024-01-18T15:00:00Z"
    }
  ]);

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.alumniName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || session.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "secondary";
      case "approved": return "default";
      case "completed": return "outline";
      case "rejected": return "destructive";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <AlertCircle className="h-4 w-4" />;
      case "approved": return <CheckCircle className="h-4 w-4" />;
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "rejected": return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getTopicLabel = (topic: string) => {
    const topics = {
      "study-strategies": "Study Strategies",
      "exam-preparation": "Exam Preparation", 
      "university-choice": "University Choice",
      "career-guidance": "Career Guidance",
      "motivation": "Motivation & Mindset"
    };
    return topics[topic as keyof typeof topics] || topic;
  };

  const getTimeLabel = (time: string) => {
    const times = {
      "morning": "Morning (9AM-12PM)",
      "afternoon": "Afternoon (2PM-5PM)",
      "evening": "Evening (6PM-9PM)"
    };
    return times[time as keyof typeof times] || time;
  };

  const handleApproveSession = (sessionId: string) => {
    // TODO: Update session status in backend
    console.log("Approved session:", sessionId);
  };

  const handleRejectSession = (sessionId: string) => {
    // TODO: Update session status in backend
    console.log("Rejected session:", sessionId);
  };

  const pendingSessions = sessions.filter(s => s.status === "pending").length;
  const approvedSessions = sessions.filter(s => s.status === "approved").length;
  const completedSessions = sessions.filter(s => s.status === "completed").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Calendar className="h-8 w-8" />
            Sessions Management
          </h1>
          <p className="text-muted-foreground">Manage mentoring session requests from students</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              <div>
                <p className="text-2xl font-bold">{pendingSessions}</p>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <div>
                <p className="text-2xl font-bold">{approvedSessions}</p>
                <p className="text-sm text-muted-foreground">Approved Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{completedSessions}</p>
                <p className="text-sm text-muted-foreground">Completed Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-accent" />
              <div>
                <p className="text-2xl font-bold">{sessions.length}</p>
                <p className="text-sm text-muted-foreground">Total Requests</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sessions List */}
      <Card>
        <CardHeader>
          <CardTitle>Session Requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by student, alumni, or topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sessions Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Alumni Mentor</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Time Preference</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {session.studentName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{session.studentName}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {session.studentPhone}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{session.alumniName}</p>
                        <p className="text-sm text-muted-foreground">{session.alumniField}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getTopicLabel(session.topic)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3" />
                        {getTimeLabel(session.timePreference)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(session.status)} className="flex items-center gap-1 w-fit">
                        {getStatusIcon(session.status)}
                        {session.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(session.requestDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setSelectedSession(session)}
                            >
                              <User className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Session Request Details</DialogTitle>
                              <DialogDescription>
                                Review and manage this mentoring session request
                              </DialogDescription>
                            </DialogHeader>
                            {selectedSession && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-3">
                                    <h4 className="font-semibold">Student Information</h4>
                                    <div className="space-y-2">
                                      <p><span className="font-medium">Name:</span> {selectedSession.studentName}</p>
                                      <p><span className="font-medium">Phone:</span> {selectedSession.studentPhone}</p>
                                    </div>
                                  </div>
                                  <div className="space-y-3">
                                    <h4 className="font-semibold">Alumni Mentor</h4>
                                    <div className="space-y-2">
                                      <p><span className="font-medium">Name:</span> {selectedSession.alumniName}</p>
                                      <p><span className="font-medium">Field:</span> {selectedSession.alumniField}</p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="space-y-3">
                                  <h4 className="font-semibold">Session Details</h4>
                                  <div className="grid grid-cols-2 gap-4">
                                    <p><span className="font-medium">Topic:</span> {getTopicLabel(selectedSession.topic)}</p>
                                    <p><span className="font-medium">Preferred Time:</span> {getTimeLabel(selectedSession.timePreference)}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium mb-2">Student Message:</p>
                                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                                      {selectedSession.message || "No additional message provided."}
                                    </p>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <h4 className="font-semibold">Admin Notes</h4>
                                  <Textarea
                                    placeholder="Add notes about this session..."
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    className="min-h-[80px]"
                                  />
                                </div>

                                {selectedSession.status === "pending" && (
                                  <div className="flex gap-3 pt-4">
                                    <Button 
                                      variant="outline" 
                                      onClick={() => handleRejectSession(selectedSession.id)}
                                      className="flex-1"
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject
                                    </Button>
                                    <Button 
                                      onClick={() => handleApproveSession(selectedSession.id)}
                                      className="flex-1"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve & Contact Alumni
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        {session.status === "pending" && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleApproveSession(session.id)}
                              title="Approve session"
                            >
                              <CheckCircle className="h-4 w-4 text-success" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRejectSession(session.id)}
                              title="Reject session"
                            >
                              <XCircle className="h-4 w-4 text-destructive" />
                            </Button>
                          </>
                        )}
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