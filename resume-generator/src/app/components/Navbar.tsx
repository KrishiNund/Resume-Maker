'use client';

import { useState } from 'react';
import SafeLink from './SafeLink';
import { Menu, X } from 'lucide-react'; // optional: install lucide-react or use your own icons

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="py-4 border-b border-gray-100 relative">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <SafeLink to="/" className="text-2xl font-bold">
          ResumePal
        </SafeLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          <SafeLink to="/resumebuilder" className="text-sm text-gray-600 hover:text-black">
            RESUME BUILDER
          </SafeLink>
          <SafeLink to="/templates" className="text-sm text-gray-600 hover:text-black">
            TEMPLATES
          </SafeLink>
          <SafeLink to="" className="text-sm text-gray-600 hover:text-black">
            ABOUT
          </SafeLink>
          <SafeLink to="/pricing" className="text-sm text-gray-600 hover:text-black">
            PRICING
          </SafeLink>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-600"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md z-50 flex flex-col items-start px-6 py-4 space-y-4">
          <SafeLink to="/resumebuilder" className="text-sm text-gray-600 hover:text-black" onClick={() => setMenuOpen(false)}>
            RESUME BUILDER
          </SafeLink>
          <SafeLink to="/templates" className="text-sm text-gray-600 hover:text-black" onClick={() => setMenuOpen(false)}>
            TEMPLATES
          </SafeLink>
          <SafeLink to="" className="text-sm text-gray-600 hover:text-black" onClick={() => setMenuOpen(false)}>
            ABOUT
          </SafeLink>
          <SafeLink to="/pricing" className="text-sm text-gray-600 hover:text-black" onClick={() => setMenuOpen(false)}>
            PRICING
          </SafeLink>
        </div>
      )}
    </nav>
  );
}
