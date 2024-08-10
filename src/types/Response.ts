export type Response<TData = null> = {
  success: boolean;
  message: string;
  data: TData
};
