import {useState, useEffect} from 'react'

const useFetch = (url) => {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);  
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("Fetch data once when we render");
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, [url]);

  return {data, setData, isPending, error}
}
export default useFetch;

{/* 
HOW TO USE:

      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {dataName && (
        Data you want
      )}

*/}