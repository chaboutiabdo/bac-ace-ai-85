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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Video, 
  Search, 
  Filter,
  Plus,
  Edit,
  Trash2,
  Upload,
  Link,
  Play,
  BookOpen,
  GraduationCap,
  Clock,
  Eye,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  type: "upload" | "link";
  url: string;
  duration: number; // in minutes
  stream: string;
  subject: string;
  chapter: string;
  views: number;
  createdAt: string;
  status: "active" | "draft" | "archived";
  thumbnail?: string;
}

export function VideosManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [streamFilter, setStreamFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<"all" | "uploaded" | "links">("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  // Mock data - replace with real data from Supabase
  const [videos, setVideos] = useState<VideoItem[]>([
    {
      id: "1",
      title: "Les Fonctions Mathématiques - Partie 1",
      description: "Introduction aux fonctions mathématiques avec exemples pratiques",
      type: "upload",
      url: "/videos/math-functions-1.mp4",
      duration: 45,
      stream: "Sciences Mathématiques",
      subject: "Mathématiques",
      chapter: "Fonctions",
      views: 1250,
      createdAt: "2024-01-15",
      status: "active",
      thumbnail: "/thumbnails/math-1.jpg"
    },
    {
      id: "2",
      title: "Chimie Organique - Les Alcanes",
      description: "Étude complète des alcanes en chimie organique",
      type: "link",
      url: "https://youtube.com/watch?v=example123",
      duration: 32,
      stream: "Sciences Physiques",
      subject: "Chimie",
      chapter: "Chimie Organique",
      views: 890,
      createdAt: "2024-01-10",
      status: "active"
    },
    {
      id: "3",
      title: "Histoire du Maroc - Dynastie Almoravide",
      description: "L'histoire des Almoravides au Maroc médiéval",
      type: "upload",
      url: "/videos/history-almoravides.mp4",
      duration: 38,
      stream: "Lettres Modernes",
      subject: "Histoire",
      chapter: "Histoire Médiévale",
      views: 567,
      createdAt: "2024-01-08",
      status: "active"
    }
  ]);

  // Form state for video creation
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "upload" as "upload" | "link",
    url: "",
    duration: "",
    stream: "",
    subject: "",
    chapter: "",
    status: "draft" as "active" | "draft" | "archived"
  });

  const streams = ["Sciences Mathématiques", "Sciences Physiques", "Sciences de la Vie et de la Terre", "Lettres Modernes"];
  const subjects = ["Mathématiques", "Physique", "Chimie", "SVT", "Histoire", "Géographie", "Français", "Anglais", "Arabe", "Philosophie"];
  const chapters = ["Introduction", "Chapitre 1", "Chapitre 2", "Chapitre 3", "Révisions", "Examens Blancs"];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStream = streamFilter === "all" || video.stream === streamFilter;
    const matchesSubject = subjectFilter === "all" || video.subject === subjectFilter;
    const matchesType = activeTab === "all" || 
                       (activeTab === "uploaded" && video.type === "upload") ||
                       (activeTab === "links" && video.type === "link");
    return matchesSearch && matchesStream && matchesSubject && matchesType;
  });

  const handleCreateVideo = () => {
    if (!formData.title || !formData.stream || !formData.subject || !formData.chapter) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (formData.type === "link" && !formData.url) {
      toast({
        title: "Error",
        description: "Please provide a valid video URL",
        variant: "destructive",
      });
      return;
    }

    const newVideo: VideoItem = {
      id: Date.now().toString(),
      ...formData,
      duration: parseInt(formData.duration) || 0,
      views: 0,
      createdAt: new Date().toISOString().split('T')[0],
      url: formData.type === "upload" ? `/videos/${Date.now()}.mp4` : formData.url
    };

    setVideos([...videos, newVideo]);
    setFormData({
      title: "",
      description: "",
      type: "upload",
      url: "",
      duration: "",
      stream: "",
      subject: "",
      chapter: "",
      status: "draft"
    });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Video created successfully",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // In a real application, you would upload the file to a storage service
    // For now, we'll just simulate the upload
    toast({
      title: "Upload Started",
      description: `Uploading ${file.name}...`,
    });

    // Simulate upload progress
    setTimeout(() => {
      toast({
        title: "Upload Complete",
        description: "Video uploaded successfully",
      });
    }, 3000);
  };

  const totalVideos = videos.length;
  const uploadedVideos = videos.filter(v => v.type === "upload").length;
  const linkedVideos = videos.filter(v => v.type === "link").length;
  const totalViews = videos.reduce((sum, v) => sum + v.views, 0);
  const avgDuration = Math.round(videos.reduce((sum, v) => sum + v.duration, 0) / videos.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Video className="h-8 w-8" />
            Videos Management
          </h1>
          <p className="text-muted-foreground">Manage video content, streams, subjects, and chapters</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Video
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Video</DialogTitle>
              <DialogDescription>
                Add a new video by uploading a file or providing a link.
              </DialogDescription>
            </DialogHeader>
            
            <Tabs value={formData.type} onValueChange={(value) => setFormData({...formData, type: value as "upload" | "link"})}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload">Upload Video</TabsTrigger>
                <TabsTrigger value="link">Video Link</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="space-y-4">
                <div>
                  <Label htmlFor="video-upload">Select Video File</Label>
                  <Input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="mt-1"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="link" className="space-y-4">
                <div>
                  <Label htmlFor="video-url">Video URL</Label>
                  <Input
                    id="video-url"
                    value={formData.url}
                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="col-span-2">
                <Label htmlFor="title">Video Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter video title"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Video description"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="stream">Stream *</Label>
                <Select value={formData.stream} onValueChange={(value) => setFormData({...formData, stream: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stream" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border z-50">
                    {streams.map((stream) => (
                      <SelectItem key={stream} value={stream}>{stream}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border z-50">
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="chapter">Chapter *</Label>
                <Select value={formData.chapter} onValueChange={(value) => setFormData({...formData, chapter: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select chapter" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border z-50">
                    {chapters.map((chapter) => (
                      <SelectItem key={chapter} value={chapter}>{chapter}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  placeholder="Duration in minutes"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value as "active" | "draft" | "archived"})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border z-50">
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateVideo} className="gradient-primary text-white">
                Create Video
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{totalVideos}</p>
                <p className="text-sm text-muted-foreground">Total Videos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-success" />
              <div>
                <p className="text-2xl font-bold">{uploadedVideos}</p>
                <p className="text-sm text-muted-foreground">Uploaded</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Link className="h-5 w-5 text-accent" />
              <div>
                <p className="text-2xl font-bold">{linkedVideos}</p>
                <p className="text-sm text-muted-foreground">Linked</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-warning" />
              <div>
                <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-info" />
              <div>
                <p className="text-2xl font-bold">{avgDuration}min</p>
                <p className="text-sm text-muted-foreground">Avg Duration</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Videos List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Video Library</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={activeTab === "all" ? "default" : "outline"}
                onClick={() => setActiveTab("all")}
                size="sm"
              >
                All Videos ({videos.length})
              </Button>
              <Button
                variant={activeTab === "uploaded" ? "default" : "outline"}
                onClick={() => setActiveTab("uploaded")}
                size="sm"
              >
                Uploaded ({uploadedVideos})
              </Button>
              <Button
                variant={activeTab === "links" ? "default" : "outline"}
                onClick={() => setActiveTab("links")}
                size="sm"
              >
                Links ({linkedVideos})
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
                placeholder="Search videos by title, description, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={streamFilter} onValueChange={setStreamFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by stream" />
              </SelectTrigger>
              <SelectContent className="bg-background border z-50">
                <SelectItem value="all">All Streams</SelectItem>
                {streams.map((stream) => (
                  <SelectItem key={stream} value={stream}>{stream}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent className="bg-background border z-50">
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Videos Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Video</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Stream & Subject</TableHead>
                  <TableHead>Chapter</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVideos.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell>
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <Play className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{video.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {video.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={video.type === "upload" ? "default" : "secondary"}>
                        {video.type === "upload" ? (
                          <>
                            <Upload className="h-3 w-3 mr-1" />
                            Uploaded
                          </>
                        ) : (
                          <>
                            <Link className="h-3 w-3 mr-1" />
                            Link
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{video.stream}</p>
                        <p className="text-xs text-muted-foreground">{video.subject}</p>
                      </div>
                    </TableCell>
                    <TableCell>{video.chapter}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{video.duration}min</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{video.views.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          video.status === "active" ? "default" : 
                          video.status === "draft" ? "secondary" : 
                          "outline"
                        }
                      >
                        {video.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
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