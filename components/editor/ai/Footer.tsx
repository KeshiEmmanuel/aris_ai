import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#191919] border-t border-white/5 pt-16 pb-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          {/* Brand Column */}
          <div className="max-w-xs">
            <Link
              href="/"
              className="text-2xl font-bold text-white tracking-tight"
            >
              Zendt.
            </Link>
            <p className="mt-4 text-sm text-zinc-500 leading-relaxed">
              The AI content engine engineered for B2B SaaS startups. Master
              your brand voice and ship technical content faster.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-8 md:gap-12">
            <FooterLink href="/pricing">Pricing</FooterLink>
            <FooterLink href="/blog">Blog</FooterLink>
            <FooterLink href="/login">Login</FooterLink>
            <FooterLink href="/signup">Get Started</FooterLink>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
          <p>
            &copy; {new Date().getFullYear()} Zendt Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-zinc-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-zinc-400 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Simple helper for consistent link styling
const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
  >
    {children}
  </Link>
);

export default Footer;
