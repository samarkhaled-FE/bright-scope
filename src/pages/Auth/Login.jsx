import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import apiHelper from "../../api/apiHelper";
import { notyf } from "../../utils/toast";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const schema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
  rememberMe: z.boolean().optional(),
});

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading } = useAuth();
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (!loading && isAuthenticated) navigate("/");
  }, [loading, isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // ✅ Form submit handler
  const onSubmit = async (data) => {
    try {
      const response = await apiHelper.post("/auth/login/", {
        email: data.email,
        password: data.password,
      });

      const { tokens, user, message } = response.data;
      const access = tokens?.access;

      if (!access) {
        notyf.error("Login failed: missing access token from server.");
        return;
      }

      // ✅ Login + rememberMe handled by context
      login(user, access, data.rememberMe);

      notyf.success(message || "Login successful!");
      navigate("/");
    } catch (error) {
      const data = error.response?.data;
      const errMsg =
        data?.details ||
        data?.detail ||
        data?.message ||
        data?.error ||
        data?.errors?.non_field_errors?.[0] ||
        "Login failed. Please try again.";

      notyf.error(errMsg);
    }
  };

  // ✅ Show only the first validation error (frontend)
  const onError = (formErrors) => {
    const firstErrMsg = Object.values(formErrors)[0]?.message;
    if (firstErrMsg) notyf.error(firstErrMsg);
  };

  return (
    <section className="my-7 md:my-14">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 pt-6 gap-6 min-h-[calc(100vh-88px)]">
          {/* Info Side */}
          <div className="max-md:order-2">
            <h1 className="font-bold text-48px mb-8">
              {t("auth.login.title_prefix")} <br />
              <span className="text-primary">
                {t("auth.login.title_highlight")}
              </span>
            </h1>
            <p className="font-normal text-18px mb-8 lg:w-[70%]">
              {t("auth.login.subtitle")}
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

          {/* Login Form Side */}
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
                      {t("auth.login.card_title")}
                    </h2>
                    <p className="font-normal text-12px mb-8 text-primary">
                      {t("auth.login.card_subtitle")}
                    </p>
                  </div>

                  <form
                    className="mb-4 space-y-4"
                    onSubmit={handleSubmit(onSubmit, onError)}
                    noValidate
                  >
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

                    {/* Remember Me + Forgot Password */}
                    <div className="flex items-center justify-between gap-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          id="rememberMe"
                          {...register("rememberMe")}
                        />
                        <label
                          className="label-text text-14px font-normal"
                          htmlFor="rememberMe"
                        >
                          {t("auth.remember_me")}
                        </label>
                      </div>
                      <Link
                      
                        to="/reset-password"
                        className="link link-animated link-primary text-14px font-normal"
                      >
                        {t("auth.forgot_password_link")}
                      </Link>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-lg btn-primary btn-gradient h-14 rounded-55px btn-block uppercase"
                    >
                      {isSubmitting ? (
                        <>
                          {t("auth.logging_in")}
                          <span className="loading loading-spinner loading-sm"></span>
                        </>
                      ) : (
                        <>
                          {t("auth.login_button")}
                          <span className="icon-[mdi--arrow-right] rtl-flip"></span>
                        </>
                      )}
                    </button>
                  </form>

                  <p className="font-semibold text-14px mt-8 mb-4 text-center">
                    {t("auth.no_account")}
                    <Link
                      to="/register"
                      className="link link-animated ms-1.5 link-primary font-normal"
                    >
                      {t("auth.create_account")}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
