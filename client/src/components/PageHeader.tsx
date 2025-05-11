
"use client";

import { ArrowRight } from "lucide-react";

export default function PageHeader({
  title,
  currentPage,
}: {
  title: string;
  currentPage: string;
}) {
  return (
    <div
      className="relative py-16 px-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/placeholder.svg')",
      }}
    >
      <div className="container mx-auto text-center text-white relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
        <nav aria-label="Breadcrumb">
          <ol className="flex justify-center items-center space-x-2">
            <li>
              <a
                className="hover:text-primary transition-colors flex items-center"
                href="/"
              >
                <svg
                  className="lucide lucide-house h-4 w-4 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                Home
              </a>
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 mx-2 text-gray-300" />
              <span className="text-primary">{currentPage}</span>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
}
