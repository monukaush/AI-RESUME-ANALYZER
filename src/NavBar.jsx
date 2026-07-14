import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

function NavBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link className="flex items-center gap-2 hover:opacity-90 transition-opacity" to="/">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">ResumeAI</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link className="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors" to="/">Home</Link>
          <Link className="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors" to="/Feature">Features</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link className="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors px-3 py-2" to="/Login">
            Sign In
          </Link>
          <Link className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm" to="/Register">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default NavBar;