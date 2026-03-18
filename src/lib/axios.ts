import axios from "axios";

import { apiConfig } from "@/config/api";

// Centralize transport concerns here so feature modules can stay focused on
// typed request/response logic when the FastAPI backend is introduced.
export const apiClient = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: apiConfig.timeoutMs,
  headers: {
    "Content-Type": "application/json",
  },
});

