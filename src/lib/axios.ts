import axios from "axios";

import { apiConfig } from "@/config/api";
import type { ApiResponse } from "@/types";

// Centralize transport concerns here so feature modules can stay focused on
// typed request/response logic when the FastAPI backend is introduced.
export const apiClient = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: apiConfig.timeoutMs,
  headers: {
    "Content-Type": "application/json",
  },
});

function isApiResponse<TData>(
  payload: ApiResponse<TData> | TData,
): payload is ApiResponse<TData> {
  return typeof payload === "object" && payload !== null && "data" in payload;
}

export function unwrapApiResponse<TData>(
  payload: ApiResponse<TData> | TData,
): TData {
  return isApiResponse(payload) ? payload.data : payload;
}

export function getApiFallbackMessage(
  error: unknown,
  fallbackMessage: string,
) {
  if (axios.isAxiosError(error)) {
    const responseMessage =
      typeof error.response?.data === "object" &&
      error.response?.data !== null &&
      "error" in error.response.data &&
      typeof error.response.data.error === "object" &&
      error.response.data.error !== null &&
      "message" in error.response.data.error &&
      typeof error.response.data.error.message === "string"
        ? error.response.data.error.message
        : undefined;

    return responseMessage ?? error.message ?? fallbackMessage;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
}
