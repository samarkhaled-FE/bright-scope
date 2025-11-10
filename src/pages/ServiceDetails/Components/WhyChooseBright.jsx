import React from "react";
import { useTranslation } from "react-i18next";

const WhyChooseBright = () => {
  const { t } = useTranslation();
  const items = [
    {
      icon: "icon-[iconamoon--shield]",
      title: t("why.background_verified", { defaultValue: "Background Verified" }),
      description: t("why.background_verified_desc", { defaultValue: "Every team member undergoes thorough background checks" }),
    },
    {
      icon: "icon-[iconamoon--certificate-badge-fill]",
      title: t("why.professionally_trained", { defaultValue: "Professionally Trained" }),
      description: t("why.professionally_trained_desc", { defaultValue: "Continuous training programs ensure expertise" }),
    },
    {
      icon: "icon-[mdi--leaf]",
      title: t("why.eco_conscious", { defaultValue: "Eco-Conscious" }),
      description: t("why.eco_conscious_desc", { defaultValue: "Committed to sustainable and safe practices" }),
    },
    {
      icon: "icon-[mdi--heart]",
      title: t("why.customer_first", { defaultValue: "Customer-First" }),
      description: t("why.customer_first_desc", { defaultValue: "Dedicated to exceeding customer expectations" }),
    },
  ];
  return (
    <section className="my-7 md:my-14">
      <h3 className="font-bold text-48px text-center mb-4 text-primary-dark">
        {t("why_choose_title", { defaultValue: "Why Choose" })} <span className="text-primary">{t("brand_name", { defaultValue: "Bright Scope" })}</span>
      </h3>
      <p className="font-normal text-18px text-center text-secondary-dark mb-20">
        {t("why_subtitle", { defaultValue: "Dubai's most trusted cleaning service with thousands of satisfied customers" })}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(items) && items.map((item, index) => (
          <div key={index}>
            <div className="size-28 m-auto bg-[linear-gradient(135deg,_#0B7A3B_0%,_#096732_100%)] shadow-[0_4px_4px_0_#00000040] center_flex  rounded-full  mb-6">
              <span className={`${item.icon} text-62px text-white`}></span>
            </div>
            <h3 className="font-semibold text-center text-18px mb-2">{item.title}</h3>
        
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseBright;
