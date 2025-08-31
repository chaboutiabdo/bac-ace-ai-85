import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, MessageCircle, Calendar, Phone, Star, Award } from "lucide-react";
import Navigation from "@/components/layout/Navigation";

interface Alumni {
  id: string;
  name: string;
  bacScore: number;
  university: string;
  field: string;
  avatar: string;
  advice: string;
  rating: number;
  graduationYear: number;
}

const mockAlumni: Alumni[] = [
  {
    id: "1",
    name: "Ahmed Benaissa",
    bacScore: 18.25,
    university: "USTHB",
    field: "Computer Science",
    avatar: "/placeholder.svg",
    advice: "Focus on understanding concepts rather than memorizing. Practice daily and don't be afraid to ask questions.",
    rating: 4.9,
    graduationYear: 2022
  },
  {
    id: "2",
    name: "Fatima Zerhouni",
    bacScore: 17.80,
    university: "University of Algiers",
    field: "Medicine",
    avatar: "/placeholder.svg", 
    advice: "Consistency is key. Create a study schedule and stick to it. Biology requires lots of practice with diagrams.",
    rating: 4.8,
    graduationYear: 2021
  },
  {
    id: "3",
    name: "Youcef Benchikh",
    bacScore: 16.95,
    university: "ENP",
    field: "Engineering",
    avatar: "/placeholder.svg",
    advice: "Math and Physics go hand in hand. Master the fundamentals before moving to complex problems.",
    rating: 4.7,
    graduationYear: 2020
  }
];

const Alumni = () => {
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    topic: "",
    timePreference: "",
    phone: "",
    message: ""
  });

  const handleBookMentoring = (alumni: Alumni) => {
    setSelectedAlumni(alumni);
    setShowBookingForm(true);
  };

  const handleSubmitBooking = () => {
    // TODO: Submit booking to backend
    console.log("Booking submitted:", { alumni: selectedAlumni, ...bookingData });
    setShowBookingForm(false);
    setBookingData({ topic: "", timePreference: "", phone: "", message: "" });
  };

  const getScoreColor = (score: number) => {
    if (score >= 18) return "text-success";
    if (score >= 16) return "text-warning";
    return "text-primary";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Alumni Mentorship
            </h1>
            <p className="text-muted-foreground text-lg">
              Learn from successful BAC graduates and get personalized guidance
            </p>
          </div>

          {!showBookingForm ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAlumni.map((alumni) => (
                <Card key={alumni.id} className="group hover:shadow-lg transition-all duration-300 border-primary/10">
                  <CardHeader className="text-center space-y-4">
                    <Avatar className="h-20 w-20 mx-auto">
                      <AvatarImage src={alumni.avatar} alt={alumni.name} />
                      <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-primary/20 to-accent/20">
                        {alumni.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <CardTitle className="text-xl">{alumni.name}</CardTitle>
                      <CardDescription className="flex items-center justify-center gap-1 mt-2">
                        <GraduationCap className="h-4 w-4" />
                        Class of {alumni.graduationYear}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">BAC Score:</span>
                        <Badge className={`${getScoreColor(alumni.bacScore)} font-bold`}>
                          <Award className="h-3 w-3 mr-1" />
                          {alumni.bacScore}/20
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-sm font-medium">University:</div>
                        <div className="text-sm text-muted-foreground">{alumni.university}</div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-sm font-medium">Field of Study:</div>
                        <div className="text-sm text-muted-foreground">{alumni.field}</div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-warning text-warning" />
                        <span className="text-sm font-medium">{alumni.rating}/5</span>
                        <span className="text-xs text-muted-foreground">(mentor rating)</span>
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="text-sm font-medium mb-2">Advice:</div>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {alumni.advice}
                      </p>
                    </div>

                    <Button 
                      onClick={() => handleBookMentoring(alumni)}
                      className="w-full"
                      variant="default"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Book Mentoring Session
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Book Mentoring Session with {selectedAlumni?.name}
                </CardTitle>
                <CardDescription>
                  Fill out the form below to schedule a mentoring session
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Discussion Topic</label>
                    <Select value={bookingData.topic} onValueChange={(value) => setBookingData({...bookingData, topic: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="study-strategies">Study Strategies</SelectItem>
                        <SelectItem value="exam-preparation">Exam Preparation</SelectItem>
                        <SelectItem value="university-choice">University Choice</SelectItem>
                        <SelectItem value="career-guidance">Career Guidance</SelectItem>
                        <SelectItem value="motivation">Motivation & Mindset</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Preferred Time</label>
                    <Select value={bookingData.timePreference} onValueChange={(value) => setBookingData({...bookingData, timePreference: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (9AM-12PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (2PM-5PM)</SelectItem>
                        <SelectItem value="evening">Evening (6PM-9PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </label>
                  <Input
                    placeholder="Your phone number for the session"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Additional Message (Optional)</label>
                  <Textarea
                    placeholder="Any specific questions or topics you'd like to discuss..."
                    value={bookingData.message}
                    onChange={(e) => setBookingData({...bookingData, message: e.target.value})}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmitBooking}
                    className="flex-1"
                    disabled={!bookingData.topic || !bookingData.timePreference || !bookingData.phone}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Submit Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Alumni;