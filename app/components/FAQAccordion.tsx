import { Accordion } from "@base-ui/react/accordion";

export default function FAQAccordion() {
  return (
    <>
      <style>{`
        .accordion-root { width: 100%; max-width: 500px; }

        .accordion-item { border-bottom: 1px solid #e8e6e1; }
        .accordion-item:first-child { border-top: 1px solid #e8e6e1; }

        .accordion-header { margin: 0; }

        .accordion-trigger {
          all: unset;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 0;
          font-size: 15px;
          font-weight: 500;
          color: #1a1a1a;
          cursor: pointer;
          transition: color 0.2s ease;
          box-sizing: border-box;
        }
        .accordion-trigger:hover { color: #888; }

        .accordion-trigger::after {
          content: '';
          display: block;
          width: 10px;
          height: 10px;
          border-right: 1.5px solid currentColor;
          border-bottom: 1.5px solid currentColor;
          transform: rotate(45deg);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
          margin-bottom: 3px;
        }
        .accordion-trigger[data-panel-open]::after {
          transform: rotate(-135deg);
          margin-bottom: -3px;
        }

        .accordion-panel {
          overflow: hidden;
          height: var(--accordion-panel-height);
          transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .accordion-panel[data-open]   { opacity: 1; }
        .accordion-panel[data-closed] { opacity: 0; }

        .accordion-panel-content {
          padding-bottom: 20px;
          font-size: 14px;
          line-height: 1.75;
          color: black;
        }
      `}</style>

      <Accordion.Root className="accordion-root">
        <Accordion.Item className="accordion-item" value="item-1">
          <Accordion.Header className="accordion-header">
            <Accordion.Trigger className="accordion-trigger">
              Can you really deliver in 14 days?
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="accordion-panel">
            <div className="accordion-panel-content">
              Yes. Design and build run in parallel, not in sequence. It's not a
              shorter process it's a different one.
            </div>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className="accordion-item" value="item-2">
          <Accordion.Header className="accordion-header">
            <Accordion.Trigger className="accordion-trigger">
              What kind of companies do you work with?
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="accordion-panel">
            <div className="accordion-panel-content">
              B2B service companies with real revenue and an outdated website.
              Recruitment agencies. Consultancies. Logistics firms. Financial
              services. If you sell services to other businesses we're likely
              the right fit.
            </div>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className="accordion-item" value="item-3">
          <Accordion.Header className="accordion-header">
            <Accordion.Trigger className="accordion-trigger">
              Where are you based?
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="accordion-panel">
            <div className="accordion-panel-content">
              We're a distributed studio. We work across EST, GST, and AEST time
              zones. Our clients are in the US, Canada, the UAE, and Australia.
              Geography has never been the point.
            </div>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className="accordion-item" value="item-4">
          <Accordion.Header className="accordion-header">
            <Accordion.Trigger className="accordion-trigger">
              Do you write the copy too?
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="accordion-panel">
            <div className="accordion-panel-content">
              On our full-service projects, yes. On smaller engagements, we
              shape your copy around the site's structure. Either way, the
              messaging comes from us.
            </div>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className="accordion-item" value="item-5">
          <Accordion.Header className="accordion-header">
            <Accordion.Trigger className="accordion-trigger">
              How much does it cost?
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="accordion-panel">
            <div className="accordion-panel-content">
              Projects start from $3,500 USD. Every project is scoped
              individually. Book a call and we'll give you a clear number within
              24 hours.
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion.Root>
    </>
  );
}
