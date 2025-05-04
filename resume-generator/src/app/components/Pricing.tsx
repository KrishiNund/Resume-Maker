"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  return (
    <section className="py-20">
      <div className="container-small">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-4xl font-bold mb-6">Start your job search strong</h2>
          <p className="text-lg text-gray-600 mb-8">
            Create a professional resume for free, or upgrade for advanced features and unlimited access.
          </p>

          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-md p-1 bg-gray-100">
              <button
                className={`px-4 py-2 rounded-md ${billingCycle === 'monthly' ? 'bg-white shadow-sm' : ''}`}
                onClick={() => setBillingCycle('monthly')}
              >
                PAY MONTHLY
              </button>
              <button
                className={`px-4 py-2 rounded-md ${billingCycle === 'annually' ? 'bg-white shadow-sm' : ''}`}
                onClick={() => setBillingCycle('annually')}
              >
                PAY ANNUALLY
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Free Plan */}
          <PricingCard
            title="PERSONAL"
            price="Free"
            buttonLabel="GET STARTED"
            features={[
              "Create 1 resume",
              "Access to basic templates",
              "PDF downloads",
              "Basic content suggestions",
            ]}
          />

          {/* Basic Plan */}
          <PricingCard
            title="BASIC"
            price="$12"
            discountLabel="-25%"
            description={`/ ${billingCycle === 'monthly' ? 'month' : 'month, billed annually'}`}
            buttonLabel="TRY IT FREE"
            features={[
              "Create up to 3 resumes",
              "Access to all templates",
              "Multiple export formats",
              "Remove ResumePal branding",
            ]}
          />

          {/* Pro Plan */}
          <PricingCard
            title="PROFESSIONAL"
            price="$19"
            popular
            description={`/ ${billingCycle === 'monthly' ? 'month' : 'month, billed annually'}`}
            buttonLabel="TRY IT FREE"
            features={[
              "Unlimited resumes",
              "Advanced AI content suggestions",
              "Cover letter builder",
              "Priority support",
            ]}
          />

          {/* Enterprise Plan */}
          <PricingCard
            title="ENTERPRISE"
            price="Let's Chat"
            buttonLabel="CONTACT US"
            features={[
              "Team management",
              "Custom branding",
              "API access",
              "Dedicated account manager",
            ]}
          />
        </div>
      </div>
    </section>
  );
};

interface PricingCardProps {
  title: string;
  price: string;
  description?: string;
  buttonLabel: string;
  features: string[];
  discountLabel?: string;
  popular?: boolean;
}

const PricingCard = ({
  title,
  price,
  description,
  buttonLabel,
  features,
  discountLabel,
  popular,
}: PricingCardProps) => {
  return (
    <div
      className={`relative bg-white p-8 rounded-lg ${
        popular ? "border-2 border-cta" : "border border-gray-200"
      }`}
    >
      {discountLabel && (
        <div className="absolute -top-3 right-8 bg-gray-100 text-xs font-medium px-3 py-1 rounded-full">
          {discountLabel}
        </div>
      )}
      {popular && (
        <div className="absolute -top-3 right-8 bg-cta text-white text-xs font-medium px-3 py-1 rounded-full">
          POPULAR
        </div>
      )}
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <h4 className="text-4xl font-bold mb-1">{price}</h4>
      {description && <p className="text-sm text-gray-600 mb-6">{description}</p>}
      <Button className={`w-full ${popular ? "cta-button" : "secondary-button"} mb-8`}>
        {buttonLabel}
      </Button>

      <p className="text-sm font-bold text-gray-900 mb-4">
        {title === "PERSONAL" ? "CORE FEATURES:" : `EVERYTHING IN ${getPreviousTier(title)}, PLUS:`}
      </p>
      <ul className="space-y-3 text-sm">
        {features.map((feature, idx) => (
          <li className="flex items-start" key={idx}>
            <Check className="feature-icon mr-2 mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const getPreviousTier = (tier: string) => {
  switch (tier) {
    case "BASIC":
      return "FREE";
    case "PROFESSIONAL":
      return "BASIC";
    case "ENTERPRISE":
      return "PRO";
    default:
      return "PREVIOUS";
  }
};
