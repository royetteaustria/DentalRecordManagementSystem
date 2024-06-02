import { useState, useEffect } from "react";
import dentalServices from "./DentalServices";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "hooks/api/fetch/useFetch";
import usePutRequest from "hooks/api/put/usePut";
import useFormatDateTime from "hooks/Date/useDateFormat";
import toast from "react-hot-toast";

const UpdateClient = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [MedicalHistory, setMedicalHistory] = useState("");
  const [DentalTypeServices, setDentalService] = useState("");
  const [DateStart, setDateStart] = useState("");
  const [PaymentStatus, setPaymentStatus] = useState("");
  const [TotalPrice, setTotalPrice] = useState();
  const [DownPayment, setDownpayment] = useState();
  const [ClientStatus, setClientStatus] = useState();
  const {id} = useParams()
  const date = useFormatDateTime()
  const { data: clientData, loading, error } = useFetch(`http://localhost:4000/api/ClientRoutes/info/${id}`);
  const {  data, putError, isLoading, putData  } = usePutRequest(`http://localhost:4000/api/ClientRoutes/update/${id}`);
  
  const navigate = useNavigate(); // Initialize the navigate function
  useEffect(() => {
    if (clientData) {
      setFirstName(clientData.FirstName);
      setLastName(clientData.LastName);
      setMedicalHistory(clientData.MedicalHistory);
      setDentalService(clientData.DentalTypeServices);
      setDateStart(clientData.DateStart);
      setPaymentStatus(clientData.PaymentStatus);
      setTotalPrice(clientData.TotalPrice);
      setDownpayment(clientData.DownPayment);
    }
  }, [clientData]);
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      FirstName,
      LastName,
      MedicalHistory,
      DentalTypeServices,
      DateStart,
      PaymentStatus,
      TotalPrice,
      DownPayment,
      ClientStatus
    };

    putData(requestBody);
  };

  // Navigate to admin/data-tables if data is successfully added
  if (data) {
    navigate("/admin/Client");
    toast.success('Successfuly update')
  }

  return (
    <>
      <div className="border-stroke size-full shadow-default dark:border-strokedark mt-4 rounded-2xl bg-white dark:bg-navy-700 dark:text-white">
        <div className="border-stroke px-6.5 dark:border-strokedark border-b py-4 dark:bg-navy-700 dark:text-white">
          <h3 className="text-navy-700 justify-between p-2 px-6 font-medium dark:text-white">
            Input Information below*
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="p-6.5">
            <div className="mb-4.5 grid grid-cols-2 gap-4 py-2">
              <div className="flex flex-col">
                <label className="text-navy mb-2.5 block dark:text-white">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Firstname"
                  value={FirstName}
                  disabled
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border-stroke focus:border-primary active:border-primary dark:border-form-strokedark  dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] bg-white py-3 px-5 font-medium outline-none transition dark:bg-navy-700 dark:text-white"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-navy mb-2.5 block dark:text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  disabled
                  placeholder="Enter Lastname"
                  value={LastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border-stroke bg-transparent focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default dark:bg-navy-700 dark:text-white"
                />
              </div>
            </div>
            <div className="mb-4.5 py-2">
              <label className="text-navy mb-2.5 block dark:text-white">
                Medical History
              </label>
              <input
                type="text"
                placeholder="Enter Medical History"
                value={MedicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                className="border-stroke bg-transparent focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default dark:bg-navy-700 dark:text-white"
              />
            </div>
            <div className="mb-4.5 py-2">
              <label className="text-navy mb-2.5 block dark:text-white">
                Dental Service avail
              </label>
              <div className="bg-transparent dark:bg-form-input relative z-20">
                <select
                  value={DentalTypeServices}
                  disabled
                  onChange={(e) => setDentalService(e.target.value)}
                  className="border-stroke bg-transparent focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus-border-primary relative z-20 w-full appearance-none rounded border py-3 px-5 outline-none transition dark:bg-navy-700 dark:text-white"
                >
                  <option
                    value=""
                    disabled
                    hidden
                    className="border-b"
                  >
                    Select Dental Services
                  </option>
                  {dentalServices.map((service) => (
                    <option
                      key={service.value}
                      value={service.value}
                      className="flex justify-between"
                    >
                      {service.label}
                      <span><RiArrowDropDownLine /></span>
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4.5 py-2">
              <label className="text-navy mb-2.5 block dark:text-white">
                Date start
              </label>
              <input
                type="text"
                disabled
                placeholder="Enter Medical History"
                value={date(DateStart)}
                onChange={(e) => setDateStart(e.target.value)}
                className="border-stroke bg-transparent focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default dark:bg-navy-700 dark:text-white"
              />
            </div>
            <div className="mb-4.5 py-2">
              <label className="text-navy mb-2.5 block dark:text-white">
                Payment Status
              </label>
              <div className="bg-transparent dark:bg-form-input relative z-20">
                <select
                  value={PaymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="border-stroke bg-transparent focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus-border-primary relative z-20 w-full appearance-none rounded border py-3 px-5 outline-none transition dark:bg-navy-700 dark:text-white"
                >
                  <option
                    value=""
                    disabled
                    hidden
                    className="border-b"
                  >
                    Select payment status
                  </option>
                  <option
                    value="Pending"
                    className="border-b"
                  >
                    Pending
                  </option>
                  <option
                    value="Fully Paid"
                    className="border-b"
                  >
                    Fully Paid
                  </option>
                </select>
              </div>
            </div>
            <div className="mb-4.5 py-2">
              <label className="text-navy mb-2.5 block dark:text-white">
                Client Status
              </label>
              <div className="bg-transparent dark:bg-form-input relative z-20">
                <select
                  value={ClientStatus}
                  onChange={(e) => setClientStatus(e.target.value)}
                  className="border-stroke bg-transparent focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus-border-primary relative z-20 w-full appearance-none rounded border py-3 px-5 outline-none transition dark:bg-navy-700 dark:text-white"
                >
                  <option
                    value=""
                    disabled
                    hidden
                    className="border-b"
                  >
                    Select client status
                  </option>
                  <option
                    value="Pending"
                    className="border-b"
                  >
                    Pending
                  </option>
                  <option
                    value="Complete"
                    className="border-b"
                  >
                    Complete
                  </option>
                </select>
              </div>
            </div>
            <div className="mb-4.5 py-2">
              <label className="text-navy mb-2.5 block dark:text-white">
                Price avail of services
              </label>
              <input
                type="number"
                disabled
                placeholder="Enter price"
                value={TotalPrice}
                onChange={(e) => setTotalPrice(e.target.value)}
                className="border-stroke bg-transparent focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default dark:bg-navy-700 dark:text-white"
              />
            </div>
            <div className="mb-4.5 py-2">
              <label className="text-navy mb-2.5 block dark:text-white">
                Total of Downpayment/Full payment
              </label>
              <input
                type="number"
                placeholder="Enter Downpayment/Full payment"
                value={DownPayment}
                onChange={(e) => setDownpayment(e.target.value)}
                className="border-stroke bg-transparent focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default dark:bg-navy-700 dark:text-white"
              />
            </div>
            <div className="py-4">
              <button
                type="submit"
                className="linear mt-2 w-full rounded-lg bg-brand-500 py-[10px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                disabled={isLoading} // Disable button during loading
              >
                {isLoading ? "Updating..." : "Update"}
              </button>
              {error && <p className="text-red-500">Failed to add client</p>}
              {data && <p className="text-green-500">Client added successfully!</p>}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateClient;
