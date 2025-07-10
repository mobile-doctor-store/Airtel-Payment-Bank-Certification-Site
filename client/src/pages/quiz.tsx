import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import QuizTimer from "@/components/quiz-timer";
import type { Question } from "@shared/schema";
import { BookOpen, CheckCircle, XCircle, RotateCcw } from "lucide-react";

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const { data: allQuestions = [], isLoading } = useQuery<Question[]>({
    queryKey: ["/api/questions"],
  });

  // Select 10 random questions for the quiz
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (allQuestions.length > 0 && !quizStarted) {
      const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
      setQuizQuestions(shuffled.slice(0, Math.min(10, shuffled.length)));
    }
  }, [allQuestions, quizStarted]);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;

  const handleAnswerChange = (value: string) => {
    setCurrentAnswer(value);
  };

  const handleNext = () => {
    if (currentAnswer) {
      setSelectedAnswers(prev => ({
        ...prev,
        [currentQuestionIndex]: currentAnswer
      }));
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentAnswer(selectedAnswers[currentQuestionIndex + 1] || "");
    } else {
      finishQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setCurrentAnswer(selectedAnswers[currentQuestionIndex - 1] || "");
    }
  };

  const finishQuiz = () => {
    const finalAnswers = { ...selectedAnswers };
    if (currentAnswer) {
      finalAnswers[currentQuestionIndex] = currentAnswer;
    }
    setSelectedAnswers(finalAnswers);
    setIsQuizCompleted(true);
    setShowResults(true);
  };

  const handleTimeUp = () => {
    finishQuiz();
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setCurrentAnswer("");
    setIsQuizCompleted(false);
    setShowResults(false);
    setQuizStarted(false);
    
    // Shuffle questions again
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setQuizQuestions(shuffled.slice(0, Math.min(10, shuffled.length)));
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (allQuestions.length === 0) {
    return (
      <div className="text-center py-16">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Questions Available</h2>
        <p className="text-gray-600">
          Please add some questions through the admin panel to start the quiz.
        </p>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Practice Quiz Mode
          </h1>
          <p className="text-lg text-gray-600">
            Test your knowledge with {Math.min(10, allQuestions.length)} randomly selected questions
          </p>
        </div>

        <Card className="card-shadow">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="text-center">
                <BookOpen className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Quiz Instructions</h2>
                <ul className="text-left text-gray-600 space-y-2">
                  <li>• You have 10 minutes to complete the quiz</li>
                  <li>• Select the best answer for each question</li>
                  <li>• You can navigate back and forth between questions</li>
                  <li>• Your score will be shown at the end</li>
                </ul>
              </div>
              
              <Button onClick={startQuiz} size="lg" className="w-full">
                Start Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Quiz Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Practice Quiz</h1>
        <p className="text-lg text-gray-600">
          Test your knowledge with timed questions
        </p>
      </div>

      {/* Quiz Timer */}
      <QuizTimer
        totalQuestions={totalQuestions}
        currentQuestion={currentQuestionIndex + 1}
        score={calculateScore()}
        onTimeUp={handleTimeUp}
      />

      {/* Quiz Question */}
      {currentQuestion && (
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-blue-100 text-blue-800">
                  {currentQuestion.category}
                </Badge>
                <span className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900">
                {currentQuestion.text}
              </h3>
              
              <RadioGroup value={currentAnswer} onValueChange={handleAnswerChange}>
                <div className="space-y-3">
                  {[
                    { key: "A", text: currentQuestion.optionA },
                    { key: "B", text: currentQuestion.optionB },
                    { key: "C", text: currentQuestion.optionC },
                    { key: "D", text: currentQuestion.optionD },
                  ].map((option) => (
                    <div key={option.key} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.key} id={option.key} />
                      <Label htmlFor={option.key} className="flex-1 cursor-pointer">
                        {option.key}) {option.text}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quiz Controls */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <div className="flex gap-3">
          <Button variant="destructive" onClick={finishQuiz}>
            Submit Quiz
          </Button>
          <Button onClick={handleNext} disabled={!currentAnswer}>
            {currentQuestionIndex === totalQuestions - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>

      {/* Results Dialog */}
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Quiz Results</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {calculateScore()}/{totalQuestions}
              </div>
              <div className="text-lg text-gray-600">
                Score: {Math.round((calculateScore() / totalQuestions) * 100)}%
              </div>
            </div>

            <div className="space-y-4">
              {quizQuestions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mt-1" />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">
                          {index + 1}. {question.text}
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div className="text-gray-600">
                            Your answer: <strong>{userAnswer || "Not answered"}</strong>
                          </div>
                          <div className="text-green-600">
                            Correct answer: <strong>{question.correctAnswer}</strong>
                          </div>
                          {!isCorrect && (
                            <div className="text-blue-600 mt-2">
                              <strong>Explanation:</strong> {question.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center">
              <Button onClick={resetQuiz} className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Take Quiz Again
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
