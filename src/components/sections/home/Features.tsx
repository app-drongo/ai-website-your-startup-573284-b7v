'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Shield, Rocket, Users, BarChart3, Globe } from 'lucide-react';

const DEFAULT_FEATURES = {
  sectionTitle: 'Why Choose Our Platform',
  sectionSubtitle: 'Powerful features designed to accelerate your growth',
  features: [
    {
      id: 'lightning-fast',
      icon: 'Zap',
      title: 'Lightning Fast Performance',
      description:
        'Built with cutting-edge technology to deliver blazing fast load times and seamless user experiences across all devices.',
      badge: 'Performance',
    },
    {
      id: 'enterprise-security',
      icon: 'Shield',
      title: 'Enterprise-Grade Security',
      description:
        'Advanced encryption, multi-factor authentication, and compliance with industry standards to keep your data safe.',
      badge: 'Security',
    },
    {
      id: 'rapid-deployment',
      icon: 'Rocket',
      title: 'Rapid Deployment',
      description:
        'Go from concept to production in minutes with our streamlined deployment pipeline and automated scaling.',
      badge: 'DevOps',
    },
    {
      id: 'team-collaboration',
      icon: 'Users',
      title: 'Team Collaboration',
      description:
        'Real-time collaboration tools that keep your team synchronized and productive, no matter where they work.',
      badge: 'Teamwork',
    },
    {
      id: 'advanced-analytics',
      icon: 'BarChart3',
      title: 'Advanced Analytics',
      description:
        'Comprehensive insights and reporting tools to track performance, user behavior, and business metrics.',
      badge: 'Analytics',
    },
    {
      id: 'global-scale',
      icon: 'Globe',
      title: 'Global Scale',
      description:
        'Worldwide CDN and infrastructure that automatically scales to handle millions of users without breaking a sweat.',
      badge: 'Scale',
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
  Globe,
};

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };

  return (
    <section id="features" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="sectionTitle">{config.sectionTitle}</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            <span data-editable="sectionSubtitle">{config.sectionSubtitle}</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {config.features.map((feature, idx) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];

            return (
              <Card
                key={feature.id}
                className="bg-card text-card-foreground border-border hover:bg-accent/5 transition-colors duration-300 group"
              >
                <CardContent className="p-8">
                  {/* Icon and Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-primary/10 text-primary p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                      <span data-editable={`features[${idx}].badge`}>{feature.badge}</span>
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    <span data-editable={`features[${idx}].description`}>
                      {feature.description}
                    </span>
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-muted/50 text-muted-foreground rounded-lg p-8 max-w-2xl mx-auto">
            <p className="text-lg">
              Ready to experience the power of our platform?
              <span className="text-primary font-medium ml-2">
                Join thousands of satisfied customers worldwide.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
