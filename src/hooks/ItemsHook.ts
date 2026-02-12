import { useQuery } from '@tanstack/react-query';
import axiosClient from '../configs/axiosClient';

import { ApiEndpoints } from '../types/endpoints';
import type { ItemsResponse } from '../types';


const fetchItems = async (page: number, size: number, categoryId?: string) => {
  const response = await axiosClient.get<ItemsResponse>(ApiEndpoints.DASHBOARD_ITEMS, {
    params: { page, size, categoryId },
  });
  return response.data;
};

export const useItems = (page: number = 0, size: number = 10, categoryId?: string) => {
  return useQuery({
    queryKey: ['items', page, size, categoryId],
    queryFn: () => fetchItems(page, size, categoryId),
    placeholderData: (previousData) => previousData, 
  });
};