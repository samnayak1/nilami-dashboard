import { useQuery } from "@tanstack/react-query";
import axiosClient from "../configs/axiosClient";
import { ApiEndpoints } from "../types/endpoints";
import type { ItemsResponse } from "../types";



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