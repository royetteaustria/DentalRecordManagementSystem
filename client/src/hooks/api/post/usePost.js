import axios from "axios";
import { useState } from "react";

export default function usePost(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const postData = async (requestBody) => {
      setIsLoading(true);
      setError(null);
  
      try {
        const response = await axios.post(url, requestBody);
        setData(response.data);
      } catch (error) {
        setError(error);
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    };
  
    return { data, error, isLoading, postData };
}
