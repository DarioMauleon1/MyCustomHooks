import { useEffect } from "react";
import { useState } from "react";

const localCache = {};

const initialState = {
  data: null,
  isLoading: true,
  hasError: false,
  error: null,
};

export const useFetch = (url) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    getFech();
  }, [url]);

  const setLoadingState = () => setState(initialState);

  const getFech = async () => {
    if (localCache[url]) {
      console.log("Usando caché");
      setState({
        data: localCache[url],
        isLoading: false,
        hasError: false,
        error: null,
      });
      return;
    }

    setLoadingState();
    const res = await fetch(url);

    // sleep
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (!res.ok) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          code: res.status,
          message: res.statusText,
        },
      });
      return;
    }

    const data = await res.json();

    // console.log(data);

    setState({
      data,
      isLoading: false,
      hasError: false,
      error: null,
    });

    // Manejo del caché
    localCache[url] = data;
  };

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};
