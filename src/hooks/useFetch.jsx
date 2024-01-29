import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const signal = abortController.signal;

    const getData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);

        const response = await fetch(url, { signal });

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();

        setData(data);
      } catch (e) {
        setIsError(true);
        console.error("error", e.message);
      } finally {
        setIsLoading(false);
      }
    };

    getData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { isLoading, isError, data };
};

export default useFetch;
