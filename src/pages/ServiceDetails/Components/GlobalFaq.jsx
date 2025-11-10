import FaqItem from "../../../composable/FaqItem";
import { useTranslation } from "react-i18next";

const GlobalFaq = () => {
  const { t } = useTranslation();
  return (
  <section className="my-7 md:my-14">
    <h4 className="font-semibold text-36px text-center mb-2 text-primary-dark">
      {t("frequently_asked_questions", { defaultValue: "Frequently Asked Questions" })}
    </h4>
    <p className="font-normal text-base text-primary-dark text-center mb-8">
      {t("faq_intro", { defaultValue: "Everything you need to know about our deep cleaning service" })}
    </p>
    <div className="md:w-[50%] mx-auto divide-neutral/20 divide-y">
      <FaqItem
        icon="tabler--credit-card-pay"
        title={t("faq.duration_title", { defaultValue: "How long does the service take?" })}
      >
        {t(
          "faq.duration_content",
          {
            defaultValue:
              "Payment is taken during checkout when you pay for your order. The order number that appears on the confirmation screen indicates successful payment.",
          }
        )}
      </FaqItem>

      <FaqItem icon="tabler--shopping-bag" title={t("faq.shipping_title", { defaultValue: "How would you ship my order?" })}>
        {t(
          "faq.shipping_content",
          { defaultValue: "For large products, we deliver via a third party logistics company. For smaller items, we offer free parcel delivery." }
        )}
      </FaqItem>

      <FaqItem icon="tabler--ban" title={t("faq.cancel_title", { defaultValue: "Can I cancel my order?" })}>
        {t(
          "faq.cancel_content",
          { defaultValue: "Scheduled delivery orders can be cancelled 72 hours before your selected date for a full refund." }
        )}
      </FaqItem>
    </div>
  </section>
);

};

export default GlobalFaq;