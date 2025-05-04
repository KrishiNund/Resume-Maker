'use client';

import React from 'react';
import { Check } from 'lucide-react';

const features = [
  {
    title: 'ATS-Optimized Templates',
    description: 'Our templates are designed to pass through Applicant Tracking Systems while maintaining professional design.',
    points: [
      'Keyword optimization',
      'Clean, scannable layouts',
      'Recruiter-approved designs',
    ],
  },
  {
    title: 'Smart Content Suggestions',
    description: 'Get AI-powered suggestions for bullet points and skills based on your job title and industry.',
    points: [
      'Industry-specific suggestions',
      'Action verb recommendations',
      'Achievement-focused bullets',
    ],
  },
  {
    title: 'Multiple Format Export',
    description: 'Download your resume in multiple formats for different submission requirements.',
    points: [
      'PDF download',
      'DOCX export',
      'Plain text for applications',
    ],
  },
  {
    title: 'Version Control',
    description: 'Create and save multiple versions of your resume for different job applications.',
    points: [
      'Unlimited resume versions',
      'Easy duplication and editing',
      'Job-specific customization',
    ],
  },
  {
    title: 'Real-time Feedback',
    description: 'Get instant feedback on your resume\'s content, formatting, and optimization.',
    points: [
      'Content strength analysis',
      'Formatting suggestions',
      'ATS compatibility check',
    ],
  },
  {
    title: 'Cloud Storage',
    description: 'Your resumes are securely stored in the cloud, accessible from any device.',
    points: [
      'Secure cloud storage',
      'Access from any device',
      'Automatic saving',
    ],
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-4xl font-bold mb-6">Create professional resumes in minutes</h2>
          <p className="text-lg text-gray-600">
            Our smart resume builder helps you craft ATS-friendly resumes that highlight your strengths and get you noticed by recruiters.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.points.map((point, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="mr-2 w-4 h-4 text-green-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

