import { useTranslation } from "react-i18next";

const ServiceFaq = () => {
  const { t } = useTranslation();
  return (
    <section className="my-7 md:my-14">
      <h4 className="font-semibold text-36px text-center mb-2 text-primary-dark">
        {t("service_faq_title", { defaultValue: "What is included in your service" })}
      </h4>
      <p className="font-normal text-base text-primary-dark text-center mb-8 ">
        {t("service_faq_subtitle", { defaultValue: "Comprehensive cleaning checklist to ensure every corner of your space is spotless" })}
      </p>

      <div className="md:w-[50%] mx-auto ">
        <div className="accordion divide-neutral/20 divide-y">
          <div className="accordion-item border-0 active" id="payment-icon">
            <button
              className="accordion-toggle inline-flex items-center justify-between text-start bg-surface-light "
              aria-controls="payment-icon-collapse"
              aria-expanded="true"
            >
              <span className="inline-flex items-center gap-x-4">
                <span className="icon-[tabler--credit-card-pay] text-base-content size-6"></span>
                {t("faq.kitchen_deep_clean.title", { defaultValue: "Kitchen Deep Clean" })}
              </span>
              <span className="icon-[tabler--chevron-left] accordion-item-active:-rotate-90 text-base- size-4.5 shrink-0 transition-transform duration-300 rtl:-rotate-180"></span>
            </button>
            <div
              id="payment-icon-collapse"
              className="accordion-content w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby="payment-icon"
              role="region"
            >
              <div className="px-5 pb-4">
                <p className="text-base-content/80 font-normal">
                  {t("faq.kitchen_deep_clean.content", { defaultValue: "Payment is taken during the checkout process when you pay for your order. The order number that appears on the confirmation screen indicates payment has been successfully processed." })}
                </p>
              </div>
            </div>
          </div>
          <div className="accordion-item border-0" id="delivery-icon">
            <button
              className="accordion-toggle inline-flex items-center justify-between text-start bg-surface-light "
              aria-controls="delivery-icon-collapse"
              aria-expanded="false"
            >
              <span className="inline-flex items-center gap-x-4">
                <span className="icon-[tabler--shopping-bag] text-base-content size-6"></span>
                {t("faq.delivery.title", { defaultValue: "How would you ship my order?" })}
              </span>
              <span className="icon-[tabler--chevron-left] accordion-item-active:-rotate-90 text-base- size-4.5 shrink-0 transition-transform duration-300 rtl:-rotate-180"></span>
            </button>
            <div
              id="delivery-icon-collapse"
              className="accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby="delivery-icon"
              role="region"
            >
              <div className="px-5 pb-4">
                <p className="text-base-content/80 font-normal">
                  {t("faq.delivery.content", { defaultValue: "For large products, we deliver your product via a third party logistics company offering you the “room of choice” scheduled delivery service. For small products, we offer free parcel delivery." })}
                </p>
              </div>
            </div>
          </div>
          <div className="accordion-item" id="cancel-icon">
            <button
              className="accordion-toggle inline-flex items-center justify-between text-start bg-surface-light "
              aria-controls="cancel-icon-collapse"
              aria-expanded="false"
            >
              <span className="inline-flex items-center gap-x-4">
                <span className="icon-[tabler--ban] text-base-content size-6"></span>
                {t("faq.cancel.title", { defaultValue: "Can I cancel my order?" })}
              </span>
              <span className="icon-[tabler--chevron-left] accordion-item-active:-rotate-90 text-base- size-4.5 shrink-0 transition-transform duration-300 rtl:-rotate-180"></span>
            </button>
            <div
              id="cancel-icon-collapse"
              className="accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby="cancel-icon"
              role="region"
            >
              <div className="px-5 pb-4">
                <p className="text-base-content/80 font-normal">
                  {t("faq.cancel.content", { defaultValue: "Scheduled delivery orders can be cancelled 72 hours prior to your selected delivery date for full refund." })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceFaq;
