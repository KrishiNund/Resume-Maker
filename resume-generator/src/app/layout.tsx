import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Inter } from 'next/font/google' 

// Importing the 'Inter' font with desired subsets
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Resume Maker',
  description: 'Make your resume in minutes',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main>{children}</main>  {/* All pages will render inside here */}
        <Footer />
      </body>
    </html>
  )
}