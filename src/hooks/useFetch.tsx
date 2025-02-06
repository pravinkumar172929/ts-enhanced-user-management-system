import { useState, useEffect } from "react";

type ApiResponse<T> = {
  data: T | null;
  isLoading: boolean;
  error: null | string;
  // postDataFunction: (newData: T) => Promise<void>;
  fetchData: (newData: T) => Promise<void>;
};

const useFetch = <T,>(url: string): ApiResponse<T> => {
  const [data, setData] = useState<null | T>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const fetchData = async (newData: T | null) => {
    try {
      setIsLoading(true);
      const response =
        !newData === null
          ? await fetch(url, {
              method: "POST",
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
              body: JSON.stringify(newData),
            })
          : await fetch(url);
      if (!response.ok) {
        throw new Error(`Unable to fetch data! Status: ${response.status}`);
      }
      const result: T = await response.json();
      setData(result);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(null);
  }, [url]);

  return { data, isLoading, error, fetchData };
};

export default useFetch;
