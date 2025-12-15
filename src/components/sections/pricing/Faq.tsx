'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, MessageCircle, Mail } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FAQ = {
  title: 'Frequently Asked Questions',
  subtitle: 'Everything you need to know about our pricing and platform',
  contactText: 'Still have questions?',
  contactDescription: "Can't find the answer you're looking for? Please chat to our friendly team.",
  contactButtonText: 'Get in touch',
  contactHref: '/contact',
  faqs: [
    {
      id: '1',
      question: "What's included in the free plan?",
      answer:
        'Our free plan includes up to 3 projects, 5GB storage, basic analytics, and community support. Perfect for getting started with small projects and testing our platform.',
    },
    {
      id: '2',
      question: 'Can I upgrade or downgrade my plan anytime?',
      answer:
        'Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades will take effect at the end of your current billing cycle. No long-term contracts required.',
    },
    {
      id: '3',
      question: 'Do you offer refunds?',
      answer:
        "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team within 30 days of your purchase for a full refund.",
    },
    {
      id: '4',
      question: 'Is there a setup fee?',
      answer:
        'No setup fees, ever. You only pay for your chosen plan. We believe in transparent pricing with no hidden costs or surprise charges.',
    },
    {
      id: '5',
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise plans. All payments are processed securely.',
    },
    {
      id: '6',
      question: 'How does billing work for teams?',
      answer:
        'Team billing is per seat, billed monthly or annually. You can add or remove team members anytime, and billing adjusts automatically on your next cycle.',
    },
  ],
} as const;

type FaqProps = Partial<typeof DEFAULT_FAQ>;

export default function Faq(props: FaqProps) {
  const config = { ...DEFAULT_FAQ, ...props };
  const navigate = useSmartNavigation();
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setOpenItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const handleContactClick = () => {
    navigate(config.contactHref);
  };

  return (
    <section id="faq" className="bg-background text-foreground py-24">
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

        {/* FAQ Items */}
        <div className="space-y-4 mb-16">
          {config.faqs.map((faq, idx) => (
            <Card key={faq.id} className="bg-card text-card-foreground border-border">
              <Collapsible
                open={openItems.includes(faq.id)}
                onOpenChange={() => toggleItem(faq.id)}
              >
                <CollapsibleTrigger className="w-full">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between text-left">
                      <h3 className="text-lg font-semibold pr-4">
                        <span data-editable={`faqs[${idx}].question`}>{faq.question}</span>
                      </h3>
                      <ChevronDown
                        className={`h-5 w-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                          openItems.includes(faq.id) ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </CardContent>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="px-6 pb-6 pt-0">
                    <div className="text-muted-foreground leading-relaxed">
                      <span data-editable={`faqs[${idx}].answer`}>{faq.answer}</span>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <Card className="bg-muted text-muted-foreground border-border">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary text-primary-foreground p-3 rounded-full">
                <MessageCircle className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              <span data-editable="contactText">{config.contactText}</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              <span data-editable="contactDescription">{config.contactDescription}</span>
            </p>
            <Button
              onClick={handleContactClick}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-editable-href="contactHref"
              data-href={config.contactHref}
            >
              <Mail className="h-4 w-4 mr-2" />
              <span data-editable="contactButtonText">{config.contactButtonText}</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
