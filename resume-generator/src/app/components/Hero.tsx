'use client';

import React from 'react';
import { Button } from '@/app/components/ui/button';
import { Rocket } from 'lucide-react';
import SafeLink from './SafeLink';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-28 overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 border border-gray-300 mb-6">
            <Rocket className="w-4 h-4 text-gray-800 mr-2" />
            <span className="text-sm font-medium text-gray-800">No Sign-Up • Always Free</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
            Build job-ready resumes in minutes
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-600 mb-10">
            A simple, distraction-free resume builder that helps you create polished, ATS-friendly resumes—fast and for free.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <SafeLink to="/resumebuilder">
              <Button className="h-12 px-8 text-lg gap-2">
                <Rocket className="w-5 h-5" />
                Build My Resume
              </Button>
            </SafeLink>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-500"></div>
              <span className="font-medium">ATS-Compatible Template</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-500"></div>
              <span className="font-medium">100% Free to Use</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-500"></div>
              <span className="font-medium">No Account Needed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
