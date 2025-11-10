import { Link } from "react-router-dom";

const PasswordUpdatedSuccess = () => {
  return (
    <section className="my-7 md:my-14">
      <div className="container ">
        <div className="grid grid-cols-1 md:grid-cols-2 pt-6 gap-6 min-h-[calc(100vh-88px)]">
          <div className="max-md:order-2">
            <h1 className="font-bold text-48px mb-8">
              Password <span className="text-primary"> Updated!</span>
            </h1>
            <p className="font-normal text-18px mb-8 lg:w-[70%]">
              Great! Your password has been successfully updated. You can now
              log in to your Bright Scope account with your new password.
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
              <div className="size-10 center_flex rounded-full bg-success text-white">
                <div className="border-2 border-white rounded-full center_flex ">
                  <span className="icon-[mdi--check] size-5 font-bold"></span>
                </div>
              </div>
              <p className="font-semibold  text-base">Create a new password</p>
            </div>{" "}
            <div className="flex items-center gap-2 mb-4">
              <div className="size-10 center_flex rounded-full bg-success text-white">
                <div className="border-2 border-white rounded-full center_flex ">
                  <span className="icon-[mdi--check] size-5 font-bold"></span>
                </div>
              </div>
              <p className="font-semibold  text-base">
                Log in with your new password
              </p>
            </div>
            <div className="bg-[#E9EDED] p-4  rounded-15px">
              <div className="flex items-center gap-2 mb-4">
                <span class="icon-[iconamoon--shield-yes] size-9 text-primary"></span>
                <p className="font-semibold text-22px">
                  Your account is secure
                </p>
              </div>
              <p className="font-normal text-18px">
                Your password has been encrypted and stored securely. We
                recommend keeping your login credentials in a safe place.
              </p>
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
                    <h2 class="font-semibold text-36px mb-1">Success!</h2>
                    <p className="font-normal text-12px mb-8 text-primary">
                      Your password has been reset successfully
                    </p>
                  </div>
                  <div>
                    <div
                      className="mb-8 p-4 bg-gradient-to-r from-[#F0FCF4] to-[#EFF6FE]
 rounded-15px"
                    >
                      <h6 className="font-semibold text-22px text-center mb-4">
                        What is next?
                      </h6>
                      <div className="flex items-center gap-2 mb-4">
                        <span class="icon-[charm--circle-tick] text-primary  size-5"></span>
                        <p className="font-normal text-14px text-muted-dark">
                          Use your new password to log in
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <span class="icon-[charm--circle-tick] text-primary  size-5"></span>
                        <p className="font-normal text-14px text-muted-dark">
                          Use your new password to log in
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <span class="icon-[charm--circle-tick] text-primary  size-5"></span>
                        <p className="font-normal text-14px text-muted-dark">
                          Use your new password to log in
                        </p>
                      </div>
                    </div>

                    <div>
                      <Link
                        to="/login"
                        class="btn btn-lg btn-primary btn-gradient h-14 rounded-55px btn-block uppercase "
                      >
                        Continue To Login
                        <span className="icon-[mdi--arrow-right] rtl-flip"></span>
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

export default PasswordUpdatedSuccess;
