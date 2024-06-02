import React from "react";

const CardsLoader = () => {
  return (
    <div class="mx-auto h-24 rounded-md bg-white w-full">
      <div class="flex h-full animate-pulse flex-row items-center justify-center space-x-5">
        <div class="h-12 w-12 rounded-full bg-gray-300 "></div>
        <div class="flex flex-col space-y-3">
          <div class="h-6 w-36 rounded-md bg-gray-300 "></div>
          <div class="h-6 w-24 rounded-md bg-gray-300 "></div>
        </div>
      </div>
    </div>
  );
};

export default CardsLoader;
