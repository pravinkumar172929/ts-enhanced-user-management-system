import { useEffect, useState } from "react";

type ApiResponse<T> = {
  data: T | null;
  isLoading: boolean;
  error: null | string;
};

const useFetch = <T,>(url: string): ApiResponse<T> => {
  const [data, setData] = useState<null | T>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Unable to get data!! ${response.status}`);
        }
        const result: T = await response.json();
        setData(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
