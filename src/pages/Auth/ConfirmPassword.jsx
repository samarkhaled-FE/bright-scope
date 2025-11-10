import { Link } from "react-router-dom";

const ConfirmPassword = () => {
  return (
    <section className="my-7 md:my-14">
      <div className="container ">
        <div className="grid grid-cols-1 md:grid-cols-2 pt-6 gap-6 min-h-[calc(100vh-88px)]">
          <div className="max-md:order-2">
            <h1 className="font-bold text-48px mb-8">
              Reset Your <span className="text-primary"> Password</span>
            </h1>
            <p className="font-normal text-18px mb-8 lg:w-[70%]">
              Don't worry, it happens to the best of us. Enter your email
              address and we'll send you a verification code to reset your
              password.
            </p>
            <div className="flex items-center gap-2 mb-4">
              <div className="size-10 center_flex rounded-full bg-success text-white">
                <div className="border-2 border-white rounded-full center_flex ">
                  <span className="icon-[mdi--check] size-5 font-bold"></span>
                </div>
              </div>
              <p className="font-semibold  text-base">
                Enter your email address
              </p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="size-10 center_flex rounded-full bg-success text-white">
                <div className="border-2 border-white rounded-full center_flex ">
                  <span className="icon-[mdi--check] size-5 font-bold"></span>
                </div>
              </div>
              <p className="font-semibold  text-base">
                Check your email for verification code
              </p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="size-10 center_flex rounded-full bg-primary text-white">
                <div className=" ">
                  <span className="font-semibold text-base">3 </span>
                </div>
              </div>
              <p className="font-semibold  text-base">Create a new password</p>
            </div>{" "}
            <div className="flex items-center gap-2 mb-4">
              <div className="size-10 center_flex rounded-full bg-disabled ">
                <div className=" ">
                  <span className="font-semibold text-base">4 </span>
                </div>
              </div>
              <p className="font-semibold  text-base">
                Log in with your new password
              </p>
            </div>
            <div className="bg-[#E9EDED] p-4  rounded-15px">
              <div className="flex items-center gap-2 mb-4">
                <span class="icon-[iconamoon--shield-yes] size-9 text-primary"></span>
                <p className="font-semibold text-22px">Security Note</p>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="size-7 center_flex rounded-full bg-success text-white">
                  <div className="border-2 border-white rounded-full center_flex ">
                    <span className="icon-[mdi--check] size-3 font-bold "></span>
                  </div>
                </div>
                <p className="font-normal  text-14px">
                  At least 8 characters long
                </p>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="size-7 center_flex rounded-full bg-success text-white">
                  <div className="border-2 border-white rounded-full center_flex ">
                    <span className="icon-[mdi--check] size-3 font-bold "></span>
                  </div>
                </div>
                <p className="font-normal  text-14px">
                  Include uppercase and lowercase letters
                </p>
              </div>{" "}
              <div className="flex items-center gap-2 mb-4">
                <div className="size-7 center_flex rounded-full bg-success text-white">
                  <div className="border-2 border-white rounded-full center_flex ">
                    <span className="icon-[mdi--check] size-3 font-bold "></span>
                  </div>
                </div>
                <p className="font-normal  text-14px">
                  Include numbers and special characters
                </p>
              </div>{" "}
              <div className="flex items-center gap-2 mb-4">
                <div className="size-7 center_flex rounded-full bg-success text-white">
                  <div className="border-2 border-white rounded-full center_flex ">
                    <span className="icon-[mdi--check] size-3 font-bold "></span>
                  </div>
                </div>
                <p className="font-normal  text-14px">
                  Include numbers and special characters
                </p>
              </div>
            </div>
          </div>
          <div className="max-md:order-1">
            <div class="flex h-auto  items-center justify-center  xl:pt-4 max-md:pt-12">
              <div class=" w-full flex items-center justify-center">
                <div class="w-full bg-surface-light shadow-[0_0_20px_0_#00000040]  space-y-6 rounded-30px p-6  lg:p-8">
                  <div class="text-center">
                    <div className="flex justify-center mb-2 size-28 rounded-full bg-primary text-white center_flex m-auto shadow-[0_4px_4px_#00000040]">
                      <span class="icon-[solar--key-bold] size-16"></span>
                    </div>
                    <h2 class="font-semibold text-36px mb-1">
                      Set New Password
                    </h2>
                    <p className="font-normal text-12px mb-8 text-primary">
                      Enter your new password below{" "}
                    </p>
                  </div>

                  <div class="space-y-4">
                    <form class="mb-4 space-y-4" onsubmit="return false;">
                      <div>
                        <label
                          class="label-text font-medium mb-1.5"
                          for="userPassword"
                        >
                          New Password
                        </label>
                        <div class="input">
                          <input
                            className="h-10"
                            id="userPassword"
                            type="password"
                            placeholder="Enter Your New Password"
                            required
                          />
                          <button
                            type="button"
                            data-toggle-password='{ "target": "#userPassword" }'
                            class="block cursor-pointer"
                            aria-label="userPassword"
                          >
                            <span class="icon-[tabler--eye] password-active:block hidden size-5 shrink-0"></span>
                            <span class="icon-[tabler--eye-off] password-active:hidden block size-5 shrink-0"></span>
                          </button>
                        </div>
                      </div>
                      <div>
                        <label
                          class="label-text font-medium mb-1.5"
                          for="confirmPassword"
                        >
                          New Password
                        </label>
                        <div class="input">
                          <input
                            className="h-10"
                            id="confirmPassword"
                            type="password"
                            placeholder="Enter Your New Password"
                            required
                          />
                          <button
                            type="button"
                            data-toggle-password='{ "target": "#confirmPassword" }'
                            class="block cursor-pointer"
                            aria-label="confirmPassword"
                          >
                            <span class="icon-[tabler--eye] password-active:block hidden size-5 shrink-0"></span>
                            <span class="icon-[tabler--eye-off] password-active:hidden block size-5 shrink-0"></span>
                          </button>
                        </div>
                      </div>

                      <button class="btn btn-lg btn-primary btn-gradient h-14 rounded-55px btn-block uppercase mt-4">
                        Update password
                        <span className="icon-[mdi--arrow-right] rtl-flip"></span>
                      </button>
                    </form>
                    <div class="font-normal text-base mt-8 mb-4 text-center center_flex ">
                      <Link
                        to="/login"
                        class="link link-animated ms-1.5 link-primary text-primary-dark font-normal flex items-center"
                      >
                        <span class="icon-[lets-icons--back] me-1"></span>
                        Back to Login
                      </Link>
                    </div>
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

export default ConfirmPassword;
