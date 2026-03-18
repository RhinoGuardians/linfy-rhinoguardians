export interface ApiMeta {
  requestId?: string;
  timestamp?: string;
}

export type DataSource = "api" | "mock";

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiResponse<TData> {
  data: TData;
  meta?: ApiMeta;
  error?: ApiError;
}

export interface PaginatedResponse<TItem> {
  items: TItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface DataRequestResult<TData> {
  data: TData;
  source: DataSource;
  message?: string;
  updatedAt: string;
}
