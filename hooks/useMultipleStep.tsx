import { ReactElement, useState } from "react";

function useMulitiStep(elements: ReactElement[]) {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  function next() {
    setCurrentPageIndex((index) => {
      if ((index as number) >= elements.length - 1) return index;
      return index + 1;
    });
  }
  function back() {
    setCurrentPageIndex((index) => {
      if ((index as number) <= 0) return index;
      return index - 1;
    });
  }

  function goTo(index: number) {
    setCurrentPageIndex(index);
  }

  return {
    step: elements[currentPageIndex as number],
    steps: elements.length,
    back,
    next,
    goTo,
    isFirstStep: currentPageIndex === 0,
    currentPageIndex,
    isLastStep: currentPageIndex === elements.length - 1,
  };
}

export default useMulitiStep;
