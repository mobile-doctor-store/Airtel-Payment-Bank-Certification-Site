import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Building2, Home, BookOpen, Shield } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="gradient-bg shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mr-3">
                  <Building2 className="text-white w-6 h-6" />
                </div>
                <h1 className="text-white text-xl font-bold">
                  Airtel Payment Bank Certification
                </h1>
              </div>
            </div>
            <nav className="hidden md:flex space-x-2">
              <Link href="/">
                <Button
                  variant={location === "/" ? "secondary" : "ghost"}
                  className="text-white hover:bg-white/20"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/quiz">
                <Button
                  variant={location === "/quiz" ? "secondary" : "ghost"}
                  className="text-white hover:bg-white/20"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Practice Quiz
                </Button>
              </Link>
              <Link href="/admin">
                <Button
                  variant={location === "/admin" ? "secondary" : "ghost"}
                  className="text-white hover:bg-white/20"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Admin Panel
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Airtel Payment Bank Certification
              </h3>
              <p className="text-gray-400">
                Latest questions and answers for successful certification.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/quiz" className="hover:text-white">
                    Practice Quiz
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white">
                    Study Materials
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white">
                    Exam Tips
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Banking Regulations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Payment Bank Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">
                For questions and support, contact our team.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Airtel Payment Bank Certification. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
