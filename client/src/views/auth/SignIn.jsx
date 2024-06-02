import InputField from "components/fields/InputField";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Initialize with empty string
  const [password, setPassword] = useState(""); // Initialize with empty string
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = { email, password };
    try {
      console.log("Logging in with:", credentials);
      const response = await axios.post(
        "http://localhost:4000/api/UserRoutes/login",
        credentials
      );
      console.log("Response:", response.data);
      if (response.data) {
        localStorage.setItem("authToken", response.data._id); // Store user ID as token
        navigate("/admin/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      if (err.response) {
        console.error("Error:", err.response.data);
        console.error("Error Status:", err.response.status);
        setError(`Error ${err.response.status}: ${err.response.data.message}`);
      } else if (err.request) {
        console.error("Error:", err.request);
        setError("No response received from the server.");
      } else {
        console.error("Error:", err.message);
        setError("An error occurred while sending the request.");
      }
      toast.error("Failed to login");
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
        {/* Email */}
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={handleLogin}>
          {/* Email */}
          <label className="text-black mb-3 block text-md font-medium dark:text-white">
            Email
          </label>
          <input
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="youremail@gmail.com"
            id="email"
            required
            type="email"
            value={email}
            className="border-stroke bg-transparent focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="py-2">
          <label className="text-black mb-3 block text-md font-medium dark:text-white">
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
            value={password}
            className="border-stroke bg-transparent focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default"
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          <div className="mb-4 flex items-center justify-between px-2">
            <Link to="emailVerified">
              <p className="text-sm font-medium dark:text-white text-navy-400">Forgot Password?</p>
            </Link>
          </div>
          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
