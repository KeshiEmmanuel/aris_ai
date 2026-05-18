import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed  px-4 py-2 rounded-full  font-primary top-5 left-0 right-0  w-full max-w-[1000px] z-10 bg-white  mx-auto">
      <div className=" flex items-center justify-between">
        <aside className="flex items-center gap-2">
          <img src={"/zendt_new_logo.jpeg"} className="w-6 h-6 rounded" />
          <p className="text-sm font-semibold">Zendt</p>
        </aside>
        <ul className="flex items-center justify-between gap-2">
          <li>
            <a>Work.</a>
          </li>
          <li>
            <a>Process.</a>
          </li>
          <li>
            <a>Studio.</a>
          </li>
        </ul>
        <button className="bg-black text-gray-200 px-4 py-2 text-sm  rounded-full">
          Let's Talk
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
