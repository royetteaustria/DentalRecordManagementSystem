import InputField from "components/fields/InputField";
import Footer from "components/footer/FooterAuthDefault";
import authImg from "assets/img/auth/MANAGEMENTSYSTEM.png";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EmailVerfied() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/UserRoutes/forgot-password",
        { email }
      );
      if (res.data.Status === "Success") {
        navigate("/verified");
      } else if (res.data.Status === "User not existed") {
        setError("User not found");
      }
    } catch (err) {
      console.log(err);
      setError("An error occurred. Please try again.");
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
                  <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                    <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                      Verified email
                    </h4>
                    <form onSubmit={handleSubmit}>
                    <p className="mb-9 ml-1 text-base text-gray-600">
                      Enter your email to verified!
                    </p>
                    <input
                      variant="auth"
                      extra="mb-3"
                      label="Email*"
                      placeholder="youremail@gmail.com"
                      id="email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-stroke bg-transparent focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default"
                    />
                    <div className="mt-4">
                      <p className={error ? "text-red-500" : "hidden"}>
                        {error}
                      </p>
                    </div>
                    <button className="linear mt-6 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                      Verified
                    </button>
                    </form>
                  </div>
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
      </div>
    </div>
  );
}
