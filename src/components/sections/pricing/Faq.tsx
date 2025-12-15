'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, MessageCircle, HelpCircle, Zap } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FAQ = {
  title: 'Frequently Asked Questions',
  subtitle: 'Everything you need to know about our unified deployment platform',
  ctaText: 'Still have questions?',
  ctaSubtext: 'Get in touch with our team',
  ctaHref: '/contact',
  faqs: [
    {
      id: '1',
      category: 'Deployment',
      question: 'How fast can I deploy my application?',
      answer:
        'With our unified deployment platform, you can deploy applications in under 30 seconds. Our optimized build pipeline and global CDN ensure lightning-fast deployments across all supported frameworks including Next.js, React, Vue, and more.',
      icon: 'zap',
    },
    {
      id: '2',
      category: 'Platform',
      question: 'What frameworks and technologies do you support?',
      answer:
        'We support all major frontend frameworks including Next.js, React, Vue.js, Angular, Svelte, and static sites. Our platform also handles serverless functions, databases, and integrates seamlessly with your existing CI/CD workflows.',
      icon: 'help',
    },
    {
      id: '3',
      category: 'Support',
      question: 'Do you offer 24/7 technical support?',
      answer:
        'Yes! Our enterprise customers get 24/7 priority support with dedicated solution architects. All plans include comprehensive documentation, community forums, and email support with guaranteed response times.',
      icon: 'message',
    },
    {
      id: '4',
      category: 'Scaling',
      question: 'How does auto-scaling work?',
      answer:
        'Our platform automatically scales your applications based on traffic patterns and resource usage. You only pay for what you use, with intelligent load balancing and edge caching to ensure optimal performance worldwide.',
      icon: 'zap',
    },
    {
      id: '5',
      category: 'Security',
      question: 'What security measures are in place?',
      answer:
        'We implement enterprise-grade security including SSL certificates, DDoS protection, automated security scanning, and SOC 2 compliance. Your code and data are encrypted at rest and in transit with regular security audits.',
      icon: 'help',
    },
    {
      id: '6',
      category: 'Integration',
      question: 'Can I integrate with my existing tools?',
      answer:
        'Absolutely! We offer seamless integrations with GitHub, GitLab, Bitbucket, Slack, Discord, and hundreds of other tools through our API and webhooks. Custom integrations are also supported.',
      icon: 'message',
    },
  ],
} as const;

type FaqProps = Partial<typeof DEFAULT_FAQ>;

export default function Faq(props: FaqProps) {
  const config = { ...DEFAULT_FAQ, ...props };
  const navigate = useSmartNavigation();
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return <Zap className="h-5 w-5 text-primary" />;
      case 'message':
        return <MessageCircle className="h-5 w-5 text-primary" />;
      default:
        return <HelpCircle className="h-5 w-5 text-primary" />;
    }
  };

  const categories = Array.from(new Set(config.faqs.map(faq => faq.category)));

  return (
    <section id="faq" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category, idx) => (
            <div
              key={category}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
            >
              <span data-editable={`categories[${idx}]`}>{category}</span>
            </div>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-16">
          {config.faqs.map((faq, idx) => {
            const isOpen = openItems.has(faq.id);
            return (
              <Card key={faq.id} className="bg-card text-card-foreground border-border">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-6 text-left hover:bg-accent hover:text-accent-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex-shrink-0 mt-1">{getIcon(faq.icon)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                              <span data-editable={`faqs[${idx}].category`}>{faq.category}</span>
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold">
                            <span data-editable={`faqs[${idx}].question`}>{faq.question}</span>
                          </h3>
                        </div>
                      </div>
                      <div className="flex-shrink-0 mt-1">
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      className="px-6 pb-6 pt-0 animate-in slide-in-from-top-2 duration-200"
                    >
                      <div className="ml-9 pl-4 border-l-2 border-border">
                        <p className="text-muted-foreground leading-relaxed">
                          <span data-editable={`faqs[${idx}].answer`}>{faq.answer}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-primary text-primary-foreground p-8 sm:p-12">
            <CardContent className="p-0">
              <div className="flex flex-col items-center gap-6">
                <div className="bg-primary-foreground/10 p-4 rounded-full">
                  <MessageCircle className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">
                    <span data-editable="ctaText">{config.ctaText}</span>
                  </h3>
                  <p className="text-primary-foreground/80 mb-6">
                    <span data-editable="ctaSubtext">{config.ctaSubtext}</span>
                  </p>
                  <Button
                    onClick={() => navigate(config.ctaHref)}
                    data-editable-href="ctaHref"
                    data-href={config.ctaHref}
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 py-3"
                  >
                    Contact Support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
