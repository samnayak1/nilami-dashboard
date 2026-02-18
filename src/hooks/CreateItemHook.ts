import { useMutation, useQueryClient } from "@tanstack/react-query";


import { ApiEndpoints } from "../types/endpoints";
import { message } from "antd";
import axios from "axios";
import type { CreateItemPayload, CreateItemResponse } from "../types";
import axiosClient from "../api/services/axiosClient";
const s3Upload = axios.create();
export const itemService = {
  createItem: async (payload: CreateItemPayload) => {
    const { data } = await axiosClient.post<CreateItemResponse>(ApiEndpoints.CREATE_ITEM, payload);
    return data.data;
  },
  //get the presigned url first and then you can upload the file to s3 directly using that url using uploadToS3 function
  getPresignedUrl: async (fileName: string, objectId: string) => {
    const { data } = await axiosClient.put<{ message: string }>(ApiEndpoints.GET_PRESIGNED_URL, { fileName, objectId });
    return data.message;
  },
  uploadToS3: async (url: string, file: File) => {
    await s3Upload.put<void>(url, file, {
      headers: { 'Content-Type': file.type }
    });
  },
  addPictures: async (itemId: string, pictureIds: string[]) => {
    const { data } = await axiosClient.put<
      { itemId: string, pictureIds: string[] }
    >(ApiEndpoints.ADD_PICTURES, { itemId, pictureIds });
    return data;
  }
};

export const useCreateItemWorkflow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ itemData, files }: { itemData: CreateItemPayload, files: File[] }) => {
      
      const itemId = await itemService.createItem(itemData);
      const fileNames = files.map(file => file.name);
      await Promise.all(
         files.map(async (file) =>   {
          const uploadUrl = await itemService.getPresignedUrl(file.name, itemId);
          await itemService.uploadToS3(uploadUrl, file);
        })
      );
      return await itemService.addPictures(itemId, fileNames);
    },
    onSuccess: () => {
      //invalidate items list to refetch with new item
      queryClient.invalidateQueries({ queryKey: ['items'] });
      message.success("Item uploaded")
    },
    onError: (e) => {
      message.error("Error" + e.message)
    }
  });
};