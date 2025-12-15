'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FEATURES = {
  title: 'What Our Customers Say',
  subtitle:
    "Don't just take our word for it - hear from the companies already transforming their workflows with our platform",
  ctaText: 'Read All Reviews',
  ctaHref: '/testimonials',
  previews: [
    {
      id: '1',
      company: 'TechFlow Inc',
      companyLogo:
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
      customerName: 'Sarah Chen',
      customerRole: 'VP of Engineering',
      customerAvatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      preview:
        'This platform has completely revolutionized how we handle our development workflow. The automation features alone have saved us 40+ hours per week...',
      fullTestimonial:
        'This platform has completely revolutionized how we handle our development workflow. The automation features alone have saved us 40+ hours per week, and the intuitive interface means our entire team was productive from day one.',
      metrics: {
        improvement: '40+ hours saved weekly',
        category: 'Development',
      },
    },
    {
      id: '2',
      company: 'DataSync Solutions',
      companyLogo:
        'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop&crop=center',
      customerName: 'Marcus Rodriguez',
      customerRole: 'CTO',
      customerAvatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      preview:
        "The scalability and performance improvements we've seen are incredible. Our data processing times have decreased by 60% while handling 3x more volume...",
      fullTestimonial:
        "The scalability and performance improvements we've seen are incredible. Our data processing times have decreased by 60% while handling 3x more volume. The ROI was evident within the first month.",
      metrics: {
        improvement: '60% faster processing',
        category: 'Performance',
      },
    },
    {
      id: '3',
      company: 'InnovateLab',
      companyLogo:
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop&crop=center',
      customerName: 'Emily Watson',
      customerRole: 'Product Manager',
      customerAvatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      preview:
        "The collaboration features have transformed how our remote team works together. We've reduced meeting time by 50% while increasing productivity...",
      fullTestimonial:
        "The collaboration features have transformed how our remote team works together. We've reduced meeting time by 50% while increasing productivity. It's like having everyone in the same room again.",
      metrics: {
        improvement: '50% fewer meetings',
        category: 'Collaboration',
      },
    },
  ],
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };
  const navigate = useSmartNavigation();

  const handleCTAClick = () => {
    navigate(config.ctaHref);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
      />
    ));
  };

  return (
    <section id="features" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* Customer Previews Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {config.previews.map((preview, idx) => (
            <Card
              key={preview.id}
              className="bg-card text-card-foreground border-border hover:shadow-lg transition-all duration-300 group"
            >
              <CardContent className="p-6">
                {/* Company Header */}
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={preview.companyLogo}
                    alt={`${preview.company} logo`}
                    width={40}
                    height={40}
                    className="rounded-lg object-cover"
                    data-editable-src={`previews[${idx}].companyLogo`}
                  />
                  <div>
                    <h3 className="font-semibold text-sm">
                      <span data-editable={`previews[${idx}].company`}>{preview.company}</span>
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      <span data-editable={`previews[${idx}].metrics.category`}>
                        {preview.metrics.category}
                      </span>
                    </Badge>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">{renderStars(preview.rating)}</div>
                  <span className="text-sm text-muted-foreground">{preview.rating}.0</span>
                </div>

                {/* Preview Text */}
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-1 w-5 h-5 text-primary/20" />
                  <p className="text-sm text-muted-foreground leading-relaxed pl-4">
                    <span data-editable={`previews[${idx}].preview`}>{preview.preview}</span>
                  </p>
                </div>

                {/* Metrics */}
                <div className="bg-primary/5 rounded-lg p-3 mb-4">
                  <p className="text-sm font-medium text-primary">
                    <span data-editable={`previews[${idx}].metrics.improvement`}>
                      {preview.metrics.improvement}
                    </span>
                  </p>
                </div>

                {/* Customer Info */}
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={preview.customerAvatar}
                      alt={preview.customerName}
                      data-editable-src={`previews[${idx}].customerAvatar`}
                    />
                    <AvatarFallback>
                      {preview.customerName
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">
                      <span data-editable={`previews[${idx}].customerName`}>
                        {preview.customerName}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span data-editable={`previews[${idx}].customerRole`}>
                        {preview.customerRole}
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={handleCTAClick}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            data-editable-href="ctaHref"
            data-href={config.ctaHref}
          >
            <span data-editable="ctaText">{config.ctaText}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
