import { AxiosResponse } from 'axios';

export type ResponseType<T = void> = T extends void
  ? {
      status: number;
      message: string;
    }
  : {
      status: number;
      message: string;
      metadata: T;
    };

export type AxiosResponseType<T = void> = AxiosResponse<ResponseType<T>>;
export type AxiosResponseBlob = AxiosResponse<BlobPart>;
