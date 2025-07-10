import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, Award } from "lucide-react";

interface QuizTimerProps {
  totalQuestions: number;
  currentQuestion: number;
  score: number;
  onTimeUp: () => void;
  duration?: number; // in seconds
}

export default function QuizTimer({
  totalQuestions,
  currentQuestion,
  score,
  onTimeUp,
  duration = 600, // 10 minutes default
}: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const progress = ((currentQuestion - 1) / totalQuestions) * 100;

  return (
    <Card className="card-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Quiz Progress</h3>
          <div className="text-sm text-gray-500">
            Question {currentQuestion} of {totalQuestions}
          </div>
        </div>
        
        <Progress value={progress} className="mb-4" />
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            Time: <span className="font-mono font-bold ml-1">{formatTime(timeLeft)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Award className="w-4 h-4 mr-1" />
            Score: <span className="font-bold ml-1">{score}</span>/{totalQuestions}
          </div>
        </div>
        
        {timeLeft <= 60 && (
          <div className="mt-2 text-sm text-red-600 font-medium">
            ⚠️ Less than 1 minute remaining!
          </div>
        )}
      </CardContent>
    </Card>
  );
}
