import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import apiHelper from "../../api/apiHelper";
import { notyf } from "../../utils/toast";
import { useAuth } from "../../context/AuthContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const schema = z
  .object({
    full_name: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .optional()
      .refine((val) => !val || val.replace(/\D/g, "").length >= 9, {
        message: "Phone number must be at least 9 digits",
      }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading } = useAuth();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated) navigate("/");
  }, [isAuthenticated, loading, navigate]);

  const {
    register,
    handleSubmit,
    control,
    setError, // ✅ أضفنا ده
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.full_name,
        email: data.email,
        phone: data.phone || "",
        password: data.password,
        password2: data.confirmPassword,
      };

      const response = await apiHelper.post("/auth/register/", payload);
      const { tokens, user, message } = response.data;
      const access = tokens?.access;

      if (!access) {
        notyf.error("Registration failed: missing access token from server.");
        return;
      }

      login(user, access);
      notyf.success(message || "Registration successful!");
      navigate("/");
    } catch (error) {
      const data = error.response?.data;

      let errMsg =
        data?.details ||
        data?.detail ||
        data?.message ||
        data?.error ||
        (typeof data === "object"
          ? Object.values(data)?.[0]
          : "Registration failed. Try again.");

      // ✅ معالجة الأخطاء المخصصة من السيرفر
      if (data?.details?.phone?.[0]) {
        const phoneError = data.details.phone[0];
        setError("phone", { type: "server", message: phoneError });
        errMsg = phoneError;
      }

      if (
        typeof data?.details === "string" &&
        data.details.toLowerCase().includes("email")
      ) {
        // ✅ لو السيرفر رجع error عام فيه كلمة email
        setError("email", { type: "server", message: data.details });
        errMsg = data.details;
      }

      if (data?.details?.email?.[0]) {
        // ✅ لو السيرفر رجع error محدد للإيميل كـ object
        const emailError = data.details.email[0];
        setError("email", { type: "server", message: emailError });
        errMsg = emailError;
      }

      notyf.error(errMsg);
    }
  };

  const onError = (formErrors) => {
    const firstErr = Object.values(formErrors)[0]?.message;
    if (firstErr) notyf.error(firstErr);
  };

  return (
    <section className="my-7 md:my-14">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 pt-6 gap-6 min-h-[calc(100vh-88px)]">
          {/* Left (form) */}
          <div className="max-md:order-1">
            <div className="flex h-auto items-center justify-center xl:pt-4 max-md:pt-12">
              <div className="xl:w-[80%] w-[90%] flex items-center justify-center xl:px-6">
                <div className="w-full bg-surface-light shadow-[0_0_20px_0_#00000040] space-y-6 rounded-30px p-6 lg:p-8">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <img
                        src="/assets/imgs/global/logo_auth.svg"
                        alt="brand-logo"
                      />
                    </div>
                    <h2 className="font-semibold text-36px mb-1">
                      {t("auth.register.title")}
                    </h2>
                    <p className="font-normal text-12px mb-8 text-primary">
                      {t("auth.register.subtitle")}
                    </p>
                  </div>

                  <form
                    className="mb-4 space-y-4"
                    onSubmit={handleSubmit(onSubmit, onError)}
                    noValidate
                  >
                    {/* Full name */}
                    <div>
                      <label
                        className="label-text font-medium mb-1.5"
                        htmlFor="userName"
                      >
                        {t("auth.fields.full_name")}
                      </label>
                      <input
                        type="text"
                        placeholder={t("auth.placeholders.full_name")}
                        className="input h-10"
                        id="userName"
                        {...register("full_name")}
                        disabled={isSubmitting}
                      />
                      {errors.full_name && (
                        <p className="text-error text-sm mt-1">
                          {errors.full_name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
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
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        className="label-text font-medium mb-1.5"
                        htmlFor="userPhone"
                      >
                        {t("auth.fields.phone")}
                      </label>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <PhoneInput
                            {...field}
                            country="ae"
                            enableSearch
                            inputClass="!w-full !h-10"
                            inputProps={{ name: "phone" }}
                            placeholder={t("auth.placeholders.phone")}
                            onChange={(val) =>
                              field.onChange(val ? "+" + val : "")
                            }
                          />
                        )}
                      />
                      {errors.phone && (
                        <p className="text-error text-sm mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label
                        className="label-text font-medium mb-1.5"
                        htmlFor="userPassword"
                      >
                        {t("auth.fields.password_label")}
                      </label>
                      <div className="input">
                        <input
                          className="h-10"
                          id="userPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder={t("auth.placeholders.password")}
                          {...register("password")}
                          disabled={isSubmitting}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          className="cursor-pointer"
                        >
                          <span
                            className={`${
                              showPassword ? "block" : "hidden"
                            } icon-[tabler--eye] size-5 shrink-0`}
                          ></span>
                          <span
                            className={`${
                              showPassword ? "hidden" : "block"
                            } icon-[tabler--eye-off] size-5 shrink-0`}
                          ></span>
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-error text-sm mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label
                        className="label-text font-medium mb-1.5"
                        htmlFor="confirmPassword"
                      >
                        {t("auth.fields.confirm_password")}
                      </label>
                      <div className="input">
                        <input
                          className="h-10"
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder={t("auth.placeholders.confirm_password")}
                          {...register("confirmPassword")}
                          disabled={isSubmitting}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((s) => !s)}
                          className="cursor-pointer"
                        >
                          <span
                            className={`${
                              showConfirmPassword ? "block" : "hidden"
                            } icon-[tabler--eye] size-5 shrink-0`}
                          ></span>
                          <span
                            className={`${
                              showConfirmPassword ? "hidden" : "block"
                            } icon-[tabler--eye-off] size-5 shrink-0`}
                          ></span>
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-error text-sm mt-1">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-lg btn-primary btn-gradient h-14 rounded-55px btn-block uppercase mt-4"
                    >
                      {isSubmitting ? (
                        <>
                          {t("auth.register.signing_up")}
                          <span className="loading loading-spinner loading-sm"></span>
                        </>
                      ) : (
                        <>
                          {t("auth.register.sign_up_button")}
                          <span className="icon-[mdi--arrow-right] rtl-flip"></span>
                        </>
                      )}
                    </button>
                  </form>

                  <p className="font-semibold text-14px mt-8 mb-4 text-center">
                    {t("auth.already_have")}
                    <Link
                      to="/login"
                      className="link link-animated ms-1.5 link-primary font-normal"
                    >
                      {t("auth.sign_in")}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right (info side) */}
          <div className="max-md:order-2">
            <h1 className="font-bold text-48px mb-8">
              {t("auth.register.info_title_prefix")}{" "}
              <span className="text-primary">
                {t("auth.register.info_title_highlight")}
              </span>{" "}
              {t("auth.register.info_title_suffix")}
            </h1>
            <p className="font-normal text-18px mb-8 lg:w-[70%]">
              {t("auth.register.info_subtitle")}
            </p>
            {[
              "auth.features.instant_booking",
              "auth.features.track_history",
              "auth.features.eco_friendly",
              "auth.features.support_247",
            ].map((key) => (
              <div key={key} className="flex items-center gap-2 mb-4">
                <div className="size-10 center_flex rounded-full bg-primary text-white">
                  <div className="border-2 border-white rounded-full center_flex">
                    <span className="icon-[mdi--check] size-5 font-bold"></span>
                  </div>
                </div>
                <p className="font-semibold text-base">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
