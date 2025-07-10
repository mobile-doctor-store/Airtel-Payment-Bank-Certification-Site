import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertQuestionSchema, type InsertQuestion } from "@shared/schema";
import { Plus } from "lucide-react";

interface AdminFormProps {
  editQuestion?: InsertQuestion & { id: number };
  onSuccess?: () => void;
}

export default function AdminForm({ editQuestion, onSuccess }: AdminFormProps) {
  const [correctAnswer, setCorrectAnswer] = useState(editQuestion?.correctAnswer || "");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<InsertQuestion>({
    resolver: zodResolver(insertQuestionSchema),
    defaultValues: editQuestion || {
      text: "",
      category: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "",
      explanation: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertQuestion) => {
      const response = await apiRequest("POST", "/api/questions", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/questions"] });
      toast({
        title: "Success",
        description: "Question added successfully!",
      });
      reset();
      setCorrectAnswer("");
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add question. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: InsertQuestion) => {
      const response = await apiRequest("PUT", `/api/questions/${editQuestion?.id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/questions"] });
      toast({
        title: "Success",
        description: "Question updated successfully!",
      });
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update question. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertQuestion) => {
    const formData = { ...data, correctAnswer };
    if (editQuestion) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleCorrectAnswerChange = (value: string) => {
    setCorrectAnswer(value);
    setValue("correctAnswer", value);
  };

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          {editQuestion ? "Edit Question" : "Add New Question"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Question Text */}
          <div className="space-y-2">
            <Label htmlFor="text">Question Text</Label>
            <Textarea
              id="text"
              {...register("text")}
              placeholder="Enter the question text..."
              rows={3}
            />
            {errors.text && (
              <p className="text-sm text-red-600">{errors.text.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setValue("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regulatory">Regulatory & Compliance</SelectItem>
                <SelectItem value="services">Services & Features</SelectItem>
                <SelectItem value="technical">Technical Operations</SelectItem>
                <SelectItem value="customer">Customer Service</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          {/* Answer Options */}
          <div className="space-y-4">
            <Label>Answer Options</Label>
            <RadioGroup value={correctAnswer} onValueChange={handleCorrectAnswerChange}>
              {["A", "B", "C", "D"].map((option) => (
                <div key={option} className="flex items-center space-x-3">
                  <RadioGroupItem value={option} id={`correct${option}`} />
                  <Label htmlFor={`correct${option}`} className="text-sm w-16">
                    Correct
                  </Label>
                  <Input
                    {...register(`option${option}` as keyof InsertQuestion)}
                    placeholder={`Option ${option}`}
                    className="flex-1"
                  />
                </div>
              ))}
            </RadioGroup>
            {errors.correctAnswer && (
              <p className="text-sm text-red-600">{errors.correctAnswer.message}</p>
            )}
          </div>

          {/* Explanation */}
          <div className="space-y-2">
            <Label htmlFor="explanation">Explanation</Label>
            <Textarea
              id="explanation"
              {...register("explanation")}
              placeholder="Enter explanation for the correct answer..."
              rows={3}
            />
            {errors.explanation && (
              <p className="text-sm text-red-600">{errors.explanation.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {createMutation.isPending || updateMutation.isPending
              ? "Saving..."
              : editQuestion
              ? "Update Question"
              : "Add Question"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
