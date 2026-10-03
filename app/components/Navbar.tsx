import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed  py-2 rounded-xl  font-primary top-5 left-0 right-0  w-full px-12 flex items-center justify-between">
      <h2 className="text-[#A3A1A6]">Zendteam</h2>
      <a href="mailto:keshi@zendt.site" target="_blank">
        <button
          style={{
            paddingInline: "24px",
            paddingBlock: "10px",
            color: "#F6EBFF ",
            borderRadius: "12px",
            fontSize: "20px",
            backgroundColor: "#7C0AF5",
          }}
          className="w-fit"
        >
          Hire Us
        </button>
      </a>
    </nav>
  );
};

export default Navbar;
