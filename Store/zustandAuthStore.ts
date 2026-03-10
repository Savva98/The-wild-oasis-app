import { create } from "zustand";
import { UserDataType } from "../types/types";
import api from "../AxiosSetup/axiosSetUp";
import toast from "react-hot-toast";
interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  clearAccessToken: () => void;
  userInfo: UserDataType | null;
  setUserInfo: (data: UserDataType | null) => void;
  clearUserInfo: () => void;
  rehydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),
  userInfo: null,
  setUserInfo: (data) => set({ userInfo: data }),
  clearUserInfo: () => set({ userInfo: null }),
  rehydrate: async () => {
    try {
      console.log("rehydrating data");
      const response = await api.get("/auth/session", {
        withCredentials: true,
      });
      if (response.data.status === "success") {
        set({
          accessToken: response.data.token,
          userInfo: response.data.data.user,
        });
      }
    } catch (error) {
      toast.error("Error during auth rehydration");
      console.error("Auth rehydration error:", error);
      set({ accessToken: null, userInfo: null });
    }
  },
}));

export default useAuthStore;
