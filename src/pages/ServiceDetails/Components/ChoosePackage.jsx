import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ChoosePackage = ({ packages, selectedPackage, onSelectPackage, onBookNow }) => {
  const { i18n, t } = useTranslation();

  const getLocalized = (obj, field) => {
    if (!obj) return "";
    const key = `${field}_${i18n.language}`;
    return obj[key] ?? obj[field] ?? "";
  };

  return (
    <section className="my-7 md:my-14">
      <h2 className="font-semibold text-36px text-center text-primary-dark border-b border-[#E0E0E0] pb-4">
        {t("choose_package", { defaultValue: "Choose Your Package" })}
      </h2>
      <div className="flex justify-between items-center mb-7">
        <div className="py-4">
          <p className="font-semibold text-22px text-primary-dark">
            {!selectedPackage
              ? t("please_select_package", { defaultValue: "Please select a package" })
              : `${t("selected_package", { defaultValue: "Selected Package:" })} ${getLocalized(selectedPackage, "name") || selectedPackage?.name}`}
          </p>
          <p className="font-normal text-18px text-secondary-dark">
          {
            !selectedPackage ? "" : `Price: AED ${selectedPackage.price}`
          }
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            className="btn btn-outline btn-primary rounded-55px h-14 font-semibold text-base text-primary-dark flex items-center gap-2"
            to="#"
          >
            <span className="icon-[mdi--whatsapp] size-6 text-primary"></span>
            <span>{t("whatsapp", { defaultValue: "Whatsapp" })}</span>
          </Link>

          <button
            className="btn btn-primary rounded-55px text-white h-14 font-semibold text-base"
            onClick={onBookNow}
          >
            {t("book_now", { defaultValue: "Book Now" })}
            <span className="icon-[mdi--spa]"></span>
          </button>
        </div>
      </div>

      {/* checkbox */}
      <div className="flex w-full items-start gap-6 flex-wrap sm:flex-nowrap">
        {(packages ?? []).map((pkg) => (
          <label
            key={pkg.id}
            className="custom-option text-center flex sm:w-1/2 flex-col items-center gap-3 bg-surface-light shadow-[0_4px_10px_0_#0000001A]
rounded-10px rounded-tr-none rounded-tl-none border-none [&:has(:checked)]:outline-3
"
          >
            <span className="flex flex-col label-text">
              <span className="text-22px font-semibold  mb-4"> {getLocalized(pkg, "name") || pkg.name}</span>
              <p className="font-semibold text-36px mb-2 text-primary">
                AED {pkg.price}
              </p>
              <p className="font-normal text-base mb-4">
                {t("up_to_sq_ft", { value: pkg.square_feet, defaultValue: `Up to ${pkg.square_feet} sq ft` })}
              </p>
              <div className="">
                <span className="icon-[tabler--clock]"></span>
                <span className="font-normal text-base mb-5">
                  {pkg.duration} {t("hours", { defaultValue: "hours" })}
                </span>
              </div>
            </span>
            <input
              type="radio"
              className="radio radio-primary rounded-full"
              name="package"
              // checked={selectedPackage?.id === pkg.id}
              onChange={() => onSelectPackage(pkg)}
            />
          </label>
        ))}

        {/* <label
          class="custom-option text-center flex sm:w-1/2 flex-col items-center gap-3 bg-surface-light shadow-[0_4px_10px_0_#0000001A]
rounded-10px rounded-tr-none rounded-tl-none border-none [&:has(:checked)]:outline-3
"
        >
          <span class="flex flex-col label-text">
            <span class="text-22px font-semibold  mb-4">Studio</span>
            <p class="font-semibold text-36px mb-2 text-primary">AED 120</p>
            <p className="font-normal text-base mb-4">Up to 400 sq ft</p>
            <div className="">
              <span className="icon-[tabler--clock]"></span>
              <span className="font-normal text-base mb-5">1-2 hours</span>
            </div>
          </span>
          <input
            type="checkbox"
            class="checkbox checkbox-primary rounded-full"
          />
        </label>

        <label
          class="custom-option text-center flex sm:w-1/2 flex-col items-center gap-3 bg-surface-light shadow-[0_4px_10px_0_#0000001A]
rounded-10px rounded-tr-none rounded-tl-none border-none [&:has(:checked)]:outline-3
"
        >
          <span class="flex flex-col label-text">
            <span class="text-22px font-semibold  mb-4">Studio</span>
            <p class="font-semibold text-36px mb-2 text-primary">AED 120</p>
            <p className="font-normal text-base mb-4">Up to 400 sq ft</p>
            <div className="">
              <span className="icon-[tabler--clock]"></span>
              <span className="font-normal text-base mb-5">1-2 hours</span>
            </div>
          </span>
          <input
            type="checkbox"
            class="checkbox checkbox-primary rounded-full"
          />
        </label>

        <label
          class="custom-option text-center flex sm:w-1/2 flex-col items-center gap-3 bg-surface-light shadow-[0_4px_10px_0_#0000001A]
rounded-10px rounded-tr-none rounded-tl-none border-none [&:has(:checked)]:outline-3
"
        >
          <span class="flex flex-col label-text">
            <span class="text-22px font-semibold  mb-4">Studio</span>
            <p class="font-semibold text-36px mb-2 text-primary">AED 120</p>
            <p className="font-normal text-base mb-4">Up to 400 sq ft</p>
            <div className="">
              <span className="icon-[tabler--clock]"></span>
              <span className="font-normal text-base mb-5">1-2 hours</span>
            </div>
          </span>
          <input
            type="checkbox"
            class="checkbox checkbox-primary rounded-full"
          />
        </label> */}
      </div>
    </section>
  );
};

export default ChoosePackage;
