'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Twitter, Linkedin, Github, MessageSquare } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  companyName: 'Your Startup',
  tagline: "Transforming ideas into scalable solutions for tomorrow's digital world",
  copyright: '© 2024 Your Startup. All rights reserved.',

  // Company section
  companyLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
  ],

  // Legal section
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],

  // Social media
  socialLinks: [
    { platform: 'Twitter', href: 'https://twitter.com/yourstartup', icon: 'twitter' },
    { platform: 'LinkedIn', href: 'https://linkedin.com/company/yourstartup', icon: 'linkedin' },
    { platform: 'GitHub', href: 'https://github.com/yourstartup', icon: 'github' },
    { platform: 'Discord', href: 'https://discord.gg/yourstartup', icon: 'discord' },
  ],
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const getSocialIcon = (iconType: string) => {
    switch (iconType) {
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'github':
        return <Github className="h-5 w-5" />;
      case 'discord':
        return <MessageSquare className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const handleNavigation = (href: string) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener noreferrer');
    } else {
      navigate(href);
    }
  };

  return (
    <footer id="footer" className="bg-background text-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">
              <span data-editable="companyName">{config.companyName}</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              <span data-editable="tagline">{config.tagline}</span>
            </p>

            {/* Social links */}
            <div className="flex space-x-4">
              {config.socialLinks.map((social, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0 hover:bg-accent hover:text-accent-foreground"
                  onClick={() => handleNavigation(social.href)}
                  data-editable-href={`socialLinks[${idx}].href`}
                  data-href={social.href}
                  aria-label={`Visit our ${social.platform} page`}
                >
                  {getSocialIcon(social.icon)}
                </Button>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-3">
              {config.companyLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 font-normal text-muted-foreground hover:text-foreground justify-start"
                    onClick={() => handleNavigation(link.href)}
                    data-editable-href={`companyLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`companyLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-3">
              {config.legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 font-normal text-muted-foreground hover:text-foreground justify-start"
                    onClick={() => handleNavigation(link.href)}
                    data-editable-href={`legalLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`legalLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          <span data-editable="copyright">{config.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
