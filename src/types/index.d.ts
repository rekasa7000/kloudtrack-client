type SuccessResponse<T> = {
  success: true;
  data: T;
  message?: string;
};

type ErrorResponse = {
  success: false;
  error: string;
  message?: string;
};

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
