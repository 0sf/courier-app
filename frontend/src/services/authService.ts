import axios from "axios";
import { User } from "../types";

const API_BASE_URL =
  import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

interface RegisterData {
  email: string;
  password: string;
  name: string;
  address: string;
  phone_number: string;
}

interface LoginData {
  email: string;
  password: string;
}

// Register
export const registerUser = async (
  userData: RegisterData
): Promise<{ user: User; token: string }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      ...userData,
      phone_number: userData.phone_number
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
    throw new Error('Unable to connect to the server');
  }
};

// Login User
export const loginUser = async (
  credentials: LoginData
): Promise<{ user: User; token: string }> => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  return response.data;
};

// Current User
export const fetchCurrentUser = async (): Promise<User> => {
  const response = await axios.get(`${API_BASE_URL}/users/me`);
  return response.data;
};
