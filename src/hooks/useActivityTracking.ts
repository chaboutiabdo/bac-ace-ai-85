import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useActivityTracking = () => {
  const { user } = useAuth();

  const trackQuizQuestion = async (
    quizAttemptId: string,
    questionId: string,
    questionText: string,
    studentAnswer: string,
    correctAnswer: string,
    isCorrect: boolean,
    timeSpent?: number
  ) => {
    if (!user) return;

    try {
      await supabase.from("quiz_question_results").insert({
        student_id: user.id,
        quiz_attempt_id: quizAttemptId,
        question_id: questionId,
        question_text: questionText,
        student_answer: studentAnswer,
        correct_answer: correctAnswer,
        is_correct: isCorrect,
        time_spent: timeSpent,
      });
    } catch (error) {
      console.error("Error tracking quiz question:", error);
    }
  };

  const trackVideoActivity = async (
    videoId: string,
    action: "started" | "paused" | "resumed" | "completed",
    videoTitle: string,
    subject: string,
    chapter?: string,
    position?: number,
    sessionId?: string
  ) => {
    if (!user) return;

    try {
      await supabase.from("video_activity_logs").insert({
        student_id: user.id,
        video_id: videoId,
        action,
        video_title: videoTitle,
        subject,
        chapter,
        position,
        session_id: sessionId,
      });

      // If video completed, track video progress for scoring
      if (action === "completed") {
        await supabase.from("video_progress").upsert({
          student_id: user.id,
          video_id: videoId,
          watched: true,
          completed_at: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error("Error tracking video activity:", error);
    }
  };

  const trackExamActivity = async (
    examId: string,
    action: "viewed" | "downloaded" | "started_solving" | "completed",
    examTitle: string,
    subject: string,
    year: number,
    stream: string,
    difficulty?: string
  ) => {
    if (!user) return;

    try {
      await supabase.from("exam_activity_logs").insert({
        student_id: user.id,
        exam_id: examId,
        action,
        exam_title: examTitle,
        subject,
        year,
        stream,
        difficulty,
      });
    } catch (error) {
      console.error("Error tracking exam activity:", error);
    }
  };

  const trackStudentQuestion = async (
    questionText: string,
    topic?: string,
    subject?: string,
    contextType?: "quiz" | "video" | "exam" | "general",
    contextId?: string,
    aiResponse?: string
  ) => {
    if (!user) return;

    try {
      const { data, error } = await supabase.from("student_questions_log").insert({
        student_id: user.id,
        question_text: questionText,
        topic,
        subject,
        context_type: contextType,
        context_id: contextId,
        ai_response: aiResponse,
      }).select().single();

      return data;
    } catch (error) {
      console.error("Error tracking student question:", error);
      return null;
    }
  };

  const updateQuestionSatisfaction = async (
    questionId: string,
    satisfactionRating: number
  ) => {
    if (!user) return;

    try {
      await supabase
        .from("student_questions_log")
        .update({ satisfaction_rating: satisfactionRating })
        .eq("id", questionId)
        .eq("student_id", user.id);
    } catch (error) {
      console.error("Error updating question satisfaction:", error);
    }
  };

  return {
    trackQuizQuestion,
    trackVideoActivity,
    trackExamActivity,
    trackStudentQuestion,
    updateQuestionSatisfaction,
  };
};