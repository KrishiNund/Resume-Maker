'use client';

import { FileText, Heart } from 'lucide-react';


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-black to-gray-900 text-white mb-6">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About LetMeResume</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple, free resume building for everyone
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-12">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Story</h2>
            
            <p className="text-gray-600 mb-6">
              LetMeResume was born out of frustration with overly complex resume builders that charge for basic features. 
              As a job seeker myself, I wanted to create something simple yet powerful that anyone could use for free.
            </p>
            
            <p className="text-gray-600 mb-6">
              My goal is to help people create professional, ATS-friendly resumes without the hassle. No accounts required, 
              no hidden fees - just a straightforward tool to help you land your next opportunity.
            </p>
            
            <div className="border-t border-gray-200 my-8"></div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Stable and Reliable</h2>

            <p className="text-gray-600 mb-6">
            LetMeResume is designed to be simple, fast, and effective—with all the features you need to create a great resume, and none of the clutter. 
            </p>

            <p className="text-gray-600 mb-8">
            While there are no major new features planned at the moment, the app will remain fully functional and supported. 
            It's a stable tool you can rely on anytime you need a clean, professional resume.
            </p>

            
            <div className="border-t border-gray-200 my-8"></div>
            
            <div className="text-center">
              <div className="inline-flex items-center text-sm font-medium text-gray-600 mb-6">
                <Heart className="w-4 h-4 mr-2 text-red-500" />
                <span>Built with care for job seekers everywhere</span>
              </div>
              
              <p className="text-gray-600 mb-8">
                If LetMeResume has helped you in your job search, that’s the greatest reward I could ask for.
                Feel free to share it with friends or anyone it might help—and best of luck on your journey ahea
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}