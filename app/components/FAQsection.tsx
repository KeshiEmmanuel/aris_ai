import FAQAccordion from "./FAQAccordion";

const FAQsection = () => {
  return (
    <section className="h-[80vh] pt-30 max-w-[1000px] mx-auto flex flex-col lg:flex-row  gap-10 px-4  lg:px-0  lg:justify-between">
      <small className="uppercase font-medium">questions</small>
      <FAQAccordion />
    </section>
  );
};

export default FAQsection;
