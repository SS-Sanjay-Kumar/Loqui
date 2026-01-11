import { create } from 'zustand';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

import { axiosInstance } from '../lib/axios';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

// set -> setter
export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check-auth");
            set({ authUser: res.data.user });
            get().connectSocket();
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
            set({ authUser: res.data.user });
            toast.success("Signup Successful");
            get().connectSocket();
        } catch (error) {
            console.log("error in signup:", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (email, password) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", email, password,);
            set({ authUser: res.data.user });
            toast.success("Login Successful");
            get().connectSocket();
        } catch (error) {
            console.log("error in login:", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logout Successful");
            get().disconnectSocket();
        } catch (error) {
            console.log("error in logout:", error);
            toast.error(error.response.data.message);
        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/edit-profile", data);
            set({ authUser: res.data.user });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update profile:", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        });
        socket.connect();

        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },
    disconnectSocket: () => {
        const socket = get().socket;
        if (socket) {
            socket.disconnect();
            set({ socket: null, onlineUsers: [] });
        }
    },


}));