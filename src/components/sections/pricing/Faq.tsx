'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FAQ = {
  title: 'Frequently Asked Questions',
  subtitle: 'Everything you need to know about our platform',
  description: "Can't find the answer you're looking for? Reach out to our customer support team.",
  ctaText: 'Contact Support',
  ctaHref: '/contact',
  faqs: [
    {
      id: '1',
      question: 'What programming languages do you support?',
      answer:
        'We support all major programming languages including JavaScript, Python, Java, C++, Go, Rust, and many more. Our platform is language-agnostic and can adapt to your tech stack.',
    },
    {
      id: '2',
      question: 'How does the pricing work?',
      answer:
        'Our pricing is based on usage and team size. We offer flexible plans starting from individual developers to enterprise teams. All plans include core features with different usage limits and advanced capabilities.',
    },
    {
      id: '3',
      question: 'Is there a free trial available?',
      answer:
        'Yes! We offer a 14-day free trial with full access to all features. No credit card required. You can upgrade, downgrade, or cancel anytime during or after the trial period.',
    },
    {
      id: '4',
      question: 'What kind of integrations do you offer?',
      answer:
        'We integrate with popular development tools including GitHub, GitLab, Bitbucket, Jira, Slack, Discord, and many CI/CD platforms. We also provide REST APIs and webhooks for custom integrations.',
    },
    {
      id: '5',
      question: 'How secure is your platform?',
      answer:
        'Security is our top priority. We use enterprise-grade encryption, SOC 2 compliance, regular security audits, and follow industry best practices. Your code and data are always protected and never shared.',
    },
    {
      id: '6',
      question: 'Do you offer customer support?',
      answer:
        'Absolutely! We provide 24/7 customer support via chat, email, and video calls. Our technical team is always ready to help you get the most out of our platform.',
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

  const handleContactClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="faq" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-12">
          {config.faqs.map((faq, idx) => {
            const isOpen = openItems.has(faq.id);

            return (
              <Card key={faq.id} className="bg-card text-card-foreground border-border">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-accent/50 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <h3 className="text-lg font-semibold pr-4">
                      <span data-editable={`faqs[${idx}].question`}>{faq.question}</span>
                    </h3>

                    <div className="flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div id={`faq-answer-${faq.id}`} className="px-6 pb-6 pt-0">
                      <div className="text-muted-foreground leading-relaxed">
                        <span data-editable={`faqs[${idx}].answer`}>{faq.answer}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <div className="bg-muted/50 rounded-2xl p-8 sm:p-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>

            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              <span data-editable="description">{config.description}</span>
            </p>

            <Button
              onClick={handleContactClick}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
