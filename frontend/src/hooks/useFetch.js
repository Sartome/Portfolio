import { useState, useEffect } from 'react';

// basic fetch hook with abort support
export default function useFetch(url, options = {}, immediate = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!immediate || !url) return;
    const controller = new AbortController();
    setLoading(true);
    fetch(url, { signal: controller.signal, ...options })
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText || 'Network error');
        return r.json();
      })
      .then(setData)
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
