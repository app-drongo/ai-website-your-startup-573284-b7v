'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Twitter, Linkedin, Github, MessageSquare, Leaf } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  companyName: 'EcoTech Solutions',
  tagline: 'Building sustainable technology for a greener tomorrow',
  copyright: '© 2024 EcoTech Solutions. All rights reserved.',

  // Company section
  companyLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Sustainability', href: '/sustainability' },
  ],

  // Legal section
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Environmental Impact', href: '/impact' },
  ],

  // Social media
  socialLinks: [
    { platform: 'Twitter', href: 'https://twitter.com/ecotechsolutions', icon: 'twitter' },
    {
      platform: 'LinkedIn',
      href: 'https://linkedin.com/company/ecotechsolutions',
      icon: 'linkedin',
    },
    { platform: 'GitHub', href: 'https://github.com/ecotechsolutions', icon: 'github' },
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
    <footer
      id="footer"
      className="relative bg-cover bg-center bg-no-repeat border-t border-border"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=600&fit=crop')",
      }}
    >
      {/* Green overlay for theme and text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-emerald-800/85 to-teal-900/90" />

      {/* Content with z-10 to appear above overlay */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-green-300" />
              <h3 className="text-lg font-semibold text-white">
                <span data-editable="companyName">{config.companyName}</span>
              </h3>
            </div>
            <p className="text-green-100 mb-6 max-w-md">
              <span data-editable="tagline">{config.tagline}</span>
            </p>

            {/* Social links */}
            <div className="flex space-x-4">
              {config.socialLinks.map((social, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0 text-green-200 hover:bg-green-700/50 hover:text-green-100 border border-green-600/30"
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
            <h4 className="font-semibold mb-4 text-green-100">Company</h4>
            <ul className="space-y-3">
              {config.companyLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 font-normal text-green-200 hover:text-green-100 justify-start hover:bg-transparent"
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
            <h4 className="font-semibold mb-4 text-green-100">Legal</h4>
            <ul className="space-y-3">
              {config.legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 font-normal text-green-200 hover:text-green-100 justify-start hover:bg-transparent"
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

        <Separator className="my-8 bg-green-600/30" />

        {/* Copyright */}
        <div className="text-center text-sm text-green-200">
          <span data-editable="copyright">{config.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
