function MainFooter() {
  return (
    <footer className="h-screen px-10  bg-black text-gray-100 pt-20 pb-10">
      <article className="flex flex-col h-full justify-between">
        <h1 className="text-8xl">
          Your next client is already looking at your website.
        </h1>
        <aside className="flex flex-col gap-10">
          <div className="flex justify-between">
            <button className="text-6xl bg-[#c8ff00] px-12 py-6 rounded-full text-black">
              {" "}
              Let's make sure it holds up
            </button>

            <p className="max-w-[480px]">
              Book a 20-minute call. No pitch. No deck. Just a conversation
              about whether we're the right fit.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p>ZENDT STUDIO © 2026</p>
            <a href="https://linkedin.com/company/zendt-studio" target="_blank">
              LINKEDIN{" "}
            </a>
            <a href="mailto:keshi@zendt.site" target="_blank">
              keshi@zendt.site
            </a>
          </div>
        </aside>
      </article>
    </footer>
  );
}

export default MainFooter;
