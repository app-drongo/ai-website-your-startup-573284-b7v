'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Shield } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Choose Your Plan',
  subtitle: 'Scale your tech startup with confidence. No hidden fees, cancel anytime.',
  billingToggle: 'Monthly',
  plans: [
    {
      name: 'Starter',
      description: 'Perfect for early-stage startups',
      monthlyPrice: 29,
      yearlyPrice: 290,
      badge: '',
      features: ['Up to 5 team members', '10GB cloud storage', 'Basic analytics', 'Email support'],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup/starter',
      popular: false,
    },
    {
      name: 'Growth',
      description: 'For scaling tech companies',
      monthlyPrice: 99,
      yearlyPrice: 990,
      badge: 'Most Popular',
      features: [
        'Up to 25 team members',
        '100GB cloud storage',
        'Advanced analytics',
        'Priority support',
        'API access',
        'Custom integrations',
      ],
      ctaText: 'Get Started',
      ctaHref: '/signup/growth',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For established organizations',
      monthlyPrice: 299,
      yearlyPrice: 2990,
      badge: 'Premium',
      features: [
        'Unlimited team members',
        '1TB cloud storage',
        'Real-time analytics',
        '24/7 dedicated support',
        'Full API access',
        'Custom development',
        'SLA guarantee',
        'Advanced security',
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/contact/enterprise',
      popular: false,
    },
  ],
  testimonial: {
    text: 'This platform transformed how we build and deploy our products. The pricing is transparent and scales perfectly with our growth.',
    author: 'Sarah Chen',
    role: 'CTO at TechFlow',
    rating: 5,
  },
  guaranteeText: '30-day money-back guarantee',
  securityText: 'Enterprise-grade security',
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
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={toggleBilling}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[checked]:bg-primary"
              data-checked={isYearly}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
            <span className={`text-sm ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              Yearly
            </span>
            {isYearly && (
              <Badge variant="secondary" className="ml-2">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {config.plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'} transition-all hover:shadow-lg`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    <span data-editable={`plans[${idx}].badge`}>{plan.badge}</span>
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <h3 className="text-2xl font-bold mb-2">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>
                <p className="text-muted-foreground mb-4">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>
                <div className="mb-4">
                  <span className="text-4xl font-bold">
                    ${isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                  {isYearly && (
                    <div className="text-sm text-muted-foreground">
                      Billed annually (${plan.yearlyPrice})
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">
                        <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                          {feature}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  className={`w-full ${plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
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
        <div className="bg-card text-card-foreground rounded-lg p-8 mb-12">
          <div className="flex items-center justify-center mb-4">
            {[...Array(config.testimonial.rating)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
            ))}
          </div>
          <blockquote className="text-center text-lg mb-4">
            "<span data-editable="testimonial.text">{config.testimonial.text}</span>"
          </blockquote>
          <div className="text-center">
            <div className="font-semibold">
              <span data-editable="testimonial.author">{config.testimonial.author}</span>
            </div>
            <div className="text-muted-foreground text-sm">
              <span data-editable="testimonial.role">{config.testimonial.role}</span>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="h-5 w-5" />
            <span data-editable="securityText">{config.securityText}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Zap className="h-5 w-5" />
            <span data-editable="guaranteeText">{config.guaranteeText}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
