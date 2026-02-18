import { useEffect } from 'react';

import { useAccessToken } from '../store/useAuthStore';
import { socket } from '../api/services/socketClient';

export const useSocketInit = () => {
  const token = useAccessToken();

  useEffect(() => {

    socket.auth = { token };

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
       socket.off('connect');
       socket.off('disconnect');
       socket.off('connect_error');
    };
  }, [token]); 
};