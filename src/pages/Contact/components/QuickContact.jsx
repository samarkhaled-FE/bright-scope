import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./phone-input-rtl.css";
import { notyf } from "../../../utils/toast";
import apiHelper from "../../../api/apiHelper";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../context/AuthContext";

const QuickContact = () => {
  const { user } = useAuth();
  console.log(user);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      full_name: "",
      phone_number: user?.phone || "",
      email: "",
      service_type: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Sending contact data:", data);

      // ✅ Send request (make sure to keep the trailing slash)
      await apiHelper.post("contact/submit/", data);

      notyf.success("Your message has been sent successfully!");
      reset();
    } catch (error) {
      console.error("Contact form error:", error.response?.data || error);

      const errorData = error.response?.data;

      if (errorData?.errors && typeof errorData.errors === "object") {
        // ✅ Loop through backend field errors
        Object.entries(errorData.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg) => notyf.error(`${field}: ${msg}`));
          } else if (typeof messages === "string") {
            notyf.error(`${field}: ${messages}`);
          }
        });
      } else {
        // ✅ Fallback generic error
        notyf.error(
          errorData?.message || "Something went wrong. Please try again later."
        );
      }
    }
  };

  const { t, i18n } = useTranslation();

  return (
    <section className="my-7 md:my-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="form_container">
          <div className="bg-surface-light w-full rounded-10px shadow-[0px_0px_9.4px_0px_#00000040] md:p-8 p-4">
            <h5 className="font-semibold text-36px mb-2">
              {t("contact_page.quick.titlePrefix")}{" "}
              <span className="text-primary">
                {t("contact_page.quick.titleHighlight")}
              </span>
            </h5>
            <p className="font-normal text-14px text-secondary-dark mb-8">
              {t("contact_page.quick.subtitle")}
            </p>

            <form
              className="grid gap-8"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              {/* Full Name & Phone */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <label
                    className="label-text font-medium text-14px mb-1.5"
                    htmlFor="full_name"
                  >
                    {t("contact_page.quick.label_full_name")}
                  </label>
                  <input
                    id="full_name"
                    type="text"
                    readOnly={!!user}
                    placeholder={t("contact_page.quick.placeholder_full_name")}
                    value={user?.name}
                    className="input border-[#CBD5E1] h-10"
                    {...register("full_name", {
                      required: t("contact_page.quick.error_name_required"),
                    })}
                  />
                  {errors.full_name && (
                    <p className="text-error text-sm mt-1">
                      {errors.full_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="label-text font-medium text-14px mb-1.5"
                    htmlFor="phone"
                  >
                    {t("contact_page.quick.label_phone")}
                  </label>
                  <Controller
                    name="phone_number"
                    control={control}
                    rules={{ required: "Phone number is required" }}
                    render={({ field }) => (
                      <PhoneInput
                        {...field}
                        country="ae"
                        enableSearch
                        containerClass={i18n.language === "ar" ? "phone-input phone-rtl" : "phone-input"}
                        inputProps={{ readOnly: !!user, dir: i18n.language === "ar" ? "rtl" : "ltr" }}
                        inputClass="!w-full !h-10"
                        placeholder={t("contact_page.quick.placeholder_phone")}
                        onChange={(value) => field.onChange("+" + value)}
                      />
                    )}
                  />

                  {errors.phone_number && (
                    <p className="text-error text-sm mt-1">
                      {errors.phone_number.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  className="label-text font-medium text-14px mb-1.5"
                  htmlFor="email"
                >
                  {t("contact_page.quick.label_email")}
                </label>
                <input
                  id="email"
                  type="email"
                  value={user?.email}
                  readOnly ={!!user}
                  placeholder={t("contact_page.quick.placeholder_email")}
                  className="input border-[#CBD5E1] h-10"
                  {...register("email", {
                    required: t("contact_page.quick.error_email_required"),
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: t("contact_page.quick.error_email_invalid"),
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-error text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Service Type */}
              <div>
                <label
                  className="label-text font-medium text-14px mb-1.5"
                  htmlFor="service"
                >
                  {t("contact_page.quick.label_service")}
                </label>
                <select
                  id="service"
                  className="select"
                  {...register("service_type", {
                    required: t("contact_page.quick.error_service_required"),
                  })}
                >
                  <option value="">
                    {t("contact_page.quick.select_service_placeholder")}
                  </option>
                  <option value="consulting">
                    {t("contact_page.quick.service_consulting")}
                  </option>
                  <option value="support">
                    {t("contact_page.quick.service_support")}
                  </option>
                  <option value="deep_clean">
                    {t("contact_page.quick.service_deep_clean")}
                  </option>
                </select>
                {errors.service_type && (
                  <p className="text-error text-sm mt-1">
                    {errors.service_type.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  className="label-text font-medium text-14px mb-1.5"
                  htmlFor="message"
                >
                  {t("contact_page.quick.label_message")}
                </label>
                <textarea
                  id="message"
                  className="textarea min-h-24"
                  placeholder={t("contact_page.quick.placeholder_message")}
                  {...register("message", {
                    required: t("contact_page.quick.error_message_required"),
                  })}
                />
                {errors.message && (
                  <p className="text-error text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary h-14 rounded-55px font-semibold text-base w-full"
              >
                    {isSubmitting ? (
                  <>
                    {t("contact_page.quick.sending")}
                    <span className="loading loading-spinner loading-sm ms-2"></span>
                  </>
                ) : (
                  <>
                        <span className="icon-[tabler--send] me-2"></span>
                        {t("contact_page.quick.send_message")}
                        <span className="icon-[tabler--arrow-right] ms-2 rtl-flip"></span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column (Map + Info) */}
        <div>
          <div className="bg-surface-light w-full rounded-10px shadow-[0px_0px_9.4px_0px_#00000040] md:p-8 p-4 mb-6">
            <div className="flex items-center gap-6 mb-16">
              <div className="size-20 rounded-full bg-primary center_flex">
                <span className="icon-[mdi--location] text-white size-10"></span>
              </div>
              <div>
                <h2 className="font-semibold text-28px mb-2">
                  {t("contact_page.map_card.title")}
                </h2>
                <p className="font-normal text-base text-secondary-dark">
                  {t("contact_page.map_card.subtitle")}
                </p>
              </div>
            </div>

            <div className="flex gap-4 mb-4">
              <span className="icon-[mdi--location] text-25px text-primary"></span>
              <div>
                <p className="font-semibold text-base mb-1">
                  {t("contact_page.map_card.address_line1")}
                </p>
                <p className="font-semibold text-12px text-muted-dark">
                  {t("contact_page.map_card.address_line2")}
                </p>
              </div>
            </div>

            <div className="flex gap-4 mb-4">
              <span className="icon-[mingcute--time-line] text-25px text-primary"></span>
              <div>
                <p className="font-semibold text-base mb-1">{t("contact_page.map_card.working_hours_label")}</p>
                <p className="font-semibold text-12px text-muted-dark">
                  {t("contact_page.map_card.working_hours_value")}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl h-full">
            <div className="w-full !h-full !max-h-[346px] !rounded-2xl mb-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28884.310132671646!2d55.25359281442909!3d25.185047260299033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682def25f457%3A0x3dd4c4097970950e!2sBusiness%20Bay%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2seg!4v1758309940387!5m2!1sen!2seg"
                className="w-full !h-full border-0 rounded-2xl"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickContact;
