import { useTranslation } from "react-i18next";

const WhyChooseUs = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: "icon-[mdi--currency-usd]",
      title: t("feature_pricing_title"),
      subtitle: t("feature_pricing_subtitle"),
      highlight: t("feature_pricing_highlight"),
      description: t("feature_pricing_description"),
    },
    {
      icon: "icon-[mdi--shield-check]",
      title: t("feature_staff_title"),
      subtitle: t("feature_staff_subtitle"),
      highlight: t("feature_staff_highlight"),
      description: t("feature_staff_description"),
    },
    {
      icon: "icon-[mdi--star-circle]",
      title: t("feature_experience_title"),
      subtitle: t("feature_experience_subtitle"),
      highlight: t("feature_experience_highlight"),
      description: t("feature_experience_description"),
    },
    {
      icon: "icon-[mdi--leaf]",
      title: t("feature_eco_title"),
      subtitle: t("feature_eco_subtitle"),
      highlight: t("feature_eco_highlight"),
      description: t("feature_eco_description"),
    },
    {
      icon: "icon-[mdi--clock]",
      title: t("feature_booking_title"),
      subtitle: t("feature_booking_subtitle"),
      highlight: t("feature_booking_highlight"),
      description: t("feature_booking_description"),
    },
  ];
  return (
    <section className="my-28 text-center relative">
      <h2 className="font-semibold text-36px mb-2 text-primary-dark">
        {t("why_choose_us_title_prefix")} <span className="text-primary">{t("why_choose_us_title_highlight")}</span>
      </h2>
      <p className="text-primary-dark font-medium text-18px mb-4">
        {t("why_choose_us_subtitle")}
      </p>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
        {Array.isArray(features) && features.map((item, index) => (
          <div
            key={index}
            className="bg-surface-light rounded-20px shadow-2xl p-4 max-w-[75%] m-auto hover:scale-105 transition-transform duration-300"
          >
            <div className="size-14 bg-primary rounded-full center_flex mb-2 m-auto">
              <span className={`${item.icon} size-8 text-white`}></span>
              {/* <span className='icon-[mdi--shield-check] size-10 text-white'></span> */}
            </div>
            <h5 className="font-semibold text-22px   mb-1 text-black">
              {item.title}
            </h5>
            <p className="font-semibold text-base  mb-1 text-muted-dark">
              {item.subtitle}
            </p>
            <div className="bg-primary rounded-[100px] h-10 center_flex text-white  font-semibold text-base mb-1">
              {item.highlight}
            </div>
            <p className="text-black font-normal text-14px">
              {item.description}{" "}
            </p>
          </div>
        ))}

     
      </div>

         <div className="absolute bottom-[10%] start-0 w-full h-[84px]  -z-10 ">
          <img
            className="w-full "
            src="/assets/imgs/home/snake_shape.webp"
            alt="snake shape"
          />
        </div>
    </section>
  );
};

export default WhyChooseUs;
