import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  avatar?: string;
  rank: number;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { id: "1", name: "Fatima Zahra", score: 2150, rank: 1 },
  { id: "2", name: "Mohamed Amine", score: 1980, rank: 2 },
  { id: "3", name: "Yasmine Boudjema", score: 1875, rank: 3 },
  { id: "4", name: "Ahmed Benali", score: 1720, rank: 4 },
  { id: "5", name: "Rania Mokrani", score: 1650, rank: 5 },
];

const Leaderboard = () => {
  const { t, isRTL } = useLanguage();
  
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-warning" />;
      case 2:
        return <Medal className="h-5 w-5 text-muted-foreground" />;
      case 3:
        return <Award className="h-5 w-5 text-accent" />;
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeVariant = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-warning text-warning-foreground";
      case 2:
        return "bg-muted text-muted-foreground";
      case 3:
        return "bg-accent text-accent-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Card className={`gradient-card ${isRTL ? 'rtl' : 'ltr'}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-warning" />
          {t("topStudents")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockLeaderboard.map((student) => (
          <div
            key={student.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8">
                {getRankIcon(student.rank)}
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback className="text-xs">
                  {student.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{student.name}</p>
              </div>
            </div>
            <Badge 
              className={`${getRankBadgeVariant(student.rank)} font-semibold`}
            >
              {student.score.toLocaleString()} {t("pts")}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;