export interface ResponsesApi<T> {
  statusCode: number;
  message?: string;
  data?: T;
}
