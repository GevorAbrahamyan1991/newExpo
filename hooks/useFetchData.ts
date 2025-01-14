import { useQuery } from "@tanstack/react-query";
import useStore from "@/stores/store";

type Props = {
  baseUrl: string;
};

function useFetchData({ baseUrl }: Props) {
  const { filters } = useStore();

  const queryString = Object.entries(filters)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const url = `${baseUrl}?${queryString}`;

  return useQuery(["fetchData", url], async () => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  });
}

export default useFetchData;
