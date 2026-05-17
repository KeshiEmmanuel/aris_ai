import React from "react";

const Projects = () => {
  return (
    <section className="py-5 font-primary flex flex-col gap-5 px-5 h-screen">
      <article>
        <h2 className="text-center text-lg">Selected Work</h2>
      </article>
      <aside className="flex gap-4 w-full flex-wrap  h-full">
        <div className="w-[700px] rounded-lg animate-pulse  h-[500px] bg-gray-200"></div>
        <div className="w-[700px] rounded-lg animate-pulse  h-[500px] bg-gray-200"></div>
        <div className="w-[700px] rounded-lg animate-pulse  h-[500px] bg-gray-200"></div>
        <div className="w-[700px] rounded-lg animate-pulse  h-[500px] bg-gray-200"></div>
      </aside>
    </section>
  );
};

export default Projects;
