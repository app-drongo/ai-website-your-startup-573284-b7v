'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Star, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Simple, Transparent Pricing',
  subtitle: 'Choose the perfect plan for your deployment needs',
  billingToggleText: 'Annual billing saves 20%',
  plans: [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small projects and personal use',
      monthlyPrice: 9,
      yearlyPrice: 72,
      isPopular: false,
      features: ['5 deployments per month', '1GB storage', 'Community support', 'Basic analytics'],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=starter',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Ideal for growing teams and businesses',
      monthlyPrice: 29,
      yearlyPrice: 276,
      isPopular: true,
      features: [
        'Unlimited deployments',
        '10GB storage',
        'Priority support',
        'Advanced analytics',
        'Custom domains',
        'Team collaboration',
      ],
      ctaText: 'Start Pro Trial',
      ctaHref: '/signup?plan=pro',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations with custom needs',
      monthlyPrice: 99,
      yearlyPrice: 948,
      isPopular: false,
      features: [
        'Unlimited everything',
        '100GB storage',
        '24/7 dedicated support',
        'Custom integrations',
        'SSO & advanced security',
        'SLA guarantee',
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/contact?plan=enterprise',
    },
  ],
  faqTitle: 'Frequently Asked Questions',
  faqs: [
    {
      question: 'Can I change plans anytime?',
      answer:
        'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'All paid plans come with a 14-day free trial. No credit card required to start.',
    },
  ],
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
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className={`text-sm ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
            >
              Monthly
            </span>
            <button
              onClick={toggleBilling}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              role="switch"
              aria-checked={isYearly}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span
              className={`text-sm ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
            >
              Yearly
            </span>
            {isYearly && (
              <Badge variant="secondary" className="ml-2">
                <span data-editable="billingToggleText">{config.billingToggleText}</span>
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 mb-20">
          {config.plans.map((plan, idx) => (
            <Card
              key={plan.id}
              className={`relative ${plan.isPopular ? 'border-primary shadow-lg scale-105' : 'border-border'}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </CardDescription>

                <div className="mt-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">
                      ${isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground ml-1">/month</span>
                  </div>
                  {isYearly && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Billed annually (${plan.yearlyPrice})
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-center">
                      <Check className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                      <span className="text-sm">
                        <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                          {feature}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full ${plan.isPopular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span data-editable="faqTitle">{config.faqTitle}</span>
          </h2>

          <div className="space-y-6">
            {config.faqs.map((faq, idx) => (
              <Card key={idx} className="bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle className="text-lg">
                    <span data-editable={`faqs[${idx}].question`}>{faq.question}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    <span data-editable={`faqs[${idx}].answer`}>{faq.answer}</span>
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
