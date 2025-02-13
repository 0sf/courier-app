import { create } from "zustand";
import { loginUser, registerUser } from "../services/authService";
import { User } from "../types";
import axios from "axios";

interface AuthCredentials {
  email: string;
  password: string;
}

interface RegisterData extends AuthCredentials {
  name: string;
  address: string;
  phone_number: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (data: AuthCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
}
const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  setUser: (user) => set({ user }),
  setError: (error) => set({ error }),
  login: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await loginUser(data);
      set({ user: response.user, loading: false });
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.token}`;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        set({
          error: err.response.data.message || "Login failed",
          loading: false,
        });
      } else {
        set({ error: "An unexpected error occurred", loading: false });
      }
      throw err;
    }
  },
  register: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await registerUser(data);
      set({ user: response.user, loading: false });
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.token}`;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        set({
          error: err.response.data.message || "Login failed",
          loading: false,
        });
      } else {
        set({ error: "An unexpected error occurred", loading: false });
      }
      throw err;
    }
  },
  logout: () => {
    set({ user: null, loading: false });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  },
}));

// Load user from localStorage on initial load
if (typeof window !== "undefined") {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  if (storedUser && storedToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    useAuthStore.getState().setUser(JSON.parse(storedUser));
  }
  useAuthStore.getState().loading = false;
}

export default useAuthStore;
