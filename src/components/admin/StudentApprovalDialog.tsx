import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserCheck, UserX, Crown, Star, Zap } from "lucide-react";

interface PendingStudent {
  id: string;
  name: string;
  email: string;
  school: string;
  registrationDate: string;
}

interface StudentApprovalDialogProps {
  children: React.ReactNode;
  student: PendingStudent;
}

const subscriptionTiers = [
  {
    id: "1",
    name: "Basic",
    icon: Star,
    features: ["Access to practice quizzes", "Basic exam papers", "Progress tracking"],
    color: "text-blue-500"
  },
  {
    id: "2", 
    name: "Premium",
    icon: Crown,
    features: ["All Basic features", "Official exam papers", "Detailed solutions", "AI-powered explanations"],
    color: "text-purple-500"
  },
  {
    id: "3",
    name: "Elite",
    icon: Zap,
    features: ["All Premium features", "Priority support", "Custom study plans", "Advanced analytics", "Early access to new content"],
    color: "text-gold-500"
  }
];

export function StudentApprovalDialog({ children, student }: StudentApprovalDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>("");
  const [notes, setNotes] = useState("");

  const handleApprove = () => {
    if (!selectedTier) return;
    // Handle approval - connect to backend later
    console.log("Student approved:", student.id, "Tier:", selectedTier);
    setOpen(false);
  };

  const handleReject = () => {
    // Handle rejection - connect to backend later
    console.log("Student rejected:", student.id);
    setOpen(false);
  };

  const selectedTierInfo = subscriptionTiers.find(tier => tier.id === selectedTier);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Student Account Approval</DialogTitle>
          <DialogDescription>
            Review and approve the registration request from {student.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Student Info */}
          <div className="bg-muted/30 p-4 rounded-lg space-y-2">
            <h3 className="font-semibold text-lg">{student.name}</h3>
            <p className="text-muted-foreground">{student.email}</p>
            <p className="text-sm"><strong>School:</strong> {student.school}</p>
            <p className="text-sm"><strong>Registration Date:</strong> {new Date(student.registrationDate).toLocaleDateString()}</p>
          </div>

          {/* Subscription Tier Selection */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Select Subscription Tier</Label>
            <Select value={selectedTier} onValueChange={setSelectedTier}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a subscription tier" />
              </SelectTrigger>
              <SelectContent>
                {subscriptionTiers.map((tier) => {
                  const Icon = tier.icon;
                  return (
                    <SelectItem key={tier.id} value={tier.id}>
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${tier.color}`} />
                        <span>{tier.name}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            {/* Tier Features Preview */}
            {selectedTierInfo && (
              <div className="bg-background border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <selectedTierInfo.icon className={`h-5 w-5 ${selectedTierInfo.color}`} />
                  <h4 className="font-semibold">{selectedTierInfo.name} Features</h4>
                </div>
                <ul className="space-y-1">
                  {selectedTierInfo.features.map((feature, index) => (
                    <li key={index} className="text-sm flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Admin Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this approval..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleReject}
            >
              <UserX className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button 
              onClick={handleApprove}
              disabled={!selectedTier}
              className="gradient-primary text-white"
            >
              <UserCheck className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}