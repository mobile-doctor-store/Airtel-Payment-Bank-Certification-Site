import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, X } from "lucide-react";

interface SearchFilterProps {
  onSearch: (term: string) => void;
  onFilter: (category: string) => void;
  onClear: () => void;
  totalQuestions: number;
  filteredCount: number;
}

export default function SearchFilter({
  onSearch,
  onFilter,
  onClear,
  totalQuestions,
  filteredCount
}: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilter = (value: string) => {
    setSelectedCategory(value);
    onFilter(value === "all" ? "" : value);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    onClear();
  };

  return (
    <Card className="search-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search questions by keyword..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={handleFilter}>
              <SelectTrigger className="w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="regulatory">Regulatory & Compliance</SelectItem>
                <SelectItem value="services">Services & Features</SelectItem>
                <SelectItem value="technical">Technical Operations</SelectItem>
                <SelectItem value="customer">Customer Service</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={!searchTerm && !selectedCategory}
            >
              <X className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>
        {(searchTerm || selectedCategory) && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredCount} of {totalQuestions} questions
          </div>
        )}
      </CardContent>
    </Card>
  );
}
