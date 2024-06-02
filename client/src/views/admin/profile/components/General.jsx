import Card from "components/card";
import React from "react";
import useFetch from "hooks/api/fetch/useFetch";
import { useParams } from "react-router-dom";
import useFormatDateTime from "hooks/Date/useDateFormat";
import SkeletonLoader from "components/Loader/SkeletonLoader";
const General = () => {
  const {id} = useParams();
  const URL = `http://localhost:4000/api/ClientRoutes/info/${id}`;
  const { data, error, loading } = useFetch(URL);
  const date = useFormatDateTime()
  if (loading) {
    return <h1><SkeletonLoader/></h1>;
  }

  if (error) {
    console.log(error);
    return <h1>Error loading data</h1>;
  }

  if (!data) {
    return <h1 className="italic">No data available</h1>;
  }

  const balance = data.TotalPrice - data.DownPayment
  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          General Information
        </h4>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 px-2">
      <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Sex</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {data.Sex.toUpperCase()}
          </p>
        </div>
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Services type</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {data.DentalTypeServices.toUpperCase()}
          </p>
        </div>
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Service Price Avail</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          ₱{data.TotalPrice}
          </p>
        </div>
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Partial Paid/Downpayment/Fully paid</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          ₱{data.DownPayment}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Payment Status</p>
          <p className={data.PaymentStatus === 'Pending'? 'text-orange-500' : "text-base font-medium text-green-500 dark:text-white"}>
          {data.PaymentStatus}
          </p>
        </div>
        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Client Status</p>
          <p className={data.ClientStatus === 'Pending'? 'text-orange-500' : "text-base font-medium text-green-500 dark:text-white"}>
            {data.ClientStatus}
          </p>
        </div>
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Balance</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          ₱{balance}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Medical History</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {data.MedicalHistory}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Date Start</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {date(data.DateStart)}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default General;
