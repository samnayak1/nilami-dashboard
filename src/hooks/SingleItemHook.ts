import { useQuery } from "@tanstack/react-query";
import axiosClient from "../configs/axiosClient";

import { ApiEndpoints } from "../types/endpoints";
import type { Item } from "../types";

export const fetchItemById = async (id: string) => {
  const response = await axiosClient.get<Item>(`${ApiEndpoints.GET_ITEMS}/${id}`);
  return response.data;
};

export const useItem = (id: string | undefined) => {
  return useQuery({
    queryKey: ['item', id],
    queryFn: () => fetchItemById(id!),
    enabled: !!id, 
  });
};