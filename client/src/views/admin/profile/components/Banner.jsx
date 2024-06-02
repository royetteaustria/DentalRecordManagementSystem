import React from "react";
import avatar from "assets/img/avatars/jv.jpg";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";
import useFetch from "hooks/api/fetch/useFetch";
import { useParams } from "react-router-dom";
import SkeletonLoader from "components/Loader/SkeletonLoader";
import FemaleAvatar from '../../../../assets/img/avatars/Female-Avatar-5.png'
import Male from '../../../../assets/img/avatars/maleAvatar.jpeg'

const Banner = () => {
  const { id } = useParams()
  const URL = `http://localhost:4000/api/ClientRoutes/info/${id}`;
  const { data, error, loading } = useFetch(URL);
  
  if (loading) {
    return <h1><SkeletonLoader/></h1>;
  }

  if (error) {
    console.log(error);
    return <h1>Error loading data</h1>;
  }

  // Ensure data is not null before rendering
  if (!data) {
    return <h1>No data available</h1>;
  }
  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
        <img className="h-full w-full rounded-full" src={data.Sex === 'Male' ? Male : FemaleAvatar} alt="" />
        </div>
      </div>

      {/* Name */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {data.FirstName} {data.LastName}
        </h4>
      </div>

    </Card>
  );
};

export default Banner;
