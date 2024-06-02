import usePutRequest from "hooks/api/put/usePut";
import useFetch from "hooks/api/fetch/useFetch";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateAppointment = () => {
  const [title, setTitle] = useState('');
  const [end, setEnd] = useState(null);
  const [start, setStart] = useState(null);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const {id} = useParams()
  const URL =  `http://localhost:4000/api/AppointmentRoutes/${id}`
  const {  data, putError, isLoading, putData  } = usePutRequest(URL);
  const { data: appointments, loading, error } = useFetch(URL)


  useEffect(() => {
    if(appointments) {
        setTitle(appointments.title);
        setStart(appointments.start)
        setEnd(appointments.end)
        setDescription(appointments.description)
    }
  }, [appointments])
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    navigate("/admin/appointment");
    toast.success('Successfuly update')
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      start,
      end,
      title,
      description,
    };

    try {
      await putData(requestBody);
      toast.success("Appointment added successfully!");
      navigate("/admin/appointment");
    } catch (error) {
      toast.error("Failed to add appointment.");
    }
  };

  return (
    <>
      <div className="mx-auto max-w-270 mt-6 rounded-2xl">
        <div className="grid grid-cols-1 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-2xl bg-white dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-lg text-black dark:text-white">
                  Update Appointment <span className="text-warning w-full"><p>Note: <span className="text-red-400">Set the end time one hour and above to start time</span></p></span>
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row"></div>
                  <div className="mb-5.5 mt-2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Title
                    </label>
                    <input
                      className="border-stroke focus:border-primary active:border-primary dark:border-form-strokedark  dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] bg-white py-3 px-5 font-medium outline-none transition dark:bg-navy-700 dark:text-white"
                      type="text"
                      placeholder="Title"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-5.5 mt-2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Start date
                    </label>
                    <ReactDatePicker
                      placeholderText="Select start date"
                      selected={start}
                      minDate={new Date()}
                      onChange={(date) => setStart(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="form-control border-stroke focus:border-primary active:border-primary dark:border-form-strokedark  dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] bg-white py-3 px-5 font-medium outline-none transition dark:bg-navy-700 dark:text-white"
                      id="start"
                    />
                  </div>
                  <div className="mb-5.5 mt-2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      End date
                    </label>
                    <ReactDatePicker
                      placeholderText="Select end date"
                      selected={end}
                      onChange={(date) => setEnd(date)}
                      showTimeSelect
                      minDate={new Date()}
                      timeFormat="HH:mm"
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="form-control border-stroke focus:border-primary active:border-primary dark:border-form-strokedark  dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] bg-white py-3 px-5 font-medium outline-none transition dark:bg-navy-700 dark:text-white"
                      id="end"
                    />
                  </div>
                  <div className="mb-5.5 mt-2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Description <span className="text-danger">(Optional)</span>
                    </label>
                    <input
                      className="border-stroke focus:border-primary active:border-primary dark:border-form-strokedark  dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] bg-white py-3 px-5 font-medium outline-none transition dark:bg-navy-700 dark:text-white"
                      type="text"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <span className="flex justify-center mt-4">
                    <button className="linear mt-2 w-full rounded-lg bg-brand-500 py-[10px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" type="submit">
                      Update appointment
                    </button>
                  </span>
                </form>
                {isLoading && <p>Loading...</p>}
                {error && <p className="text-danger">Error: {error.message}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateAppointment;
