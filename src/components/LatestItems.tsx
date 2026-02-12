import { useEffect, useState } from "react";
import { useItems } from "../hooks/ItemsHook";
import { Alert, Pagination, Spin } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "../configs/socketClient";

import { useItemRooms } from "../hooks/ItemRoomsSocketHook";
import type { BidPlacedPayload, ItemsResponse, Item } from "../types";
import ItemCard from "./ItemCard";

function LatestItems() {

  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, isError } = useItems(currentPage, 10);
  const queryClient = useQueryClient();

  useItemRooms(data?.content);



  useEffect(() => {
    const handleNewBid = (payload: BidPlacedPayload) => {
      console.log(`New bid placed on ${payload.itemId}: $${payload.amount}`);
      const data = typeof payload === 'string' ? JSON.parse(payload) : payload;
      queryClient.setQueryData(['items', currentPage, 10], (oldData: ItemsResponse) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          content: oldData.content.map((item: Item) =>
            item.id === data.itemId
              ? { ...item, highestBidPrice: data.amount }
              : item
          ),
        };
      });
    };
    socket.on('BID_PLACED', handleNewBid);
    return () => {
      socket.off('BID_PLACED', handleNewBid);
    };
  }, [currentPage, queryClient]);


  if (isLoading) return <Spin size="large" />;
  if (isError) return <Alert title="Error loading items" type="error" />;



  return (
  
  <div className="my-10">
    <h2 className="text-left text-xl mb-6 font-semibold text-earth">Latest Items</h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-6">
      {data?.content.map((item) => (
     
          <ItemCard {...item} />
       
      ))}
      </div>


    <Pagination
      className="mt-4 flex justify-center"
      current={currentPage + 1}
      total={data?.totalElements}
      pageSize={10}
      onChange={(page) => setCurrentPage(page - 1)}
    />
  </div>
  
);
}

export default LatestItems;