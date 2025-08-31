import Navigation from "@/components/layout/Navigation";
import StatsCard from "@/components/dashboard/StatsCard";
import Leaderboard from "@/components/dashboard/Leaderboard";
import QuickActions from "@/components/dashboard/QuickActions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  FileText, 
  PlayCircle, 
  Trophy, 
  Target,
  TrendingUp,
  BookOpen,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`}>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="container relative py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <div className="space-y-4">
                <Badge className="bg-primary-light text-primary border-primary/20">
                  {t("madeForAlgerianStudents")}
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  {t("aceYourBacExam")}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                  {t("heroDescription")}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="hero">
                  <Brain className="mr-2 h-5 w-5" />
                  {t("startDailyQuiz")}
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/videos">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    {t("watchVideos")}
                  </Link>
                </Button>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{t("studentsCount")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>{t("pastExams")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  <span>{t("successRate")}</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 gradient-hero rounded-2xl opacity-20 blur-3xl"></div>
              <img
                src={heroImage}
                alt="AI-powered BAC learning platform"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="container py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title={t("totalScore")}
            value="1,250"
            subtitle={t("pointsEarned")}
            icon={Trophy}
            variant="accent"
            trend={{ value: `+125 ${t("thisWeek")}`, isPositive: true }}
          />
          <StatsCard
            title={t("quizzesCompleted")}
            value="47"
            subtitle={t("dailyAndPractice")}
            icon={Brain}
            variant="default"
            trend={{ value: `+5 ${t("thisWeek")}`, isPositive: true }}
          />
          <StatsCard
            title={t("examsSolved")}
            value="23"
            subtitle={t("pastBacPapers")}
            icon={FileText}
            variant="success"
          />
          <StatsCard
            title={t("studyStreak")}
            value="12"
            subtitle={t("daysInARow")}
            icon={Target}
            variant="warning"
          />
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="container pb-12">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <QuickActions />
          </div>
          <div>
            <Leaderboard />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
