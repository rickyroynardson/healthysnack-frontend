import { useStore } from "@/store";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
  async (axiosConfig: InternalAxiosRequestConfig) => {
    const accessToken = useStore.getState().accessToken;

    if (axiosConfig.headers) {
      if (accessToken) {
        axiosConfig.headers.Authorization = `Bearer ${accessToken}`;
      }
      axiosConfig.headers.Accept = "application/json";
    }

    return axiosConfig;
  }
);

axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      useStore.setState({ accessToken: null, user: null });
      return;
    }
    throw error;
  }
);
