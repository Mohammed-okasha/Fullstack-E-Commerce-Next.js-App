import { useState, useCallback } from "react";

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async (reqConfig) => {
    setIsLoading(true);

    const res = await fetch(reqConfig.url, {
      method: reqConfig.method ? reqConfig.method : "GET",
      body: reqConfig.body ? JSON.stringify(reqConfig.body) : null,
      headers: reqConfig.headers ? reqConfig.headers : {},
    });

    const data = await res.json();

    setIsLoading(false);

    if ((res.status !== 200 || res.status !== 201) && !res.ok) {
      throw new Error(data.message || "something went wrong!");
    }

    return data;
  }, []);

  return { loading: isLoading, sendRequest };
};
