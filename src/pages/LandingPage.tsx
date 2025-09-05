import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BookOpen, 
  Brain, 
  Trophy, 
  Users, 
  Star,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  GraduationCap
} from "lucide-react";
import { Link } from "react-router-dom";
import { Suspense, lazy } from "react";

const LandingPage = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold">EduLearn</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('home')} className="hover:text-purple-400 transition-colors">Home</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-purple-400 transition-colors">About</button>
              <button onClick={() => scrollToSection('features')} className="hover:text-purple-400 transition-colors">Features</button>
              <button onClick={() => scrollToSection('testimonials')} className="hover:text-purple-400 transition-colors">Testimonials</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-purple-400 transition-colors">Contact</button>
            </div>
            <Link to="/login">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  01
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  JOIN US TO BE THE UNIQUE
                  AND CREATIVE <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">BAC STUDENT</span>
                </h1>
                <p className="text-lg text-gray-300 max-w-lg">
                  Master your BAC preparation with AI-powered learning, comprehensive exam solutions, and personalized study paths that adapt to your unique learning style.
                </p>
              </div>
              <div className="flex gap-4">
                <Link to="/login">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-8">
                    START LEARNING
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>1000+ Practice Questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>AI-Powered Learning</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 flex items-center justify-center">
                <div className="w-80 h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <GraduationCap className="h-32 w-32 text-primary" />
                </div>
              </div>
              <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2">
                <Card className="bg-purple-500/20 border-purple-500/30 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <Trophy className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold">A+ Grade</div>
                        <div className="text-sm text-gray-300">95% Success Rate</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              About Us
            </Badge>
            <h2 className="text-4xl font-bold">
              Revolutionizing <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">BAC Education</span>
            </h2>
            <p className="text-lg text-gray-300">
              We're dedicated to empowering Algerian students with cutting-edge technology and comprehensive resources to excel in their BAC examinations. Our platform combines AI-driven personalized learning with extensive past exam databases.
            </p>
            <div className="grid md:grid-cols-3 gap-8 pt-8">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">AI-Powered Learning</h3>
                <p className="text-gray-400">Personalized study paths that adapt to your learning style</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Comprehensive Resources</h3>
                <p className="text-gray-400">Complete collection of past BAC exams and solutions</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Expert Mentorship</h3>
                <p className="text-gray-400">Connect with successful alumni for guidance and support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              Features
            </Badge>
            <h2 className="text-4xl font-bold">
              Everything You Need to <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Succeed</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold">AI Study Assistant</h3>
                <p className="text-sm text-gray-400">Get instant help and explanations for any question</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold">Past Exams Database</h3>
                <p className="text-sm text-gray-400">Access 10+ years of BAC exams with solutions</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold">Progress Tracking</h3>
                <p className="text-sm text-gray-400">Monitor your improvement with detailed analytics</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold">Alumni Network</h3>
                <p className="text-sm text-gray-400">Connect with successful graduates for mentorship</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              Success Stories
            </Badge>
            <h2 className="text-4xl font-bold">
              What Our <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Students Say</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300">"EduLearn helped me achieve 18.5/20 in my BAC. The AI explanations made complex topics so much easier to understand!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Amina Benali</div>
                    <div className="text-sm text-gray-400">Sciences Stream, 2023</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300">"The past exam database was incredibly helpful. I practiced with real BAC questions and felt confident on exam day."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Youcef Mansouri</div>
                    <div className="text-sm text-gray-400">Math Stream, 2023</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300">"Connecting with alumni through the platform gave me valuable insights about university life and career choices."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Fatima Zohra</div>
                    <div className="text-sm text-gray-400">Letters Stream, 2023</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              Get In Touch
            </Badge>
            <h2 className="text-4xl font-bold">
              Ready to Start Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Success Journey?</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-gray-400">support@edulearn.dz</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-gray-400">+213 555 123 456</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-gray-400">Algiers, Algeria</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Ready to Excel in Your BAC?</h3>
              <p className="text-gray-300">
                Join thousands of students who have already transformed their BAC preparation with our AI-powered platform.
              </p>
              <Link to="/login">
                <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
                  Get Started Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10 bg-black/20">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-purple-400" />
              <span className="font-bold">EduLearn</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2024 EduLearn. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;