import axios from "axios";
import { useState } from "react";

const usePutRequest = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const putData = async (requestBody) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.put(url, requestBody);
      setData(response.data);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, putData };
};

export default usePutRequest