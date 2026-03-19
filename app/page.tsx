export default function HomePage() {
  return (
    <section className="pt-10 h-[95vh]">
      <div className="flex flex-col p-10 justify-between h-full">
        <div className="flex justify-between">
          {/*<h1 className="text-9xl font-satoshi font-bold">
            Beautiful <br /> is Not Enough.
          </h1>*/}
          <div>
            <h2>Works</h2>
          </div>
        </div>
        <div className="flex justify-between font-sans">
          <p className="w-[700px] font-grotesk">
            <strong className="font-bold underline text-2xl">ZENDT</strong> is a
            web development studio for architecture firms and interior design
            studios that want more than a good-looking site. We build with{" "}
            <span className="uppercase font-bold text-2xl">one </span> question
            in mind: what does this website need to do for your business? Then
            we go make that happen from the first interaction to the first
            qualified lead it sends your way. We&apos;re not a vendor.
            We&apos;re the people you call when the work is serious. Currently
            booking our first founding clients at a reduced rate in exchange for
            full transparency on results.
          </p>
          <div className="flex items-center justify-center p-8 bg-[#EBE8EB]">
            <button
              className="
              font-satoshi
              px-6 py-2.5
              text-[17px] font-medium text-white
              rounded-[12px]
              bg-gradient-to-b from-[#3a3a3a] to-[#111111]
              border border-[#050505]
              shadow-[0_4px_6px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.25)]
              hover:from-[#454545] hover:to-[#1a1a1a]
              transition-all duration-200 ease-in-out
              active:scale-95 active:shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)]
            "
            >
              Book 15-min intro call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
