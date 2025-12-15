'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Leaf, MessageCircle } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FAQ = {
  title: 'Frequently Asked Questions',
  subtitle: 'Everything you need to know about our eco-friendly platform',
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
    <section
      id="faq"
      className="relative min-h-screen bg-cover bg-center bg-no-repeat py-20"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop')",
      }}
    >
      {/* Green overlay for theme */}
      <div className="absolute inset-0 bg-green-900/80" />

      {/* Content with z-10 to appear above overlay */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 backdrop-blur-sm rounded-full mb-6 border border-green-400/30">
            <Leaf className="w-8 h-8 text-green-300" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
            <span data-editable="title">{config.title}</span>
          </h2>

          <p className="text-lg sm:text-xl text-green-100 mb-6 max-w-2xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-12">
          {config.faqs.map((faq, idx) => {
            const isOpen = openItems.has(faq.id);

            return (
              <Card
                key={faq.id}
                className="bg-white/10 backdrop-blur-md border-green-400/30 text-white"
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-green-500/20 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <h3 className="text-lg font-semibold pr-4 text-white">
                      <span data-editable={`faqs[${idx}].question`}>{faq.question}</span>
                    </h3>

                    <div className="flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-green-300" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-green-300" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div id={`faq-answer-${faq.id}`} className="px-6 pb-6 pt-0">
                      <div className="text-green-100 leading-relaxed">
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
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 sm:p-12 border border-green-400/30">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full mb-4">
              <MessageCircle className="w-6 h-6 text-green-300" />
            </div>

            <p className="text-green-100 mb-6 max-w-md mx-auto">
              <span data-editable="description">{config.description}</span>
            </p>

            <Button
              onClick={handleContactClick}
              className="bg-green-600 text-white hover:bg-green-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
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
