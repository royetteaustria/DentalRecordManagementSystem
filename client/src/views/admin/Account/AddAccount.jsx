import React from "react";

const AddAccount = () => {
  return (
    <>
      <div className="size-full shadow-default mt-4  rounded-2xl border bg-white dark:bg-navy-700">
        <div className="px-6  border-b py-4">
          <h3 className="text-black justify-between p-2 font-medium dark:text-white">
            Input Information below*
          </h3>
        </div>
        <form className="px-7 py-4">
          <div className="p-6.5">
            <div className="mb-4.5 py-2">
              <label className="text-black mb-2.5 block dark:text-white">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
                className="border-stroke focus:border-primary active:border-primary dark:border-form-strokedark  dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] bg-white py-3 px-5 font-medium outline-none transition dark:bg-navy-700 dark:text-white"
              />
            </div>
            <div className="mb-4.5 py-2">
              <label className="text-black mb-2.5 block dark:text-white">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                className="border-stroke focus:border-primary active:border-primary dark:border-form-strokedark  dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] bg-white py-3 px-5 font-medium outline-none transition dark:bg-navy-700 dark:text-white"
              />
            </div>
            <div className="py-2 mb-4.5">
              <label className="text-black mb-2.5 block dark:text-white">
                Role
              </label>
              <div className="bg-transparent dark:bg-form-input relative z-20">
                <select
                  // value={role}
                  // onChange={(e) => setRole(e.target.value)}
                  className="border-stroke focus:border-primary active:border-primary dark:border-form-strokedark  dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] bg-white py-3 px-5 font-medium outline-none transition dark:bg-navy-700 dark:text-white"
                >
                  <option value="" disable selected hidden>
                    Select a role
                  </option>
                  <option value="System Administrator">
                    System Administrator
                  </option>
                  <option value="Dentist Employee">
                  Dentist Employee
                  </option>
                </select>
              </div>
            </div>
            <div className="mb-4.5 py-2">
              <label className="text-black mb-2.5 block dark:text-white">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                className="border-stroke focus:border-primary active:border-primary dark:border-form-strokedark  dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] bg-white py-3 px-5 font-medium outline-none transition dark:bg-navy-700 dark:text-white"
              />
            </div>

            <div className="mb-5.5">
              <label className="text-black mb-2.5 block dark:text-white">
                Re-type Password
              </label>
              <input
                type="password"
                placeholder="Re-enter password"
                // value={confirmPassword}
                // onChange={(e) => setconfirmPassword(e.target.value)}
                className="border-stroke focus:border-primary active:border-primary dark:border-form-strokedark  dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] bg-white py-3 px-5 font-medium outline-none transition dark:bg-navy-700 dark:text-white"
              />
            </div>
            
            <div className="py-4">
              <button
                type="submit"
                className="linear mt-2 w-full rounded-lg bg-brand-500 py-[10px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              >
                Add Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAccount;
