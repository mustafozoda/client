import { useQuery } from "@tanstack/react-query";
import { getMachines } from "../http/request-machines";

export function useGetProducts() {
  return useQuery({
    queryKey: ["machines"],
    queryFn: () => getMachines(),
  });
}
