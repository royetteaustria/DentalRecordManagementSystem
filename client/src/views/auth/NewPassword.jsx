import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Footer from "components/footer/FooterAuthDefault";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import authImg from "../../assets/img/auth/MANAGEMENTSYSTEM.png";
import { Toaster } from "react-hot-toast";

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPasssword] = useState("");
  const navigate = useNavigate();
  const { id, token } = useParams();

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password does not match");
      return; // Stop execution if passwords don't match
    }
    try {
      const passwordRegex = /^(?=.*[0-9])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
      if (!passwordRegex.test(password)) {
        toast.error(
          "Password must be at least 8 characters long and contain at least one number and one special character."
        );
        return;
      }
      const response = await axios.post(
        `http://localhost:4000/api/UserRoutes/reset-password/${id}/${token}`,
        { password }
      );

      if (response.data.Status === "Success") {
        navigate("/");
      } else {
        toast.error("Token has expire");
        // Handle other possible response statuses
      }
    } catch (err) {
      console.error("An error occurred:", err);
      // Handle error - show error message to user, etc.
    }
  };
  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <FixedPlugin />
        <main className={`mx-auto min-h-screen`}>
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
                  {/* Sign in section */}
                  <form onSubmit={handleSubmit}>
                    <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                      <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                        Create new password
                      </h4>
                      <label className="text-black text-md mb-3 block font-medium dark:text-white">
                        Password
                      </label>
                      <input
                        label="password*"
                        placeholder="Enter Password"
                        id="password"
                        required
                        type="password"
                        className="border-stroke bg-transparent focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="py-2">
                        <label className="text-black text-md mb-3 block font-medium dark:text-white">
                          Password
                        </label>
                        {/* Password */}
                        <input
                          variant="auth"
                          extra="mb-3"
                          label="Password*"
                          required
                          placeholder="Min. 8 characters"
                          id="password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPasssword(e.target.value)}
                          className="border-stroke bg-transparent focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default"
                        />
                      </div>
                      {/* Checkbox */}
                      <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                        Reset password
                      </button>
                    </div>
                  </form>
                </div>
                <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
                  <div
                    className="absolute flex h-full w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]"
                    style={{ backgroundImage: `url(${authImg})` }}
                  />
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </main>
        <Toaster />
      </div>
    </div>
  );
}
