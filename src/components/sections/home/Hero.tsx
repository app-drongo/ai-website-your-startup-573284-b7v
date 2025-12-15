'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, Zap, Users } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  headline: 'Build the Future with Innovative Tech Solutions',
  subheadline:
    'Empowering startups and enterprises to scale faster with cutting-edge technology that adapts to your vision',
  ctaText: 'Get Started Today',
  ctaHref: '/get-started',
  secondaryCtaText: 'View Demo',
  secondaryCtaHref: '/demo',
  heroImageUrl:
    'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  heroImageAlt: 'Modern tech dashboard interface showing analytics and data visualization',
  trustIndicators: [
    { icon: 'Users', text: 'Trusted by 500+ companies' },
    { icon: 'Zap', text: '99.9% uptime guarantee' },
    { icon: 'Shield', text: 'Enterprise-grade security' },
  ],
  statsLabel: 'Join thousands of innovators',
  backgroundPattern: true,
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handlePrimaryCTA = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryCTA = () => {
    navigate(config.secondaryCtaHref);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="h-5 w-5" />;
      case 'Zap':
        return <Zap className="h-5 w-5" />;
      case 'Shield':
        return <Shield className="h-5 w-5" />;
      default:
        return <Zap className="h-5 w-5" />;
    }
  };

  return (
    <section id="hero" className="relative bg-background text-foreground overflow-hidden">
      {/* Background Pattern */}
      {config.backgroundPattern && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--primary), 0.1), transparent 40%)`,
            }}
          />
        </div>
      )}

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid gap-12 lg:gap-20 lg:grid-cols-2 items-center">
          {/* Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Trust Badge */}
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
            >
              <span data-editable="statsLabel">{config.statsLabel}</span>
            </Badge>

            {/* Headlines */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
                <span
                  data-editable="headline"
                  className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
                >
                  {config.headline}
                </span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                <span data-editable="subheadline">{config.subheadline}</span>
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handlePrimaryCTA}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 group"
              >
                <span data-editable="ctaText">{config.ctaText}</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryCTA}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              {config.trustIndicators.map((indicator, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground"
                >
                  <div className="text-primary">{getIcon(indicator.icon)}</div>
                  <span data-editable={`trustIndicators[${idx}].text`}>{indicator.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <Card className="bg-card border-border shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500">
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={config.heroImageUrl}
                    alt={config.heroImageAlt}
                    data-editable-src="heroImageUrl"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />

                  {/* Floating elements */}
                  <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    Live Dashboard
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </section>
  );
}
