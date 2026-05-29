import React from "react";

const Projects = () => {
  return (
    <section className="py-5 font-primary flex flex-col gap-5 px-5">
      <article>
        <h2 className="text-center font-medium  text-lg">Selected Work</h2>
      </article>
      <aside className="grid grid-col-1 lg:grid-cols-2  gap-4 w-full h-full">
        <div className="w-full flex flex-col  rounded-lg h-full">
          <img src={"/obrien.png"} className="w-full" />
        </div>
        <div className="w-full flex flex-col  rounded-lg h-full">
          <img src={"/goodwin.png"} className="w-full" />
        </div>
        <div className="w-full rounded-lg animate-pulse  h-[500px] bg-gray-200"></div>
        <div className="w-full rounded-lg animate-pulse  h-[500px] bg-gray-200"></div>
      </aside>
    </section>
  );
};

export default Projects;
