'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Shield, Leaf } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Sustainable Tech Solutions',
  subtitle:
    'Eco-friendly pricing that grows with your green tech startup. Carbon-neutral infrastructure included.',
  billingToggle: 'Monthly',
  plans: [
    {
      name: 'Eco Starter',
      description: 'Perfect for green startups',
      monthlyPrice: 29,
      yearlyPrice: 290,
      badge: '',
      features: ['Up to 5 team members', '10GB green storage', 'Carbon tracking', 'Email support'],
      ctaText: 'Start Green Trial',
      ctaHref: '/signup/starter',
      popular: false,
    },
    {
      name: 'Sustainable Growth',
      description: 'For scaling eco-tech companies',
      monthlyPrice: 99,
      yearlyPrice: 990,
      badge: 'Most Popular',
      features: [
        'Up to 25 team members',
        '100GB renewable storage',
        'Advanced eco-analytics',
        'Priority green support',
        'Carbon API access',
        'Sustainability integrations',
      ],
      ctaText: 'Go Green Now',
      ctaHref: '/signup/growth',
      popular: true,
    },
    {
      name: 'Planet Enterprise',
      description: 'For climate-conscious organizations',
      monthlyPrice: 299,
      yearlyPrice: 2990,
      badge: 'Carbon Neutral',
      features: [
        'Unlimited team members',
        '1TB renewable storage',
        'Real-time carbon tracking',
        '24/7 eco-support',
        'Full sustainability API',
        'Custom green development',
        'Carbon offset guarantee',
        'Environmental reporting',
      ],
      ctaText: 'Save the Planet',
      ctaHref: '/contact/enterprise',
      popular: false,
    },
  ],
  testimonial: {
    text: 'This platform helped us reduce our carbon footprint by 60% while scaling our operations. The green pricing model aligns perfectly with our values.',
    author: 'Maya Patel',
    role: 'CEO at EcoFlow Technologies',
    rating: 5,
  },
  guaranteeText: '30-day carbon-neutral guarantee',
  securityText: 'Renewable energy powered',
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isYearly, setIsYearly] = useState(false);

  const handlePlanSelect = (href: string) => {
    navigate(href);
  };

  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };

  return (
    <section
      id="pricing"
      className="relative min-h-screen bg-cover bg-center bg-no-repeat text-foreground py-20"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop')",
      }}
    >
      {/* Green overlay for theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-green-800/70 to-emerald-900/80" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-8 w-8 text-green-400" />
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              <span data-editable="title">{config.title}</span>
            </h2>
          </div>
          <p className="text-xl text-green-100 max-w-2xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isYearly ? 'text-white' : 'text-green-200'}`}>
              Monthly
            </span>
            <button
              onClick={toggleBilling}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 data-[checked]:bg-green-500"
              data-checked={isYearly}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
            <span className={`text-sm ${isYearly ? 'text-white' : 'text-green-200'}`}>Yearly</span>
            {isYearly && (
              <Badge className="ml-2 bg-green-500 text-white hover:bg-green-600">Save 20%</Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {config.plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative backdrop-blur-sm ${
                plan.popular
                  ? 'border-green-400 shadow-2xl shadow-green-500/20 scale-105 bg-white/95'
                  : 'border-green-600 bg-white/90'
              } transition-all hover:shadow-xl hover:shadow-green-500/10`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white hover:bg-green-600">
                    <span data-editable={`plans[${idx}].badge`}>{plan.badge}</span>
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <h3 className="text-2xl font-bold mb-2 text-green-800">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>
                <p className="text-green-600 mb-4">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-green-800">
                    ${isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.monthlyPrice}
                  </span>
                  <span className="text-green-600">/month</span>
                  {isYearly && (
                    <div className="text-sm text-green-600">
                      Billed annually (${plan.yearlyPrice})
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-green-700">
                        <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                          {feature}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Customer Testimonial */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 mb-12 border border-green-200">
          <div className="flex items-center justify-center mb-4">
            {[...Array(config.testimonial.rating)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-green-500 fill-current" />
            ))}
          </div>
          <blockquote className="text-center text-lg mb-4 text-green-800">
            "<span data-editable="testimonial.text">{config.testimonial.text}</span>"
          </blockquote>
          <div className="text-center">
            <div className="font-semibold text-green-800">
              <span data-editable="testimonial.author">{config.testimonial.author}</span>
            </div>
            <div className="text-green-600 text-sm">
              <span data-editable="testimonial.role">{config.testimonial.role}</span>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
          <div className="flex items-center gap-2 text-green-100">
            <Shield className="h-5 w-5" />
            <span data-editable="securityText">{config.securityText}</span>
          </div>
          <div className="flex items-center gap-2 text-green-100">
            <Zap className="h-5 w-5" />
            <span data-editable="guaranteeText">{config.guaranteeText}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
