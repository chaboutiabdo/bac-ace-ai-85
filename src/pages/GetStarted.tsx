import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, BookOpen, Target, Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";

const GetStarted = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const onboardingSteps = [
    {
      title: "Follow national school curriculum",
      description: "All PANDAI contents are perfectly aligned with KSSR & KSSM standards. So you can use PANDAI to complement what you learn in school.",
      illustration: "🎯",
      features: ["Aligned with Algerian BAC curriculum", "Updated content for 2024", "All subjects covered"]
    },
    {
      title: "AI-Powered Learning",
      description: "Get personalized study plans, instant feedback, and smart recommendations based on your learning progress.",
      illustration: "🤖",
      features: ["Personalized study paths", "Instant feedback", "Progress tracking"]
    },
    {
      title: "Practice with Real Exams",
      description: "Access hundreds of past BAC papers with detailed solutions. Practice makes perfect!",
      illustration: "📚",
      features: ["500+ past papers", "Detailed solutions", "Timed practice tests"]
    },
    {
      title: "Join the Community",
      description: "Connect with thousands of students preparing for BAC. Share knowledge and motivate each other.",
      illustration: "👥",
      features: ["Student community", "Study groups", "Peer support"]
    }
  ];

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Character Illustration */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-white/20 rounded-full backdrop-blur-sm mb-4 animate-bounce-subtle">
            <div className="text-6xl">{currentStepData.illustration}</div>
          </div>
          
          {/* Progress dots */}
          <div className="flex justify-center space-x-2 mb-6">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content Card */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {currentStepData.title}
            </h2>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {currentStepData.description}
            </p>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {currentStepData.features.map((feature, index) => (
                <div key={index} className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>

              {currentStep === onboardingSteps.length - 1 ? (
                <Link to="/dashboard">
                  <Button className="gradient-secondary text-white px-8">
                    Get Started
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={nextStep}
                  className="gradient-secondary text-white flex items-center space-x-2 px-8"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8 text-center text-white">
          <div className="space-y-1">
            <div className="flex items-center justify-center">
              <Users className="h-4 w-4 mr-1" />
            </div>
            <div className="text-lg font-bold">10K+</div>
            <div className="text-xs opacity-80">Students</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center">
              <BookOpen className="h-4 w-4 mr-1" />
            </div>
            <div className="text-lg font-bold">500+</div>
            <div className="text-xs opacity-80">Past Papers</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center">
              <Trophy className="h-4 w-4 mr-1" />
            </div>
            <div className="text-lg font-bold">98%</div>
            <div className="text-xs opacity-80">Success Rate</div>
          </div>
        </div>

        {/* Skip option */}
        <div className="text-center mt-6">
          <Link 
            to="/dashboard" 
            className="text-white/80 hover:text-white text-sm underline"
          >
            Skip for now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;