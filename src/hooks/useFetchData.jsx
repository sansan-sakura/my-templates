import useSWR from "swr";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_API_KEY, // eslint-disable-line
  },
};

const fetcher = async (path) => {
  const data = await fetch(`https://api.themoviedb.org/3/${path}`, options).then((res) =>
    res.json()
  );
  return data;
};

function useFetchData(path) {
  const { data, error, isLoading } = useSWR("getData", () => fetcher(path));
  return { data, error, isLoading };
}

export default useFetchData;
