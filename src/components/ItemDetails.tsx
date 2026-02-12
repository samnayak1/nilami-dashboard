import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useItem } from '../hooks/SingleItemHook';
import { useEffect, useState } from 'react';
import { socket } from '../configs/socketClient';
import { Button, Card, InputNumber, List, Skeleton ,Image} from 'antd';
import { useBidHistory } from '../hooks/BidHistoryHook';

import { useGetIdempotentKey } from '../hooks/IdempotentKeyHook';
import { useCreateBid } from '../hooks/CreateBidHook';
import { useItemRooms } from '../hooks/ItemRoomsSocketHook';
import type { BidPlacedPayload, Item, BidsResponse, Bid } from '../types';


function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [bidValue, setBidValue] = useState<number>(0);
  const { data: item, isLoading } = useItem(id);
  const { data: bidsHistory } = useBidHistory(id);
  useItemRooms(item ? [item] : []);
  const getIdempotent = useGetIdempotentKey();
  const createBid = useCreateBid();

  const handleBidFlow = () => {

    getIdempotent.mutate(
      { itemId: id!, bidAmount: bidValue },
      {
        onSuccess: (idempRes) => {
          const key = idempRes.data.idempotentKey;

          createBid.mutate({
            itemId: id!,
            price: bidValue,
            idempotentKey: key
          });
        }
      }
    );
  };


  useEffect(() => {
    if (!id) return;

    const handleNewBid = (payload: BidPlacedPayload) => {
       
      const data = typeof payload === 'string' ? JSON.parse(payload) : payload;
   
      const bidAmount = parseFloat(String(data.amount));

      const date = new Date(data.timestamp);

      const isValidDate = !isNaN(date.getTime());

  

      queryClient.setQueryData(['item', id], (oldItem: Item) => {
        if (!oldItem) return oldItem;
        return {
          ...oldItem,
          highestBidPrice: bidAmount 
        };
      });


      queryClient.setQueryData(['bids', id], (old: BidsResponse | undefined) => {
        if (!old) return old;
        const newBid: Bid = {
          id: data.bidId ,
          price: bidAmount,
          created: isValidDate ? date.toISOString() : new Date().toISOString(),
          itemId: data.itemId,
          creatorId: data.userId,
        };
        setBidValue(bidAmount + 1);
        return {
          ...old,
          data: [newBid, ...old.data],
        };
      });
    };

    socket.on('BID_PLACED', handleNewBid);
    return () => { socket.off('BID_PLACED', handleNewBid); };
  }, [id, queryClient,socket]);

  if (isLoading) return <Skeleton active />;
  if (!item) return <div>Item not found</div>;

  return (
    <div className="">
      <h1>{item.title}</h1>
      { item.pictureIds.length > 0 && item.pictureIds.map((url, index) => (
        <Image src={url} alt={`${item.title} - ${index + 1}`}  />
      ))} 
     

      <div className="">
        <h3>Current Highest Bid</h3>
        <p className="">
          ${item.highestBidPrice}
        </p>
      </div>

      <InputNumber
        className="w-full"
        size="large"
        value={bidValue}
        onChange={(val) => setBidValue(val || 0)}
        prefix="$"
      />

      <Button
        type="primary"
        size="large"

        loading={getIdempotent.isPending || createBid.isPending}
        onClick={handleBidFlow}
      >
        Place Bid
      </Button>

      <p className="mt-4">{item.description}</p>




      <Card title="Bid History" className="mt-6">
        <List
          dataSource={bidsHistory?.data}
          renderItem={(bid) => (
            <List.Item>
              <List.Item.Meta
                title={bid.price}
              />
              <div>{new Date(bid.created).toLocaleTimeString()}</div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}

export default ItemDetailPage;