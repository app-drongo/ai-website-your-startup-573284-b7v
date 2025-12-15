'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Star, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Simple, Transparent Pricing',
  subtitle: "Choose the perfect plan for your team's needs. Scale as you grow.",
  billingToggle: {
    monthly: 'Monthly',
    yearly: 'Yearly',
  },
  yearlyDiscount: 'Save 20%',
  plans: [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for individuals and small teams getting started',
      monthlyPrice: 29,
      yearlyPrice: 23,
      currency: '$',
      period: 'per user/month',
      features: [
        'Up to 5 team members',
        '10GB storage',
        'Basic analytics',
        'Email support',
        'Core integrations',
      ],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=starter',
      popular: false,
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Advanced features for growing teams and businesses',
      monthlyPrice: 79,
      yearlyPrice: 63,
      currency: '$',
      period: 'per user/month',
      features: [
        'Up to 25 team members',
        '100GB storage',
        'Advanced analytics',
        'Priority support',
        'All integrations',
        'Custom workflows',
        'API access',
      ],
      ctaText: 'Get Started',
      ctaHref: '/signup?plan=professional',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Custom solutions for large organizations',
      monthlyPrice: 199,
      yearlyPrice: 159,
      currency: '$',
      period: 'per user/month',
      features: [
        'Unlimited team members',
        'Unlimited storage',
        'Custom analytics',
        '24/7 dedicated support',
        'Custom integrations',
        'Advanced security',
        'SLA guarantee',
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/contact?plan=enterprise',
      popular: false,
    },
  ],
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'Can I change plans anytime?',
        answer:
          'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
      },
      {
        question: 'Is there a free trial?',
        answer:
          'We offer a 14-day free trial for all plans. No credit card required to get started.',
      },
    ],
  },
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className={`text-sm ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
            >
              <span data-editable="billingToggle.monthly">{config.billingToggle.monthly}</span>
            </span>
            <button
              onClick={toggleBilling}
              className="relative w-12 h-6 bg-muted rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Toggle billing period"
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-primary rounded-full transition-transform duration-200 ${isYearly ? 'translate-x-6' : ''}`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
              >
                <span data-editable="billingToggle.yearly">{config.billingToggle.yearly}</span>
              </span>
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                <Zap className="w-3 h-3 mr-1" />
                <span data-editable="yearlyDiscount">{config.yearlyDiscount}</span>
              </Badge>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto mb-16">
          {config.plans.map((plan, idx) => (
            <Card
              key={plan.id}
              className={`relative bg-card text-card-foreground border-border hover:shadow-lg transition-all duration-300 ${
                plan.popular ? 'border-primary shadow-md scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <h3 className="text-2xl font-bold mb-2">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>
                <p className="text-muted-foreground mb-6">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold">
                      <span data-editable={`plans[${idx}].currency`}>{plan.currency}</span>
                    </span>
                    <span className="text-5xl font-bold">
                      <span
                        data-editable={`plans[${idx}].${isYearly ? 'yearlyPrice' : 'monthlyPrice'}`}
                      >
                        {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    <span data-editable={`plans[${idx}].period`}>{plan.period}</span>
                  </p>
                </div>

                <Button
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardHeader>

              <CardContent>
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                          {feature}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span data-editable="faq.title">{config.faq.title}</span>
          </h2>
          <div className="space-y-6">
            {config.faq.items.map((item, idx) => (
              <Card key={idx} className="bg-card text-card-foreground">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">
                    <span data-editable={`faq.items[${idx}].question`}>{item.question}</span>
                  </h3>
                  <p className="text-muted-foreground">
                    <span data-editable={`faq.items[${idx}].answer`}>{item.answer}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
