import axios from "axios";
import { isPublicPath } from "@/utils/publicPaths";

function getApiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.REACT_APP_API_URL ||
    "https://backend-sh16.onrender.com/api/v1"
  );
}

const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 15000,
});

/* ------------------------------------------
    REQUEST INTERCEPTOR
------------------------------------------- */
api.interceptors.request.use(
  (config) => {
    config.headers["x-platform"] = "web";
    config.headers["X-Requested-With"] = "XMLHttpRequest";

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* ------------------------------------------
    RESPONSE INTERCEPTOR
------------------------------------------- */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const hadAuth = Boolean(error.config?.headers?.Authorization);

    if (hadAuth && error.response?.data?.errorname === "TokenExpiredError") {
      handleLogoutRedirect();
    }
    if (hadAuth && status === 401) {
      handleLogoutRedirect();
    }

    return Promise.reject(error);
  },
);

function handleLogoutRedirect() {
  if (typeof window === "undefined") return;

  const currentPath = window.location.pathname;

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  if (isPublicPath(currentPath)) {
    return;
  }

  setTimeout(() => {
    window.location.href = "/login";
  }, 50);
}

export default api;
