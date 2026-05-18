import FAQAccordion from "./FAQAccordion";

const FAQsection = () => {
  return (
    <section className="h-[70vh] pt-30 max-w-[1000px] mx-auto flex justify-between">
      <small className="uppercase font-medium">questions</small>
      <FAQAccordion />
    </section>
  );
};

export default FAQsection;
