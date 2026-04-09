import Link from 'next/link';
import { Lightbulb } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-background/75 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="shrink-0 flex items-center justify-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Lightbulb />
            </div>
            <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-500 hover:opacity-80 transition-opacity">
              AI Idea Validator
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/dashboard" 
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/"
              className="text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Submit Idea
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
