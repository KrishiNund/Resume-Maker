'use client';

import { useState } from 'react';
import SafeLink from './SafeLink';
import { Menu, X, FileText, Sparkles, LayoutTemplate, CircleDollarSign, Info } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gray-50 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo */}
          <SafeLink 
            to="/" 
            className="flex items-center space-x-2 group"
            onClick={() => setMenuOpen(false)}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-black to-gray-900 text-white">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-900 transition-all">
              LetMeResume
            </span>
          </SafeLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <SafeLink 
              to="/resumebuilder" 
              className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Resume Builder
            </SafeLink>
            <SafeLink 
              to="/about" 
              className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Info className="w-4 h-4 mr-2" />
              About
            </SafeLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-gray-50 border-t border-gray-100 py-3 px-4 space-y-3">
            <SafeLink 
              to="/resumebuilder" 
              className="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <Sparkles className="w-4 h-4 mr-3" />
              Resume Builder
            </SafeLink>
            <SafeLink 
              to="/about" 
              className="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <Info className="w-4 h-4 mr-3" />
              About
            </SafeLink>
          </div>
        )}
      </div>
    </nav>
  );
}