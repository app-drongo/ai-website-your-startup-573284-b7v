'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, ArrowRight } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_REVIEWS = {
  title: 'Trusted by Industry Leaders',
  subtitle: 'See what our customers are saying about our platform',
  ctaText: 'Read All Reviews',
  ctaHref: '/reviews',
  reviews: [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'CTO at TechFlow',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      content:
        'This platform has revolutionized how we handle our development workflow. The AI-powered insights have saved us countless hours and improved our code quality significantly.',
      company: 'TechFlow',
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      role: 'Lead Developer at InnovateLab',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      content:
        'The seamless integration and intuitive interface made adoption effortless. Our team productivity increased by 40% within the first month of implementation.',
      company: 'InnovateLab',
    },
    {
      id: '3',
      name: 'Emily Watson',
      role: 'Product Manager at StartupX',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      content:
        'Outstanding support and continuous innovation. The platform evolves with our needs and the customer success team is incredibly responsive and knowledgeable.',
      company: 'StartupX',
    },
  ],
} as const;

type ReviewsProps = Partial<typeof DEFAULT_REVIEWS>;

export default function Reviews(props: ReviewsProps) {
  const config = { ...DEFAULT_REVIEWS, ...props };
  const navigate = useSmartNavigation();

  const handleCTAClick = () => {
    navigate(config.ctaHref);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
      />
    ));
  };

  return (
    <section id="reviews" className="bg-background text-foreground py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-3 mb-12">
          {config.reviews.map((review, idx) => (
            <Card
              key={review.id}
              className="bg-card text-card-foreground border-border hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">{renderStars(review.rating)}</div>

                {/* Review Content */}
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  <span data-editable={`reviews[${idx}].content`}>"{review.content}"</span>
                </blockquote>

                {/* Reviewer Info */}
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={review.avatar}
                      alt={review.name}
                      data-editable-src={`reviews[${idx}].avatar`}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {review.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">
                      <span data-editable={`reviews[${idx}].name`}>{review.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span data-editable={`reviews[${idx}].role`}>{review.role}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span data-editable={`reviews[${idx}].company`}>{review.company}</span>
                    </div>
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
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
            data-editable-href="ctaHref"
            data-href={config.ctaHref}
          >
            <span data-editable="ctaText">{config.ctaText}</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
