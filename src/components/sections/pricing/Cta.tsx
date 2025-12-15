'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, Zap, Shield, Rocket } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_CTA = {
  badge: 'Limited Time Offer',
  title: 'Ready to Transform Your Business?',
  subtitle: 'Join thousands of companies already using our platform to scale faster and smarter.',
  description:
    'Get started today with our enterprise-grade solution. No setup fees, no hidden costs, and full support from day one.',
  primaryCtaText: 'Start Free Trial',
  primaryCtaHref: '/signup',
  secondaryCtaText: 'Schedule Demo',
  secondaryCtaHref: '/demo',
  features: ['14-day free trial', 'No credit card required', '24/7 premium support'],
  trustIndicators: [
    { icon: 'shield', text: 'SOC 2 Compliant' },
    { icon: 'zap', text: '99.9% Uptime' },
    { icon: 'rocket', text: 'Deploy in Minutes' },
  ],
  testimonial: 'This platform transformed how we operate. ROI was immediate.',
  testimonialAuthor: 'Sarah Chen',
  testimonialRole: 'CTO, TechCorp',
  urgencyText: 'Join 10,000+ teams already scaling with us',
} as const;

type CtaProps = Partial<typeof DEFAULT_CTA>;

export default function Cta(props: CtaProps) {
  const config = { ...DEFAULT_CTA, ...props };
  const navigate = useSmartNavigation();
  const [isHovered, setIsHovered] = useState(false);

  const handlePrimaryClick = () => {
    navigate(config.primaryCtaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield':
        return <Shield className="h-5 w-5" />;
      case 'zap':
        return <Zap className="h-5 w-5" />;
      case 'rocket':
        return <Rocket className="h-5 w-5" />;
      default:
        return <Check className="h-5 w-5" />;
    }
  };

  return (
    <section
      id="cta"
      className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-24 sm:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl">
            <CardContent className="p-8 sm:p-12 lg:p-16">
              {/* Header */}
              <div className="text-center mb-12">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20 mb-6"
                >
                  <span data-editable="badge">{config.badge}</span>
                </Badge>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                  <span data-editable="title">{config.title}</span>
                </h2>

                <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
                  <span data-editable="subtitle">{config.subtitle}</span>
                </p>

                <p className="text-muted-foreground max-w-2xl mx-auto">
                  <span data-editable="description">{config.description}</span>
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                {config.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-center sm:justify-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span
                      className="text-foreground font-medium"
                      data-editable={`features[${idx}]`}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={handlePrimaryClick}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  data-editable-href="primaryCtaHref"
                  data-href={config.primaryCtaHref}
                >
                  <span data-editable="primaryCtaText">{config.primaryCtaText}</span>
                  <ArrowRight
                    className={`ml-2 h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
                  />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                  onClick={handleSecondaryClick}
                  data-editable-href="secondaryCtaHref"
                  data-href={config.secondaryCtaHref}
                >
                  <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 pt-8 border-t border-border/50">
                {config.trustIndicators.map((indicator, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-center gap-3 text-muted-foreground"
                  >
                    <div className="text-primary">{getIcon(indicator.icon)}</div>
                    <span
                      className="text-sm font-medium"
                      data-editable={`trustIndicators[${idx}].text`}
                    >
                      {indicator.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="text-center">
                <blockquote className="text-lg italic text-muted-foreground mb-4">
                  "<span data-editable="testimonial">{config.testimonial}</span>"
                </blockquote>
                <div className="text-sm">
                  <span className="font-semibold text-foreground" data-editable="testimonialAuthor">
                    {config.testimonialAuthor}
                  </span>
                  <span className="text-muted-foreground">, </span>
                  <span className="text-muted-foreground" data-editable="testimonialRole">
                    {config.testimonialRole}
                  </span>
                </div>
              </div>

              {/* Urgency Text */}
              <div className="text-center mt-8 pt-8 border-t border-border/50">
                <p className="text-sm text-muted-foreground font-medium">
                  <span data-editable="urgencyText">{config.urgencyText}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
