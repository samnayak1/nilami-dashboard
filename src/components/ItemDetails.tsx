import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useItem } from '../hooks/SingleItemHook';
import { useEffect, useState } from 'react';
import { socket } from '../configs/socketClient';
import { Button, Card, InputNumber, List, Skeleton, Image, Carousel } from 'antd';
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
  const navigate = useNavigate();

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
          id: data.bidId,
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
  }, [id, queryClient, socket]);

  if (isLoading) return <Skeleton active />;
  if (!item) return <div>Item not found</div>;

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-4">
      {/* Images of the item */}
    <div>
      <div className="mb-6">
    <Button 
      type="text" 
      icon={<div>↶</div>} 
      onClick={() => navigate('/dashboard')}
      className="flex items-center font-bold bg-fresh-light p-4"
    >
       Go Home
    </Button>
  </div>
      <Carousel
        className="w-full h-full overflow-hidden rounded-xl shadow-md p-8 bg-fresh-light"
        autoplay
        arrows
        autoplaySpeed={5000}
      >
        {item.pictureIds.length > 0 && item.pictureIds.map((url, index) => (
          <div key={index}>
            <div className="flex items-center justify-center bg-gray-100 h-96">
              <Image
                className="object-cover h-full w-full"
                src={url}
                alt={`${item.title} - ${index + 1}`}


              />
            </div>
          </div>
        ))}
      </Carousel>
      {item.pictureIds.length === 0 && (
        <div className="flex items-center justify-center bg-gray-200 h-96">
          <p>No Image Available</p>
        </div>
      )}
      </div>



      {/* Description of the item with price */}
      <div className="bg-wheat row-span-2 text-main-text p-8 rounded-2xl shadow-xl flex flex-col gap-6">

        <div>
          <span className="text-sm">{item.brand}</span>
          <h1 className="text-4xl font-bold mt-1">{item.title}</h1>
        </div>


        <div className="bg-earth p-6 rounded-xl backdrop-blur-sm border border-white/10">
          <h3 className="text-sm uppercase tracking-wider opacity-90 text-cream">Current Highest Bid</h3>
          <div className="flex gap-2 mt-2">
            <span className="text-5xl font-extrabold text-white">${item.highestBidPrice}</span>
            <span className="text-lg opacity-60 line-through text-cream">${item.basePrice}</span>
          </div>
        </div>


     


        <div className="flex justify-between items-center mt-4 p-4 rounded-lg">
          <div>
            <p className="text-xs uppercase opacity-70">Auction Ends In</p>
            <p className="text-center text-lg font-bold">{new Date(item.expiryTime).toLocaleTimeString()}</p>
          </div>

        </div>
           <div className="border-t border-white/20 pt-6">

          <p className="leading-relaxed opacity-90 text-lg">
            {item.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Place bid input and history of bids of the item */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase">
            Your Bid Amount
          </label>
          <div className="flex gap-3">
            <InputNumber
              className="flex-grow rounded-lg border-gray-300 hover:border-pink-red focus:border-pink-red"
              size="large"
              min={0}
              value={bidValue}
              onChange={(val) => setBidValue(val || 0)}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}

            />
            <Button
              type="primary"
              size="large"
              className="bg-pink-red hover:bg-pink-red/90 border-none px-8 font-bold rounded-lg h-[40px]"
              loading={getIdempotent.isPending || createBid.isPending}
              onClick={handleBidFlow}
            >
              Place Bid
            </Button>
          </div>

        </div>


        <Card
          title={<span className="text-pink-red font-bold">Bid History</span>}
          className="mt-2 rounded-2xl border-none shadow-sm bg-cream/30"

        >
          <List
            dataSource={bidsHistory?.data}
            className="max-h-[300px] overflow-y-auto"
            renderItem={(bid, index) => (
              <List.Item className={`border-b border-gray-100 ${index === 0 ? 'bg-fresh-light/10' : ''}`}>
                <List.Item.Meta
                  avatar={
                    <div className={`w-2 h-2 rounded-full mt-2 ${index === 0 ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                  }
                  title={
                    <span className={`text-lg font-mono ${index === 0 ? 'text-pink-red font-bold' : 'text-gray-700'}`}>
                      ${bid.price.toLocaleString()}
                    </span>
                  }
                  description={<span className="text-xs text-gray-400">Bidder ID: {bid.creatorId?.substring(0, 8)}...</span>}
                />
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-600">
                    {new Date(bid.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="text-[10px] text-gray-400 uppercase">
                    {new Date(bid.created).toLocaleDateString()}
                  </div>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </div>


    </div>
  );
}

export default ItemDetailPage;