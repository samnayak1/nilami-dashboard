import { useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '../types/endpoints';
import type { ItemsResponse } from '../types';
import axiosClient from '../api/services/axiosClient';


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