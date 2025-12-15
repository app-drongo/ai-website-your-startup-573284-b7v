'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Users, TrendingUp } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { useState } from 'react';

const DEFAULT_CTA = {
  title: 'Join 10,000+ Tech Leaders',
  subtitle: 'See what our customers are building with our platform',
  description:
    'From startups to enterprise, teams trust our technology to scale their innovations and accelerate growth.',
  primaryCtaText: 'Start Free Trial',
  primaryCtaHref: '/signup',
  secondaryCtaText: 'View Pricing',
  secondaryCtaHref: '/pricing',
  testimonials: [
    {
      id: '1',
      quote:
        'This platform transformed how we ship features. Our deployment time went from hours to minutes.',
      author: 'Sarah Chen',
      role: 'CTO',
      company: 'TechFlow',
      rating: 5,
    },
    {
      id: '2',
      quote:
        'The developer experience is incredible. Our team productivity increased by 40% in the first month.',
      author: 'Marcus Rodriguez',
      role: 'Lead Engineer',
      company: 'InnovateLab',
      rating: 5,
    },
    {
      id: '3',
      quote: "Best investment we've made. The ROI was clear within weeks of implementation.",
      author: 'Emily Watson',
      role: 'VP Engineering',
      company: 'ScaleUp',
      rating: 5,
    },
  ],
  stats: [
    {
      id: '1',
      value: '10,000+',
      label: 'Active Users',
      icon: 'Users',
    },
    {
      id: '2',
      value: '99.9%',
      label: 'Uptime',
      icon: 'TrendingUp',
    },
    {
      id: '3',
      value: '4.9/5',
      label: 'Rating',
      icon: 'Star',
    },
  ],
} as const;

type CtaProps = Partial<typeof DEFAULT_CTA>;

export default function Cta(props: CtaProps) {
  const config = { ...DEFAULT_CTA, ...props };
  const navigate = useSmartNavigation();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handlePrimaryClick = () => {
    navigate(config.primaryCtaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="h-5 w-5" />;
      case 'TrendingUp':
        return <TrendingUp className="h-5 w-5" />;
      case 'Star':
        return <Star className="h-5 w-5" />;
      default:
        return <Star className="h-5 w-5" />;
    }
  };

  return (
    <section id="cta" className="bg-background text-foreground py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span data-editable="title">{config.title}</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
              <span data-editable="subtitle">{config.subtitle}</span>
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              <span data-editable="description">{config.description}</span>
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
            {config.stats.map((stat, idx) => (
              <div key={stat.id} className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-primary text-primary-foreground p-3 rounded-full">
                    {getIcon(stat.icon)}
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">
                  <span data-editable={`stats[${idx}].value`}>{stat.value}</span>
                </div>
                <div className="text-muted-foreground">
                  <span data-editable={`stats[${idx}].label`}>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {config.testimonials.map((testimonial, idx) => (
                <Card
                  key={testimonial.id}
                  className={`bg-card text-card-foreground transition-all duration-300 cursor-pointer hover:shadow-lg ${
                    activeTestimonial === idx ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setActiveTestimonial(idx)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <blockquote className="text-sm mb-4 italic">
                      "<span data-editable={`testimonials[${idx}].quote`}>{testimonial.quote}</span>
                      "
                    </blockquote>
                    <div>
                      <div className="font-semibold">
                        <span data-editable={`testimonials[${idx}].author`}>
                          {testimonial.author}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span data-editable={`testimonials[${idx}].role`}>{testimonial.role}</span>{' '}
                        at{' '}
                        <span data-editable={`testimonials[${idx}].company`}>
                          {testimonial.company}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
                onClick={handlePrimaryClick}
                data-editable-href="primaryCtaHref"
                data-href={config.primaryCtaHref}
              >
                <span data-editable="primaryCtaText">{config.primaryCtaText}</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg"
                onClick={handleSecondaryClick}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
              >
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>
            <div className="mt-6">
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                No credit card required • 14-day free trial
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
