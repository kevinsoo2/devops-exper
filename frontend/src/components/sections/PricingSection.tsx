'use client';

import { useState } from 'react';
import { Check, Zap, Crown, Rocket } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'Perfect for getting started with DevOps learning.',
    features: [
      'Access to 10 free courses',
      '3 labs per month',
      'Community forum access',
      'Basic progress tracking',
      'Email support',
    ],
    cta: 'Get Started Free',
    popular: false,
    gradient: 'from-gray-500 to-gray-600',
  },
  {
    name: 'Pro',
    icon: Crown,
    monthlyPrice: 29,
    yearlyPrice: 290,
    description: 'For serious learners ready to accelerate their career.',
    features: [
      'All 120+ courses',
      'Unlimited labs',
      'All certifications',
      'Mentoring sessions (2/month)',
      'Priority support',
      'Exclusive Discord channels',
      'Downloadable resources',
    ],
    cta: 'Start Pro Trial',
    popular: true,
    gradient: 'from-primary-500 to-primary-600',
  },
  {
    name: 'Enterprise',
    icon: Rocket,
    monthlyPrice: 99,
    yearlyPrice: 990,
    description: 'For teams and organizations scaling DevOps skills.',
    features: [
      'Everything in Pro',
      'Team management dashboard',
      'Custom learning paths',
      'Unlimited mentoring',
      'SSO & SAML integration',
      'Custom certifications',
      'Dedicated account manager',
      'API access',
    ],
    cta: 'Contact Sales',
    popular: false,
    gradient: 'from-accent-500 to-accent-600',
  },
];

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-24 bg-gray-50 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-badge">
            <Crown size={16} />
            Pricing
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold dark:text-white">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Choose the plan that fits your learning goals. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${!isYearly ? 'dark:text-white' : 'text-gray-500'}`}>Monthly</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-14 h-7 rounded-full transition-colors ${
              isYearly ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-700'
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                isYearly ? 'translate-x-8' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${isYearly ? 'dark:text-white' : 'text-gray-500'}`}>
            Yearly
            <span className="ml-1 text-xs text-success-400">(Save 17%)</span>
          </span>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.name}
                className={`card relative ${
                  plan.popular ? 'border-primary-500 shadow-lg shadow-primary-500/20 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-500 text-white text-xs font-bold rounded-full">
                    Most Popular
                  </div>
                )}

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4`}>
                  <Icon size={24} className="text-white" />
                </div>

                <h3 className="text-xl font-bold dark:text-white">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.description}</p>

                <div className="mt-4 mb-6">
                  <span className="text-4xl font-black dark:text-white">
                    ${price}
                  </span>
                  {price > 0 && (
                    <span className="text-gray-500 text-sm">/{isYearly ? 'year' : 'month'}</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check size={16} className="text-success-400 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/30'
                      : 'border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-500 hover:text-primary-500'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
