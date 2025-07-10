import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, TrendingUp, Users, Calendar } from "lucide-react";
import SearchFilter from "@/components/search-filter";
import QuestionCard from "@/components/question-card";
import type { Question } from "@shared/schema";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: questions = [], isLoading } = useQuery<Question[]>({
    queryKey: ["/api/questions"],
  });

  const filteredQuestions = useMemo(() => {
    let filtered = questions;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (q) =>
          q.text.toLowerCase().includes(term) ||
          q.explanation.toLowerCase().includes(term) ||
          q.optionA.toLowerCase().includes(term) ||
          q.optionB.toLowerCase().includes(term) ||
          q.optionC.toLowerCase().includes(term) ||
          q.optionD.toLowerCase().includes(term)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((q) => q.category === selectedCategory);
    }

    return filtered;
  }, [questions, searchTerm, selectedCategory]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilter = (category: string) => {
    setSelectedCategory(category);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };

  const categoryStats = useMemo(() => {
    const stats = questions.reduce((acc, q) => {
      acc[q.category] = (acc[q.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return stats;
  }, [questions]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Airtel Payment Bank Certification 2025
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Latest questions and answers for Airtel Payment Bank certification exam.
          Practice with real exam scenarios and pass your certification with confidence.
        </p>
      </div>

      {/* Search and Filter */}
      <SearchFilter
        onSearch={handleSearch}
        onFilter={handleFilter}
        onClear={handleClear}
        totalQuestions={questions.length}
        filteredCount={filteredQuestions.length}
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-shadow">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{questions.length}</div>
            <div className="text-gray-600">Total Questions</div>
          </CardContent>
        </Card>
        <Card className="card-shadow">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">
              {Object.keys(categoryStats).length}
            </div>
            <div className="text-gray-600">Categories</div>
          </CardContent>
        </Card>
        <Card className="card-shadow">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-secondary mb-2">2025</div>
            <div className="text-gray-600">Latest Updates</div>
          </CardContent>
        </Card>
        <Card className="card-shadow">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-gray-600">Success Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Key Information Card */}
      <Card className="card-shadow">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Info className="text-primary mr-2" />
            About Airtel Payment Bank
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Headquarters
                </Badge>
                <span className="text-gray-700">New Delhi</span>
              </div>
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  <Calendar className="w-3 h-3 mr-1" />
                  Launched
                </Badge>
                <span className="text-gray-700">March 2017</span>
              </div>
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  <Users className="w-3 h-3 mr-1" />
                  Parent Company
                </Badge>
                <span className="text-gray-700">Bharti Airtel</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  Account Limit
                </Badge>
                <span className="text-gray-700">₹2,00,000 per customer</span>
              </div>
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  Minimum Balance
                </Badge>
                <span className="text-gray-700">Zero</span>
              </div>
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  Services
                </Badge>
                <span className="text-gray-700">Digital Banking, Bill Payments</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Practice Questions ({filteredQuestions.length})
        </h2>
        
        {filteredQuestions.length === 0 ? (
          <Card className="card-shadow">
            <CardContent className="p-8 text-center">
              <div className="text-gray-500">
                {searchTerm || selectedCategory
                  ? "No questions found matching your criteria."
                  : "No questions available at the moment."}
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredQuestions.map((question, index) => (
            <div key={question.id} className="relative">
              <div className="absolute -left-4 top-4 text-sm text-gray-400 font-medium">
                {index + 1}
              </div>
              <QuestionCard question={question} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
