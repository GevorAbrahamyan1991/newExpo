import { useQuery } from "@tanstack/react-query";

type Props = {
  url: string;
};

function useFetchData({ url }: Props) {
  return useQuery(["fetchData", url], async () => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  });
}

export default useFetchData;
