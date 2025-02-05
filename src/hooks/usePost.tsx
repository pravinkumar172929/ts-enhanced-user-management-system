import { useState } from "react";

type PostApiResponse<T> = {
  data: T | null;
  isLoading: boolean;
  error: null | string;
  postDataFunction: (newData: T) => Promise<void>;
};

const usePost = <T,>(url: string): PostApiResponse<T> => {
  const [data, setData] = useState<null | T>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const postDataFunction = async (newData: T) => {
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        throw new Error(`Something went wrong!! ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, postDataFunction };
};

export default usePost;
