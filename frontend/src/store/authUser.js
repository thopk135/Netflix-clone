import axios from "axios";
import toast from "react-hot-toast";
import {create} from "zustand"


export const useAuthStore = create((set) => ({
    user:null,
    isSigningup:false,
    isCheckingAuth:true,
    isLoggingOut:false,
    isLoggingIn:false,
    signup: async (credentials) => {
        set({isSigningup:true});
        try {
            const response = await axios.post("/api/v1/auth/signup",credentials)
            set({user:response.data.user,isSigningup:false});
            toast.success("Account created successfully")
        } catch (error) {
            toast.error(error.response.data.error||"An error occurred");
            set({isSigningup:false,user:null});
        }
    },
    login: async (credentials) => {
        set({isLoggingIn:true});
        try {
            const response = await axios.post("/api/v1/auth/login",credentials);
            set({user:response.data.user,isLoggingIn:false})
            toast.success("Login successfully");
        } catch (error) {
            toast.error(error.response.data.error||"Login failed");
            set({isLoggingIn:false,user:null});
        }
    },
    logout: async () => {
        set({isLoggingOut:true});
        try {
            await axios.post("/api/v1/auth/logout");
            set({user:null,isLoggingOut:false});
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.error||"Logout failed");
            set({isLoggingOut:false})
        }
    },
    authCheck: async () => {
        set({isCheckingAuth:true});
        try {
            const response = await axios.get("/api/v1/auth/authCheck");
            set({user:response.data.user,isCheckingAuth:false});
        } catch (error) {
            set({isCheckingAuth:false,user:null});
            // toast.error(error.response.data.error||"Check failed");
        }
    },
}))