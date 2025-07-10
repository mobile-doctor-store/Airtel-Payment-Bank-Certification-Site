import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, CheckCircle } from "lucide-react";
import type { Question } from "@shared/schema";

interface QuestionCardProps {
  question: Question;
  showActions?: boolean;
  onEdit?: (question: Question) => void;
  onDelete?: (id: number) => void;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "regulatory":
      return "bg-blue-100 text-blue-800";
    case "services":
      return "bg-green-100 text-green-800";
    case "technical":
      return "bg-purple-100 text-purple-800";
    case "customer":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case "regulatory":
      return "Regulatory & Compliance";
    case "services":
      return "Services & Features";
    case "technical":
      return "Technical Operations";
    case "customer":
      return "Customer Service";
    default:
      return category;
  }
};

export default function QuestionCard({ question, showActions, onEdit, onDelete }: QuestionCardProps) {
  const options = [
    { key: "A", text: question.optionA },
    { key: "B", text: question.optionB },
    { key: "C", text: question.optionC },
    { key: "D", text: question.optionD },
  ];

  return (
    <Card className="question-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Badge className={getCategoryColor(question.category)}>
            {getCategoryLabel(question.category)}
          </Badge>
          {showActions && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit?.(question)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete?.(question.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          {question.text}
        </h4>
        
        <div className="space-y-3">
          {options.map((option) => (
            <div
              key={option.key}
              className={`border rounded-lg p-4 ${
                option.key === question.correctAnswer
                  ? "correct-answer"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-medium text-gray-700">
                  {option.key}) {option.text}
                </div>
                {option.key === question.correctAnswer && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm">Correct</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Explanation:</strong> {question.explanation}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
