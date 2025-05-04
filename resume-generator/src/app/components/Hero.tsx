'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full mb-6">NEW</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Finally, craft your<br />professional resume<br />with confidence
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Move beyond generic templates—intelligently design, customize, and optimize 
            your resume to stand out to recruiters and pass through ATS systems.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button className="cta-button w-full sm:w-auto">GET STARTED FREE</Button>
            <Button variant="outline" className="secondary-button w-full sm:w-auto">
              WATCH TUTORIAL
            </Button>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto mt-20 rounded-lg shadow-xl overflow-hidden">
          <Image 
            src="/lovable-uploads/84cfdebc-5e2e-4f87-9a07-8f34752da68b.png" 
            alt="Resume builder preview" 
            width={1200}
            height={800}
            className="w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
