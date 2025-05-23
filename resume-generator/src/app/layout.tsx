import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], // include all the weights you want
  variable: '--font-roboto', // optional, for CSS variables
});

export const metadata = {
  title: 'Resume Maker',
  description: 'Make your resume in minutes',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main>{children}</main>  {/* All pages will render inside here */}
        <Footer />
      </body>
    </html>
  )
}