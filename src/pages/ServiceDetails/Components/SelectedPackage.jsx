import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SelectedPackage = ({
  selectedPackage,
  selectedAddons,
  total,
  onBookNow,
}) => {
  const { i18n, t } = useTranslation();
  const getLocalized = (obj, field) => {
    if (!obj) return "";
    const key = `${field}_${i18n.language}`;
    return obj[key] ?? obj[field] ?? "";
  };
  return (
    <section className="my-7 md:my-14 bg-[#ECF0F0] p-5 md:p-8 rounded-10px flex flex-col items-center gap-4 ">
      {/* <h6 className="font-semibold  text-22px">Selected Package</h6> */}
      {selectedPackage ? (
        <>
          <p className="text-lg">
            {t("selected_package_label", { defaultValue: "Selected Package:" })}{" "}
            <strong>
              {getLocalized(selectedPackage, "name") || selectedPackage.name} (AED {selectedPackage.price})
            </strong>
          </p>
          {selectedAddons.length > 0 && (
            <p className="text-base mt-2">
              {t("addons_label", { defaultValue: "Add-ons:" })}{" "}
              <strong> {Array.isArray(selectedAddons) && selectedAddons.map((a) => getLocalized(a, "name") || a.name).join(", ")}</strong>
            </p>
          )}
          <p className="font-semibold text-22px text-primary-dark mt-4">
            Total: AED {total}
          </p>
          <button
            onClick={onBookNow}
            className="btn btn-primary rounded-55px mt-5 h-14 font-semibold text-base"
          >
            Confirm Booking
          </button>
        </>
      ) : (
  <p className="text-red-600">{t("please_choose_package_continue", { defaultValue: "Please choose a package to continue." })}</p>
      )}
      {/* <p className="font-semibold text-36px text-primary">AED 120</p>
      <p className="font-normal text-12px ">Duration: 2-3 Hours</p> */}
      <div className="flex items-center gap-4 max-md:flex-col justify-center">
        {/* <Link
          className="btn btn-primary rounded-55px text-white ml-3 h-14 font-semibold text-base  "
          to="#"
        >
          <span>Book Now -AED {total} </span>
          <span className="icon-[mdi--arrow-right]"></span>
        </Link> */}
        <Link
          className="btn btn-outline btn-primary bg-white  rounded-55px h-14 font-semibold text-base text-primary-dark "
          to="#"
        >
          <span className="icon-[mdi--whatsapp]  size-6 text-primary "></span>
          Whatsapp Chat
        </Link>
      </div>
    </section>
  );
};

export default SelectedPackage;
