'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Zap, Shield, Rocket } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_CTA = {
  title: 'Ready to Deploy with Confidence?',
  subtitle: 'Join thousands of developers who trust our unified deployment platform',
  description:
    'Experience seamless CI/CD, automatic scaling, and enterprise-grade security. Deploy your next project in minutes, not hours.',
  primaryCtaText: 'Start Free Trial',
  primaryCtaHref: '/signup',
  secondaryCtaText: 'View Pricing',
  secondaryCtaHref: '/pricing',
  features: ['Zero-downtime deployments', 'Auto-scaling infrastructure', 'Enterprise security'],
  trustBadge: 'Trusted by 50,000+ developers',
  backgroundPattern: true,
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

  const featureIcons = [Zap, Shield, Rocket];

  return (
    <section
      id="cta"
      className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-24 overflow-hidden"
    >
      {/* Background Pattern */}
      {config.backgroundPattern && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(255_255_255_/_0.15)_1px,_transparent_0)] bg-[size:24px_24px]" />
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              <span data-editable="title">{config.title}</span>
            </h2>

            <p className="text-xl sm:text-2xl text-muted-foreground mb-4 font-medium">
              <span data-editable="subtitle">{config.subtitle}</span>
            </p>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              <span data-editable="description">{config.description}</span>
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {config.features.map((feature, idx) => {
              const IconComponent = featureIcons[idx] || Zap;
              return (
                <Card
                  key={idx}
                  className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-card-foreground">
                      <span data-editable={`features[${idx}]`}>{feature}</span>
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              onClick={handlePrimaryClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              data-editable-href="primaryCtaHref"
              data-href={config.primaryCtaHref}
            >
              <span data-editable="primaryCtaText">{config.primaryCtaText}</span>
              <ArrowRight
                className={`ml-2 w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
              />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg font-semibold transition-all duration-300"
              onClick={handleSecondaryClick}
              data-editable-href="secondaryCtaHref"
              data-href={config.secondaryCtaHref}
            >
              <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
            </Button>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background"
                />
              ))}
            </div>
            <span data-editable="trustBadge">{config.trustBadge}</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
    </section>
  );
}
