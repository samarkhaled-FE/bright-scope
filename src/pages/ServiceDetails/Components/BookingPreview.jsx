import React from "react";
import { useTranslation } from "react-i18next";

export default function BookingPreview({ data, onContinue }) {
  const { i18n, t } = useTranslation();
  const getLocalized = (obj, field) => {
    if (!obj) return "";
    const key = `${field}_${i18n.language}`;
    return obj[key] ?? obj[field] ?? "";
  };
  if (!data) {
    return <p className="text-secondary-dark">No booking data available.</p>;
  }

  const pk = data.package;
  const addons = data.addons ?? [];

  return (
    <div className="space-y-4">
  <div className="px-4 mt-2 font-semibold text-22px">{t("selected_package", { defaultValue: "Selected Package" })}</div>

      <div className="bg-[#F1F7F3] rounded-10px p-4 flex items-start justify-between">
        <div>
          <div className="font-semibold text-base">{getLocalized(pk, "name") || pk?.name}</div>
          <div className="text-sm text-secondary-dark mt-1">{getLocalized(pk, "description") || pk?.description}</div>
        </div>
        <div className="text-primary font-semibold">AED {pk?.price}</div>
      </div>

      <hr />

      <div className="px-4 font-semibold text-22px">Selected Add-ons</div>
      <div className="space-y-2">
        {addons.length > 0 ? (
          addons.map((a) => (
            <div
              key={a.id ?? a.name}
              className="bg-white rounded-8px p-3 flex items-center justify-between shadow-sm"
            >
              <div className="text-sm text-secondary-dark">{getLocalized(a, "name") || a.name}</div>
              <div className="text-primary">+AED {a.price}</div>
            </div>
          ))
        ) : (
          <div className="text-secondary-dark p-3">{t("no_addons_selected", { defaultValue: "No add-ons selected." })}</div>
        )}
      </div>

      <hr />

      <div className="flex items-center justify-between px-2">
        <div className="font-semibold text-lg">Total Amount</div>
        <div className="text-primary font-bold text-lg">AED {data.total ?? 0}</div>
      </div>

   
    </div>
  );
}
