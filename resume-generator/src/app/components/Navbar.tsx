'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-800">
          ResumeGen
        </Link>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={`flex-col md:flex-row md:flex gap-6 items-center ${isOpen ? 'flex' : 'hidden'} md:static absolute top-16 left-0 w-full bg-white md:bg-transparent p-4 md:p-0`}>
          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>
          <Link href="/generate" className="hover:text-blue-600">
            Generate
          </Link>
          <Link href="/contact" className="hover:text-blue-600">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}