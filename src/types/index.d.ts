interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

interface ErrorResponse {
  success: false;
  error: string;
  message?: string;
}

interface Pagination {
  total: number;
  page: number | undefined;
  limit: number | undefined;
  pages: number;
}
