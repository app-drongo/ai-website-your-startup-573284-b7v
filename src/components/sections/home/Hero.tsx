'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Star, Users, Zap, Shield } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  title: 'Build the Future with AI-Powered Solutions',
  subtitle:
    'Transform your business with cutting-edge technology that scales. Join thousands of companies already accelerating their growth.',
  ctaText: 'Start Building Today',
  ctaHref: '/get-started',
  secondaryCtaText: 'Watch Demo',
  secondaryCtaHref: '/demo',
  heroImageUrl:
    'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  heroImageAlt: 'Modern tech workspace with multiple screens showing analytics',
  trustBadge: 'Trusted by 10,000+ companies',
  features: ['99.9% Uptime Guarantee', 'Enterprise Security', '24/7 Expert Support'],
  customerPreviewTitle: 'Loved by industry leaders',
  customerLogos: [
    {
      name: 'TechCorp',
      logoUrl:
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&w=120&h=60&fit=crop&auto=format',
      logoAlt: 'TechCorp logo',
    },
    {
      name: 'InnovateLabs',
      logoUrl:
        'https://images.unsplash.com/photo-1572021335469-31706a17aaef?ixlib=rb-4.0.3&w=120&h=60&fit=crop&auto=format',
      logoAlt: 'InnovateLabs logo',
    },
    {
      name: 'FutureScale',
      logoUrl:
        'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&w=120&h=60&fit=crop&auto=format',
      logoAlt: 'FutureScale logo',
    },
  ],
  stats: [
    { value: '10K+', label: 'Active Users' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' },
  ],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePrimaryCTA = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryCTA = () => {
    setIsVideoPlaying(true);
    navigate(config.secondaryCtaHref);
  };

  return (
    <section id="hero" className="bg-background text-foreground py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badge */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="bg-accent text-accent-foreground">
            <Users className="w-4 h-4 mr-2" />
            <span data-editable="trustBadge">{config.trustBadge}</span>
          </Badge>
        </div>

        {/* Main Hero Content */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span data-editable="title">{config.title}</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                <span data-editable="subtitle">{config.subtitle}</span>
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              {config.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-muted text-muted-foreground px-4 py-2 rounded-full"
                >
                  {idx === 0 && <Zap className="w-4 h-4 text-primary" />}
                  {idx === 1 && <Shield className="w-4 h-4 text-primary" />}
                  {idx === 2 && <Star className="w-4 h-4 text-primary" />}
                  <span data-editable={`features[${idx}]`} className="text-sm font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handlePrimaryCTA}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
              >
                <span data-editable="ctaText">{config.ctaText}</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryCTA}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
              >
                <Play className="w-5 h-5 mr-2" />
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {config.stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    <span data-editable={`stats[${idx}].value`}>{stat.value}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span data-editable={`stats[${idx}].label`}>{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl bg-muted">
              <Image
                src={config.heroImageUrl}
                alt={config.heroImageAlt}
                data-editable-src="heroImageUrl"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* Customer Preview Section */}
        <div className="mt-20 pt-16 border-t border-border">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              <span data-editable="customerPreviewTitle">{config.customerPreviewTitle}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center justify-items-center">
            {config.customerLogos.map((logo, idx) => (
              <Card
                key={idx}
                className="bg-card text-card-foreground border-border hover:bg-accent/50 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-center">
                    <Image
                      src={logo.logoUrl}
                      alt={logo.logoAlt}
                      data-editable-src={`customerLogos[${idx}].logoUrl`}
                      width={120}
                      height={60}
                      className="opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                    />
                  </div>
                  <div className="text-center mt-3">
                    <span
                      data-editable={`customerLogos[${idx}].name`}
                      className="text-sm font-medium text-muted-foreground"
                    >
                      {logo.name}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
