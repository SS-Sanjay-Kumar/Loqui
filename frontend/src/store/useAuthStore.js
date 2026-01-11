import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

// set -> setter
export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check-auth");
            set({ authUser: res.data });

        } catch (error) {
            console.error("User not authenticated: ", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Signup Successful");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async(email, password)=>{
        set({isLoggingIn: true});
        try {
            const res = await axiosInstance.post("/auth/login", email, password);
            set({ authUser: res.data });
            toast.success("Login Successful");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },
    logout: async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logout Successful");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
}));