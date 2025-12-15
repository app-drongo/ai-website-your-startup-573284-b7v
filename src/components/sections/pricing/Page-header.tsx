'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PAGE_HEADER = {
  badge: 'New Features',
  title: 'Choose Your Plan',
  subtitle: 'Scale your startup with the right pricing tier',
  description:
    'From early-stage founders to scaling teams, we have flexible plans that grow with your business. Start free and upgrade as you succeed.',
  ctaText: 'Start Free Trial',
  ctaHref: '/signup',
  secondaryCtaText: 'View Demo',
  secondaryCtaHref: '/demo',
  features: ['14-day free trial', 'No credit card required', 'Cancel anytime'],
  highlightIcon: 'sparkles',
} as const;

type PageHeaderProps = Partial<typeof DEFAULT_PAGE_HEADER>;

export default function PageHeader(props: PageHeaderProps) {
  const config = { ...DEFAULT_PAGE_HEADER, ...props };
  const navigate = useSmartNavigation();

  const handlePrimaryClick = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  const getIcon = () => {
    switch (config.highlightIcon) {
      case 'trending':
        return <TrendingUp className="h-4 w-4" />;
      case 'zap':
        return <Zap className="h-4 w-4" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  return (
    <section id="page-header" className="bg-background text-foreground py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
            >
              <span className="mr-2">{getIcon()}</span>
              <span data-editable="badge">{config.badge}</span>
            </Badge>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span
              data-editable="title"
              className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent"
            >
              {config.title}
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-muted-foreground mb-6">
            <span data-editable="subtitle">{config.subtitle}</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            <span data-editable="description">{config.description}</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              onClick={handlePrimaryClick}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span data-editable="ctaText">{config.ctaText}</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleSecondaryClick}
              data-editable-href="secondaryCtaHref"
              data-href={config.secondaryCtaHref}
              className="border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200"
            >
              <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
            </Button>
          </div>

          {/* Features List */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {config.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span data-editable={`features[${idx}]`}>{feature}</span>
              </div>
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
