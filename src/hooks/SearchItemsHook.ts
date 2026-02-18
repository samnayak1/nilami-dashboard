import { useQuery } from "@tanstack/react-query";

import { ApiEndpoints } from "../types/endpoints";
import type { ItemsResponse } from "../types";
import axiosClient from "../api/services/axiosClient";



const fetchSearchResults = async (searchQuery:string, page = 0) => {
  const response = await axiosClient.get<ItemsResponse>(ApiEndpoints.SEARCH_ITEMS, {
    params: {
      keyword: searchQuery, 
      page: page,          
      size: 10,           
      sort: 'createdAt,desc' 
    }
  });
  return response.data;
};

export const useSearchItems = (page: number = 0, size: number = 20, searchString:string) => {
  return useQuery({
    queryKey: ['items-search', page, size, searchString],
    queryFn: () => fetchSearchResults(searchString, page), 
  });
};