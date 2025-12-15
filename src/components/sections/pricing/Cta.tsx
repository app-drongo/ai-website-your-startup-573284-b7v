'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Users, TrendingUp, Leaf } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { useState } from 'react';

const DEFAULT_CTA = {
  title: 'Join 10,000+ Eco-Tech Leaders',
  subtitle: 'Building sustainable technology solutions for tomorrow',
  description:
    'From green startups to sustainable enterprises, teams trust our platform to scale their eco-innovations and accelerate sustainable growth.',
  primaryCtaText: 'Start Green Journey',
  primaryCtaHref: '/signup',
  secondaryCtaText: 'View Eco Plans',
  secondaryCtaHref: '/pricing',
  testimonials: [
    {
      id: '1',
      quote:
        'This platform helped us reduce our carbon footprint by 60% while doubling our deployment speed.',
      author: 'Sarah Chen',
      role: 'CTO',
      company: 'EcoFlow',
      rating: 5,
    },
    {
      id: '2',
      quote:
        'The sustainable development tools are game-changing. Our green initiatives increased by 40%.',
      author: 'Marcus Rodriguez',
      role: 'Lead Engineer',
      company: 'GreenLab',
      rating: 5,
    },
    {
      id: '3',
      quote: 'Best eco-tech investment. Clear environmental and financial ROI within weeks.',
      author: 'Emily Watson',
      role: 'VP Sustainability',
      company: 'EcoScale',
      rating: 5,
    },
  ],
  stats: [
    {
      id: '1',
      value: '10,000+',
      label: 'Green Users',
      icon: 'Users',
    },
    {
      id: '2',
      value: '60%',
      label: 'CO₂ Reduction',
      icon: 'Leaf',
    },
    {
      id: '3',
      value: '4.9/5',
      label: 'Eco Rating',
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
      case 'Leaf':
        return <Leaf className="h-5 w-5" />;
      case 'Star':
        return <Star className="h-5 w-5" />;
      default:
        return <Star className="h-5 w-5" />;
    }
  };

  return (
    <section
      id="cta"
      className="relative min-h-screen bg-cover bg-center bg-no-repeat py-20 lg:py-32"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop')",
      }}
    >
      {/* Green overlay for theme */}
      <div className="absolute inset-0 bg-green-900/70" />

      {/* Content with z-10 to appear above overlay */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">
              <span data-editable="title">{config.title}</span>
            </h2>
            <p className="text-xl text-green-100 mb-4 max-w-3xl mx-auto">
              <span data-editable="subtitle">{config.subtitle}</span>
            </p>
            <p className="text-lg text-green-200 max-w-2xl mx-auto">
              <span data-editable="description">{config.description}</span>
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
            {config.stats.map((stat, idx) => (
              <div key={stat.id} className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-green-600 text-white p-3 rounded-full shadow-lg">
                    {getIcon(stat.icon)}
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2 text-white">
                  <span data-editable={`stats[${idx}].value`}>{stat.value}</span>
                </div>
                <div className="text-green-200">
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
                  className={`bg-white/95 backdrop-blur-sm text-foreground transition-all duration-300 cursor-pointer hover:shadow-xl hover:bg-white ${
                    activeTestimonial === idx ? 'ring-2 ring-green-400 shadow-xl' : ''
                  }`}
                  onClick={() => setActiveTestimonial(idx)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-green-500 text-green-500" />
                      ))}
                    </div>
                    <blockquote className="text-sm mb-4 italic text-gray-700">
                      "<span data-editable={`testimonials[${idx}].quote`}>{testimonial.quote}</span>
                      "
                    </blockquote>
                    <div>
                      <div className="font-semibold text-gray-900">
                        <span data-editable={`testimonials[${idx}].author`}>
                          {testimonial.author}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
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
                className="bg-green-600 text-white hover:bg-green-700 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
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
                className="px-8 py-4 text-lg bg-white/90 backdrop-blur-sm border-green-300 text-green-800 hover:bg-white hover:border-green-400 shadow-lg"
                onClick={handleSecondaryClick}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
              >
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>
            <div className="mt-6">
              <Badge className="bg-green-100/90 text-green-800 border-green-300 backdrop-blur-sm">
                🌱 Carbon neutral hosting • 14-day eco trial
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
