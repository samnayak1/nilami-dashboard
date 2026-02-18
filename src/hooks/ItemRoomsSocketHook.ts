import { useEffect } from 'react';

import { socket } from '../api/services/socketClient';
import type { Item } from '../types';


export const useItemRooms = (items: Item[] | undefined) => {
  const idsString = items?.map(i => i.id).join(',') || '';

  useEffect(() => {
    if (!items || items.length === 0) return;

    const emitJoin = () => {
      items.forEach(item => {
        socket.emit('JOIN_ITEM_ROOM', { itemId: item.id });
        console.log("Room Joined:", item.id);
      });
    };

    if (socket.connected) {
      emitJoin();
    } else {
      socket.once('connect', emitJoin);
    }

    return () => {
      items.forEach(item => {
        socket.emit('LEAVE_ITEM_ROOM', { itemId: item.id });
      });
    };
  }, [idsString]); 
};