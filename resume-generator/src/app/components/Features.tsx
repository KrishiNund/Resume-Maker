'use client';

import React from 'react';
import { FileText, Eye, RefreshCw, Download, ListOrdered, Infinity } from 'lucide-react';
import { Card } from '../components/ui/card';

const features = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: "ATS-Friendly Resumes",
    description: "Create resumes designed to pass through applicant tracking systems with proper formatting."
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Live Preview",
    description: "See exactly how your resume will look as you build it (desktop only)."
  },
  {
    icon: <ListOrdered className="w-6 h-6" />,
    title: "Customizable Sections",
    description: "Rearrange education, skills, and other sections in any order you prefer."
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: "PDF Export",
    description: "Download your resume as a perfectly formatted PDF with one click."
  },
  {
    icon: <Infinity className="w-6 h-6" />,
    title: "Unlimited Resumes",
    description: "Create and download as many different resumes as you need – completely free."
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Private by Design",
    description: "Your data never leaves your browser. Nothing is stored or tracked — your privacy is respected."
  }
];


export default function Features() {
  return (
    <section className="py-16 bg-gray-50" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Simple, Powerful Resume Building
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to create professional resumes that get results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-5 hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col items-start">
                <div className="p-3 bg-gray-100 rounded-lg text-gray-800 mb-3">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}