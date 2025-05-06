
import { ChevronRight, Home } from "lucide-react";
import { Link } from "wouter";

interface PageHeaderProps {
  title: string;
  currentPage: string;
  backgroundImage?: string;
}

export function PageHeader({ title, currentPage, backgroundImage = "/placeholder.svg" }: PageHeaderProps) {
  return (
    <div 
      className="relative py-16 px-4 bg-cover bg-center bg-no-repeat" 
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${backgroundImage}")` 
      }}
    >
      <div className="container mx-auto text-center text-white z-10 relative">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
        <nav aria-label="Breadcrumb">
          <ol className="flex justify-center items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-primary transition-colors flex items-center">
                <Home className="h-4 w-4 mr-1" />
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-2 text-gray-300" />
              <span className="text-primary">{currentPage}</span>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
}
