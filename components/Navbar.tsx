"use client";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#F4F4F5] border-b-2 border-[#18181B]">
      <div className="container mx-auto px-6 max-w-7xl h-16 flex items-center justify-between">
        {/* Logo: Typographic, bold, tight tracking */}
        <Link
          href="/"
          className="font-sans text-xl font-black tracking-tighter uppercase"
        >
          Zendt<span className="text-red-600">.</span>
        </Link>

        {/* Links: Uppercase, small, utilitarian */}
        <div className="hidden md:flex items-center gap-8">
          {["Methodology", "Pricing", "Manifesto"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-bold uppercase tracking-wide hover:underline decoration-2 underline-offset-4"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* CTA: High contrast box */}
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-medium hover:opacity-70">
            Log in
          </Link>
          <Link
            href="/signup"
            className="bg-[#18181B] text-white px-5 py-2.5 text-sm font-bold uppercase tracking-wide hover:bg-red-600 transition-colors"
          >
            Start Free
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
