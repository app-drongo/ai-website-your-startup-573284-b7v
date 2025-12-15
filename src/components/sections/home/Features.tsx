'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Shield, Rocket, Users, BarChart3 } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FEATURES = {
  title: 'Powerful Features for Modern Teams',
  subtitle: 'Everything you need to scale your tech startup from idea to IPO',
  ctaText: 'Start Free Trial',
  ctaHref: '/signup',
  features: [
    {
      icon: 'Zap',
      title: 'Lightning Fast Performance',
      description:
        'Built with cutting-edge technology for blazing fast load times and seamless user experience.',
      benefits: ['99.9% uptime guarantee', 'Sub-100ms response times', 'Global CDN network'],
    },
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description:
        'Bank-grade security with end-to-end encryption, SOC 2 compliance, and advanced threat protection.',
      benefits: ['256-bit SSL encryption', 'SOC 2 Type II certified', 'Advanced threat detection'],
    },
    {
      icon: 'Rocket',
      title: 'Rapid Deployment',
      description:
        'Deploy in minutes, not hours. One-click setup with automated scaling and zero-downtime updates.',
      benefits: ['One-click deployment', 'Auto-scaling infrastructure', 'Zero-downtime updates'],
    },
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description:
        'Built for teams with real-time collaboration, role-based permissions, and integrated communication.',
      benefits: ['Real-time collaboration', 'Role-based access control', 'Integrated chat & video'],
    },
    {
      icon: 'BarChart3',
      title: 'Advanced Analytics',
      description:
        'Deep insights with real-time dashboards, custom reports, and AI-powered recommendations.',
      benefits: ['Real-time dashboards', 'Custom report builder', 'AI-powered insights'],
    },
  ],
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

const iconMap = {
  Zap,
  Shield,
  Rocket,
  Users,
  BarChart3,
};

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };
  const navigate = useSmartNavigation();

  const handleCTAClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="features" className="bg-background text-foreground py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
          <Button
            size="lg"
            onClick={handleCTAClick}
            data-editable-href="ctaHref"
            data-href={config.ctaHref}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <span data-editable="ctaText">{config.ctaText}</span>
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {config.features.map((feature, idx) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Zap;

            return (
              <Card
                key={idx}
                className="bg-card text-card-foreground border-border hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                      Feature
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">
                    <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    <span data-editable={`features[${idx}].description`}>
                      {feature.description}
                    </span>
                  </p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIdx) => (
                      <li key={benefitIdx} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        <span data-editable={`features[${idx}].benefits[${benefitIdx}]`}>
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-muted text-muted-foreground rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Ready to get started?</h3>
            <p className="mb-6">
              Join thousands of teams already using our platform to build amazing products.
            </p>
            <Button
              size="lg"
              onClick={handleCTAClick}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
