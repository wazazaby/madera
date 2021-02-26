export interface ResponsesApi<T> {
  statusCode: number;
  messages?: string;
  data?: T;
}
