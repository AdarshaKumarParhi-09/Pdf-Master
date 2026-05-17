import { Link } from "react-router-dom";
import { FileText, Menu, Search } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 h-14 flex items-center sticky top-0 z-50 shadow-sm shrink-0">
      <div className="max-w-7xl mx-auto px-8 w-full flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 h-8 w-8 rounded flex items-center justify-center text-white">
              <FileText size={18} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              PDF<span className="text-blue-600">Master</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">All PDF Tools</Link>
            <Link to="/" className="hover:text-blue-600 transition-colors">Convert</Link>
            <Link to="/" className="hover:text-blue-600 transition-colors">Solutions</Link>
            <Link to="/" className="hover:text-blue-600 transition-colors">Pricing</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-slate-600 hidden sm:block">
            <Search size={18} />
          </button>
          <button className="text-sm font-medium text-slate-600 hover:text-blue-600">
            Login
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 shadow-sm transition-colors">
            Sign Up Free
          </button>
          <button className="md:hidden p-2 text-slate-600">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
