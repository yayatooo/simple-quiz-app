import { useState, useEffect, useCallback } from "react";

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useFetch = <T = unknown>(url: string | null): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(
    async (controller: AbortController) => {
      if (!url) return; // Return early if url is null

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error("Response not OK!");
        }
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  useEffect(() => {
    const controller = new AbortController();
    if (url) {
      fetchData(controller);
    }

    return () => {
      controller.abort();
    };
  }, [url, fetchData]);

  return { data, loading, error };
};

export default useFetch;
