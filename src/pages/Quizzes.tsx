import Navigation from "@/components/layout/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Clock, 
  Trophy, 
  Target, 
  PlayCircle,
  CheckCircle,
  Calendar,
  TrendingUp
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Quizzes = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`}>
      <Navigation />
      
      <div className="container py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{t("quizCenter")}</h1>
            <p className="text-muted-foreground">
              {t("quizCenterDescription")}
            </p>
          </div>

          {/* Daily Quiz Progress */}
          <Card className="gradient-card border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  {t("todaysQuiz")}
                </CardTitle>
                <Badge className="bg-accent text-accent-foreground">
                  {t("dailyChallenge")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t("overallProgress")}</span>
                    <span className="font-medium">12/20</span>
                  </div>
                  <Progress value={60} className="h-3" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t("mathQuestions")}</span>
                    <span className="font-medium">6/10</span>
                  </div>
                  <Progress value={60} className="h-3" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t("physicsQuestions")}</span>
                    <span className="font-medium">6/10</span>
                  </div>
                  <Progress value={60} className="h-3" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>8 {t("questionsRemaining")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    <span>{t("maxPoints")}</span>
                  </div>
                </div>
                <Button variant="hero" size="lg">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  {t("continueQuiz")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Categories */}
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="daily">{t("dailyQuizzes")}</TabsTrigger>
              <TabsTrigger value="practice">{t("practiceQuizzes")}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Today's Quiz */}
                <Card className="gradient-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{t("today")} - March 15</CardTitle>
                      <Badge className="bg-primary-light text-primary">{t("current")}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{t("progress")}</span>
                        <span>12/20</span>
                      </div>
                      <Progress value={60} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{t("currentScore")}: 48/100</span>
                      <Button size="sm">{t("continue")}</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Yesterday's Quiz */}
                <Card className="gradient-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{t("yesterday")} - March 14</CardTitle>
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{t("completed")}</span>
                        <span>20/20</span>
                      </div>
                      <Progress value={100} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-success-light text-success">
                        {t("score")}: 84/100
                      </Badge>
                      <Button size="sm" variant="outline">{t("review")}</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Day Before */}
                <Card className="gradient-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">March 13</CardTitle>
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{t("completed")}</span>
                        <span>20/20</span>
                      </div>
                      <Progress value={100} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-success-light text-success">
                        {t("score")}: 76/100
                      </Badge>
                      <Button size="sm" variant="outline">{t("review")}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Weekly Stats */}
              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-secondary" />
                    {t("weeklyPerformance")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center space-y-1">
                      <p className="text-2xl font-bold text-primary">6/7</p>
                      <p className="text-sm text-muted-foreground">{t("quizzesCompleted")}</p>
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-2xl font-bold text-secondary">82%</p>
                      <p className="text-sm text-muted-foreground">{t("averageScore")}</p>
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-2xl font-bold text-accent">+420</p>
                      <p className="text-sm text-muted-foreground">{t("weeklyPointsEarned")}</p>
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-2xl font-bold text-warning">12</p>
                      <p className="text-sm text-muted-foreground">{t("dayStreak")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="practice" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Subject-based Quizzes */}
                <Card className="gradient-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{t("mathematics")}</CardTitle>
                    <p className="text-sm text-muted-foreground">{t("limitsAndContinuity")}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>25 {t("questions")}</span>
                      <Badge variant="outline">{t("medium")}</Badge>
                    </div>
                    <Button className="w-full">
                      <Brain className="mr-2 h-4 w-4" />
                      {t("startQuiz")}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="gradient-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{t("physics")}</CardTitle>
                    <p className="text-sm text-muted-foreground">{t("mechanics")}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>20 {t("questions")}</span>
                      <Badge variant="outline">{t("easy")}</Badge>
                    </div>
                    <Button className="w-full">
                      <Brain className="mr-2 h-4 w-4" />
                      {t("startQuiz")}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="gradient-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{t("mixedReview")}</CardTitle>
                    <p className="text-sm text-muted-foreground">{t("practiceAllSubjects")}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>30 {t("questions")}</span>
                      <Badge variant="outline">{t("hard")}</Badge>
                    </div>
                    <Button className="w-full">
                      <Brain className="mr-2 h-4 w-4" />
                      {t("startQuiz")}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Quizzes;