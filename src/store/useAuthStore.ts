import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserInfo } from '../types';




interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  idToken: string | null;
  userInfo: UserInfo | null;
  expiresAt: number | null;
  isAuthenticated: boolean;


  actions: {
    setAuth: (data: {
      accessToken: string;
      refreshToken?: string;
      idToken: string;
      expiresAt: number,
      isAuthenticated: boolean
    }) => void;
    setUserInfo: (userInfo: AuthState['userInfo']) => void;
    logout: () => void;
    isTokenExpired: () => boolean;
    isTokenExpiringSoon: () => boolean;
  };
}


const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      //initial state
      accessToken: null,
      refreshToken: null,
      userInfo: null,
      isAuthenticated: false,
      idToken: null,
      expiresAt: null,


      actions: {

        setAuth: (data) => {
          const expiresAt = Date.now() + (data.expiresAt * 1000);
          set({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken || get().refreshToken,
            idToken: data.idToken,
            isAuthenticated: true,
            expiresAt,
          });
        },

        logout: () => set({
          accessToken: null,
          idToken: null,
          refreshToken: null,
          expiresAt: null,
          userInfo: null,
        }),
        setUserInfo: (userInfo) => set({ userInfo }),
        isTokenExpired: function (): boolean {
          const { expiresAt } = get();
          if (!expiresAt) return true;
          return Date.now() >= expiresAt;
        },
        isTokenExpiringSoon: function (): boolean {
          const { expiresAt } = get();
          if (!expiresAt) return true;

          const bufferTime = 5 * 60 * 1000;  //refresh before 5 mins
          return Date.now() >= (expiresAt - bufferTime);
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        idToken: state.idToken,
        expiresAt: state.expiresAt,
        userInfo: state.userInfo,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);


export const useAccessToken = () => useAuthStore((state) => state.accessToken);
export const useUser = () => useAuthStore((state) => state.userInfo);
export const useAuthActions = () => useAuthStore((state) => state.actions);

export default useAuthStore;