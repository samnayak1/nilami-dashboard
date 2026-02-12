import { ConfigProvider } from 'antd';
import React, { useEffect } from 'react';


export const earthyPalette = {
  white: '#FFFFFF',
  cream: '#F9F8F6',
  beige: '#F2EFE9',
  brown: '#7D6E5D',
  wheat: '#D9C5B2',
  fresh: '#4F6D44',
  freshLight: '#E9F0E6',
  mainText: '#2D2D2D',
  mutedText: '#595959',
  lightText: '#8C8C8C',
  border: '#E8E4DE',
  pinkRed: '#682a2f',
  beigeLight: '#f5f5dc',
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {

  useEffect(() => {
    const root = document.documentElement;
    
    root.style.setProperty('--bg-primary', earthyPalette.white);
    root.style.setProperty('--bg-secondary', earthyPalette.cream);
    root.style.setProperty('--bg-tertiary', earthyPalette.beige);
    root.style.setProperty('--color-earth', earthyPalette.brown);
    root.style.setProperty('--color-wheat', earthyPalette.wheat);
    root.style.setProperty('--color-fresh', earthyPalette.fresh);
    root.style.setProperty('--color-fresh-light', earthyPalette.freshLight);
    root.style.setProperty('--text-main', earthyPalette.mainText);
    root.style.setProperty('--text-muted', earthyPalette.mutedText);
    root.style.setProperty('--text-light', earthyPalette.lightText);
    root.style.setProperty('--border-light', earthyPalette.border);
    root.style.setProperty('--color-pink-red', earthyPalette.pinkRed);
    root.style.setProperty('--bg-beige-light', earthyPalette.beigeLight);
  }, []);
  return (
   <ConfigProvider
      theme={{
        token: {
         
          colorPrimary: earthyPalette.brown,
          colorSuccess: earthyPalette.fresh,
          colorInfo: earthyPalette.brown,
          
   
          colorBgLayout: earthyPalette.cream,
          colorBgContainer: earthyPalette.white,
          
       
          colorText: earthyPalette.mainText,
          colorTextDescription: earthyPalette.mutedText,
          colorTextDisabled: earthyPalette.lightText,
          
       
          colorBorder: earthyPalette.border,
          colorBorderSecondary: earthyPalette.beige,
          
         
          fontFamily: 'Poppins, sans-serif',
        },
        components: {
          Button: {
          
            colorSuccess: earthyPalette.fresh,
            borderRadius: 4,
          },
          Card: {
            colorBgContainer: earthyPalette.white,
            colorBorderSecondary: earthyPalette.border,
          },
          Tag: {
        
            colorSuccess: earthyPalette.fresh,
            colorSuccessBg: earthyPalette.freshLight,
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
};