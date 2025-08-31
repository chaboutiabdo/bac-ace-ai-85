import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Play, CheckCircle, Crown, Youtube } from "lucide-react";
import Navigation from "@/components/layout/Navigation";

interface Video {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  type: "youtube" | "premium";
  thumbnail: string;
  duration: string;
  watched: boolean;
}

const mockVideos: Video[] = [
  {
    id: "1",
    title: "Introduction to Limits",
    subject: "Math",
    chapter: "Limits",
    type: "youtube",
    thumbnail: "/placeholder.svg",
    duration: "15:30",
    watched: true
  },
  {
    id: "2",
    title: "Advanced Limit Techniques",
    subject: "Math", 
    chapter: "Limits",
    type: "premium",
    thumbnail: "/placeholder.svg",
    duration: "22:45",
    watched: false
  },
  {
    id: "3",
    title: "Newton's Laws Explained",
    subject: "Physics",
    chapter: "Mechanics",
    type: "youtube",
    thumbnail: "/placeholder.svg",
    duration: "18:20",
    watched: false
  },
  {
    id: "4",
    title: "Problem Solving in Mechanics",
    subject: "Physics",
    chapter: "Mechanics", 
    type: "premium",
    thumbnail: "/placeholder.svg",
    duration: "28:15",
    watched: true
  }
];

const Videos = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  const filteredVideos = mockVideos.filter(video => {
    return (!selectedSubject || selectedSubject === "all" || video.subject === selectedSubject) &&
           (!selectedChapter || selectedChapter === "all" || video.chapter === selectedChapter) &&
           (!selectedType || selectedType === "all" || video.type === selectedType);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Educational Videos
            </h1>
            <p className="text-muted-foreground text-lg">
              Learn from structured video content and expert explanations
            </p>
          </div>

          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5 text-primary" />
                Filter Videos
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              <Select value={selectedChapter} onValueChange={setSelectedChapter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Chapter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Chapters</SelectItem>
                  <SelectItem value="Limits">Limits</SelectItem>
                  <SelectItem value="Mechanics">Mechanics</SelectItem>
                  <SelectItem value="Derivatives">Derivatives</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Video Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="youtube">Free (YouTube)</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="group hover:shadow-lg transition-all duration-300 border-primary/10 overflow-hidden">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute top-2 right-2">
                    {video.type === "premium" ? (
                      <Badge variant="default" className="gap-1 bg-gradient-to-r from-warning to-accent text-white">
                        <Crown className="h-3 w-3" />
                        Premium
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-background/80 gap-1">
                        <Youtube className="h-3 w-3" />
                        Free
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      {video.duration}
                    </Badge>
                  </div>
                  {video.watched && (
                    <div className="absolute top-2 left-2">
                      <CheckCircle className="h-6 w-6 text-success bg-background rounded-full" />
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                  <CardDescription>
                    {video.subject} • {video.chapter}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <Button 
                    className={`w-full ${video.type === "premium" ? "bg-gradient-to-r from-warning to-accent text-white" : ""}`}
                    variant="default"
                    disabled={video.type === "premium" && false} // TODO: Check user premium status
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {video.watched ? "Watch Again" : "Watch Video"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Videos;