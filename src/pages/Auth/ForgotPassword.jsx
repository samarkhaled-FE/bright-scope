import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import apiHelper from "../../api/apiHelper";
import { notyf } from "../../utils/toast";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await apiHelper.post("auth/reset-password-email/", data);
      console.log("Forgot:", response);

      notyf.success(
        response.data?.msg ||
          "A password reset link has been sent to your email."
      );

      // ✅ بعد ما يبعت الإيميل، روح Step 2
      navigate("/reset-password?step=2");
    } catch (error) {
      console.error("Forgot password error:", error);
      notyf.error(
        error.response?.data?.error ||
          "Failed to send reset code. Please try again."
      );
    }
  };

  const onError = (formErrors) => {
    Object.values(formErrors).forEach((err) => {
      if (err?.message) notyf.error(err.message);
    });
  };

  return (
    <section className="my-7 md:my-14">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 pt-6 gap-6 min-h-[calc(100vh-88px)]">
          {/* Steps on the left */}
          <div className="max-md:order-2">
            <h1 className="font-bold text-48px mb-8">
              {t("auth.forgot.title_prefix")}{" "}
              <span className="text-primary">
                {t("auth.forgot.title_highlight")}
              </span>
            </h1>
            <p className="font-normal text-18px mb-8 lg:w-[70%]">
              {t("auth.forgot.subtitle")}
            </p>

            {[
              t("auth.forgot.step1"),
              t("auth.forgot.step2"),
              t("auth.forgot.step3"),
              t("auth.forgot.step4"),
            ].map((label, index) => {
              const active = index === 0; // الخطوة الأولى مفعلة هنا
              return (
                <div key={index} className="flex items-center gap-2 mb-4">
                  <div
                    className={`size-10 center_flex rounded-full ${
                      active ? "bg-primary text-white" : "bg-disabled"
                    }`}
                  >
                    <span>{index + 1}</span>
                  </div>
                  <p
                    className={`font-semibold text-base ${
                      active ? "text-primary" : ""
                    }`}
                  >
                    {label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Form on the right */}
          <div className="max-md:order-1">
            <div className="flex h-auto items-center justify-center xl:pt-4 max-md:pt-12">
              <div className="w-full flex items-center justify-center">
                <div className="w-full bg-surface-light shadow-[0_0_20px_0_#00000040] space-y-6 rounded-30px p-6 lg:p-8">
                  <div className="text-center">
                    <div className="flex justify-center mb-2 size-28 rounded-full bg-primary text-white center_flex m-auto shadow-[0_4px_4px_#00000040]">
                      <span className="icon-[solar--key-bold] size-16"></span>
                    </div>
                    <h2 className="font-semibold text-36px mb-1">
                      {t("auth.forgot.card_title")}
                    </h2>
                    <p className="font-normal text-12px mb-8 text-primary">
                      {t("auth.forgot.card_subtitle")}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <label
                      className="label-text font-medium mb-1.5"
                      htmlFor="userEmail"
                    >
                      {t("auth.fields.email_label")}
                    </label>
                    <input
                      type="email"
                      placeholder={t("auth.placeholders.email")}
                      className="input h-10"
                      id="userEmail"
                      {...register("email")}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-error text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                    <p className="font-normal text-14px text-[#64748B] mt-2">
                      {t("auth.forgot.will_send_code_note")}
                    </p>
                    <button
                      className="btn btn-lg btn-primary btn-gradient h-14 rounded-55px btn-block uppercase mt-4"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          {t("auth.forgot.sending")}
                          <span className="loading loading-spinner loading-sm"></span>
                        </>
                      ) : (
                        <>
                          {t("auth.forgot.send_reset_code")}
                          <span className="icon-[mdi--arrow-right] rtl-flip"></span>
                        </>
                      )}
                    </button>
                  </form>

                  <div className="font-normal text-base mt-8 mb-4 text-center center_flex ">
                    <Link
                      to="/login"
                      className="link link-animated ms-1.5 link-primary text-primary-dark font-normal flex items-center"
                    >
                      <span className="icon-[lets-icons--back] me-1"></span>
                      {t("auth.back_to_login")}
                    </Link>
                  </div>

                  <div className="bg-[#E9EDED] p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="icon-[iconamoon--shield-yes] size-6 text-primary"></span>
                      <p className="font-semibold text-12px">
                        {t("auth.forgot.security_note_title")}
                      </p>
                    </div>
                    <p className="font-normal text-14px text-[#4A5565]">
                      {t("auth.forgot.security_note_body")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
