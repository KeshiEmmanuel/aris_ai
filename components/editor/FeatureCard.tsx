import Image from "next/image";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "The Blog Engine",
    subtitle: "Long-Form Technical Content",
    description:
      "Generates SEO-ready articles rooted in your specific expertise. No fluff, just value.",
    className: "md:col-span-2",
    meta: "01",
  },
  {
    title: "Update Log",
    subtitle: "Product Marketing",
    description: "Turn Jira tickets into user-facing announcements instantly.",
    className: "md:col-span-1",
    meta: "02",
  },
  {
    title: "The Outreach",
    subtitle: "Cold Email & Nurture",
    description: "Sequences that respect the recipient's intelligence.",
    className: "md:col-span-1",
    meta: "03",
  },
  {
    title: "Landing Page",
    subtitle: "Conversion Copy",
    description:
      "Headlines and value props that speak to specific pain points.",
    className: "md:col-span-2",
    meta: "04",
  },
];

const BentoGrid = () => {
  return (
    <section className="py-24 bg-[#F4F4F5]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16 border-l-4 border-[#18181B] pl-6">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            System Modules
          </h2>
          <p className="text-xl text-zinc-600 max-w-2xl">
            Four specialized writers. One unified voice.
          </p>
        </div>

        {/* The Grid: Heavy borders, no rounded corners, utilitarian */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-[#18181B] bg-[#18181B]">
          {features.map((feature, i) => (
            <div
              key={i}
              className={cn(
                "group relative bg-[#F4F4F5] p-8 md:p-12 border-b-2 md:border-b-0 md:border-r-2 border-[#18181B] last:border-0 hover:bg-white transition-colors",
                feature.className,
              )}
            >
              <div className="flex justify-between items-start mb-12">
                <span className="font-mono text-xs font-bold text-red-600 border border-red-600 px-2 py-1">
                  MOD_{feature.meta}
                </span>
                <div className="w-8 h-8 rounded-full border-2 border-[#18181B] flex items-center justify-center group-hover:bg-[#18181B] group-hover:text-white transition-colors">
                  <span className="text-lg">↘</span>
                </div>
              </div>

              <h3 className="text-3xl font-black uppercase tracking-tight mb-2">
                {feature.title}
              </h3>
              <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-6">
                {feature.subtitle}
              </h4>
              <p className="text-lg font-medium text-zinc-800 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
