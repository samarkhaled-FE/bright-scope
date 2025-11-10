import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useServices } from "../../hooks/useServices";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";

const Services = () => {
  const { services, loading } = useServices();
  const { t, i18n } = useTranslation();

  const getLocalized = (obj, field) => {
    if (!obj) return "";
    // try field with language suffix, e.g. name_ar
    const langField = `${field}_${i18n.language}`;
    return obj[langField] ?? obj[field] ?? "";
  };
  const [activeTab, setActiveTab] = useState(null);
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ تأمين البيانات من الباك
  const servicesList = Array.isArray(services)
    ? services
    : services && typeof services === "object"
    ? Object.values(services)
    : [];

  // ✅ تحويل اسم الأيقونة من backend لصيغة Iconify
  const formatIcon = (icon) =>
    icon?.replace("icon-[", "")?.replace("--", ":")?.replace("]", "")?.trim();

  // 🧠 عند تحميل البيانات أو عند الانتقال بين الصفحات
  useEffect(() => {
    if (loading || servicesList.length === 0) return;

    // لو المستخدم دخل /services من غير category
    if (location.pathname === "/services") {
      const firstService = servicesList[0];
      if (firstService) {
        setActiveTab(firstService.id);
        navigate(`/services/${firstService.service_type}`, { replace: true });
      }
      return;
    }

    // باقي الحالات العادية
    const currentCategory = category || location.pathname.split("/").pop();
    const matchedService = servicesList.find(
      (s) => s.service_type === currentCategory
    );

    if (matchedService) {
      setActiveTab(matchedService.id);
    }
  }, [loading, servicesList, category, location.pathname]);

  // ✅ عند الضغط على تابة
  const handleTabClick = (svc) => {
    if (activeTab !== svc.id) {
      setActiveTab(svc.id);
      navigate(`/services/${svc.service_type}`, { replace: true });
    }
  };

  return (
    <section className="my-7 md:my-14">
      <div className="container">
        {/* العنوان */}
        <h1 className="font-bold text-48px mb-4 text-primary-dark text-center">
          {t("comprehensive_title_part1")}{" "}
          <span className="text-primary">{t("comprehensive_title_part2")}</span>
        </h1>

        <p className="font-normal text-secondary-dark text-18px text-center mb-8">
          {t("services_description")}
        </p>

        <div className="flex gap-6 max-md:flex-col">
          {/* ✅ القائمة الجانبية */}
          <nav
            className="tabs flex-col max-md:flex-row max-md:flex-wrap items-start space-y-1 min-w-[30%] rounded-10px p-4 bg-surface-light shadow-[0px_4px_10px_0px_#0000001A] h-fit"
            aria-label="Tabs"
          >
            <h4 className="font-semibold text-22px mb-6 max-md:w-full">
              {t("choose_service")}
            </h4>

            {servicesList.map((svc, idx) => {
              const isActive = activeTab === svc.id;
              return (
                <button
                  key={svc?.id ?? svc?.service_type ?? idx}
                  type="button"
                  onClick={() => handleTabClick(svc)}
                  className={`flex items-center gap-2 w-full justify-start rounded-10px h-14 px-3 font-normal text-base transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#D2E2D9] text-[#0C8C43] border border-primary shadow-sm"
                        : "text-secondary-dark hover:text-primary hover:bg-primary/10"
                    }`}
                >
                  <Icon
                    icon={formatIcon(svc.icon)}
                    className={`size-5 transition-colors ${
                      isActive
                        ? "text-[#0C8C43]"
                        : "text-gray-500 group-hover:text-primary"
                    }`}
                  />
                  <span className="truncate">{getLocalized(svc, "name")}</span>
                </button>
              );
            })}
          </nav>

          {/* ✅ محتوى التابة المختارة */}
          <div className="ms-3 w-full rounded-10px p-4 bg-surface-light shadow-[0px_4px_10px_0px_#0000001A]">
            {servicesList.map(
              (service, sIdx) =>
                activeTab === service.id && (
                  <div
                    key={service?.id ?? sIdx}
                    id={`tabs-pill-vertical-${service.id ?? sIdx}`}
                    role="tabpanel"
                  >
                    {/* رأس الخدمة */}
                    <div className="flex items-center gap-9 p-4 mb-4 bg-[#D2E2D9] rounded-10px">
                      <div className="size-20 rounded-full bg-primary center_flex shadow-[0px_0px_17.8px_0px_#00000040] max-md:size-auto">
                        <Icon
                          icon={formatIcon(service.icon)}
                          className="text-white size-10"
                        />
                      </div>

                      <div>
                        <h6 className="font-semibold text-22px mb-1">
                          {getLocalized(service, "name")}
                        </h6>
                        <p className="font-normal text-14px">
                          {getLocalized(service, "description")}
                        </p>
                      </div>
                    </div>

                    {/* محتوى الخدمة */}
                    <h5 className="font-semibold text-22px mb-2">
                      {t("what_is_included")}
                    </h5>
                    <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 mb-8">
                      {Array.isArray(service.contents) &&
                      service.contents.length > 0 ? (
                        service.contents.map((content) => (
                          <div
                            key={content.id ?? content.name}
                            className="flex items-center gap-3"
                          >
                            <Icon
                              icon="mdi:check-circle"
                              className="text-primary size-6"
                            />
                            <p className="text-base text-secondary-dark">
                              {getLocalized(content, "name")}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-secondary-dark">{t("no_content")}</p>
                      )}
                    </div>

                    {/* الخصائص */}
                    <div className="bg-[#F2F2F2] p-4 rounded-15px flex items-center flex-wrap justify-center gap-8">
                      {service.features.length > 0 ? (
                        service.features.slice(0, 3).map((feat, i) => (
                          <div className="px-11" key={i}>
                            <div className="size-14 rounded-full bg-primary mb-2 center_flex m-auto shadow-[0px_0px_17.8px_0px_#00000040]">
                              <Icon
                                icon={
                                  [
                                    "mdi:clock",
                                    "mingcute:star-fill",
                                    "mdi:leaf",
                                  ][i]
                                }
                                className="text-white size-8"
                              />
                            </div>
                            <p className="font-semibold text-18px text-center">
                              {getLocalized(feat, "name")}
                            </p>
                            <p className="font-normal text-14px text-center text-secondary-dark">
                              {getLocalized(feat, "description")}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-secondary-dark">
                          {t("no_features")}
                        </p>
                      )}
                    </div>

                    {/* زرار الحجز */}
                    <Link
                      to={`/service/${service.id}`}
                      className="btn btn-primary w-full h-14 rounded-55px font-semibold text-base mt-8"
                    >
                      {t("book_now")}
                      <Icon icon="mdi:arrow-right" className="ml-2 rtl-flip" />
                    </Link>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
