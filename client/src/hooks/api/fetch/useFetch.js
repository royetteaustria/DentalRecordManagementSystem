import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      setLoading(true);
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response)
        })
        .catch((err) => {
          setError(err);
          console.log(err)
        })
        .finally(() => {
          const timer = setTimeout(() => {
            setLoading(false);
          }, 1000);
          return () => clearTimeout(timer);
        });
    }, [url]);

    return { data, loading, error}
}
