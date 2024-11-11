import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    CreateAxiosDefaults,
    InternalAxiosRequestConfig,
} from "axios";
import _omitBy from "lodash/omitBy";
import { trackPromise } from "react-promise-tracker";

import axiosConfig from "@/utils/api.config";
import HttpStatusCode from "@/utils/httpStatusCode";

export default class HttpService {
    private instance: AxiosInstance;

    constructor(config?: CreateAxiosDefaults, prefix?: string) {
        const instance = axios.create({ ...axiosConfig, ...config });
        Object.assign(instance, this.setupInterceptorsTo(instance));
        this.instance = instance;
    }

    private onRequest = async (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config: any
    ): Promise<InternalAxiosRequestConfig> => {
        return config;
    };

    private onRequestError = (error: AxiosError): Promise<AxiosError> => {
        console.error(`[request error] [${JSON.stringify(error)}]`);
        return Promise.reject(error);
    };

    private onResponse = (response: AxiosResponse) => response.data;

    private onResponseError = (error: AxiosError): Promise<AxiosError> => {
        let result = {};
        const status = error.response?.status;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errorMessage = (error?.toJSON() as any)?.message || "Error";

        switch (status) {
            case HttpStatusCode.UNAUTHORIZED:
                break;
            case HttpStatusCode.BAD_REQUEST:
            case HttpStatusCode.INTERNAL_SERVER_ERROR:
            case HttpStatusCode.SERVICE_UNAVAILABLE:
            case HttpStatusCode.FORBIDDEN:
            case HttpStatusCode.NOT_FOUND:
            default:
                result = {
                    errorMessage: error.message,
                };
                break;
        }
        return Promise.reject(error);
    };

    private setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
        axiosInstance.interceptors.request.use(
            this.onRequest,
            this.onRequestError
        );
        axiosInstance.interceptors.response.use(
            this.onResponse,
            this.onResponseError
        );

        return axiosInstance;
    }

    private _trackPromise<
        T,
        Fn extends (...agrs: Parameters<Fn>) => Promise<T>
    >(asyncFn: Fn, ...args: Parameters<Fn>) {
        return trackPromise(asyncFn(...args));
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this._trackPromise(this.instance.get, url, config);
    }

    public async post<T>(
        url: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this._trackPromise(this.instance.post, url, data, config);
    }

    public async patch<T>(
        url: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this._trackPromise(this.instance.patch, url, data, config);
    }

    public async delete<T>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this._trackPromise(this.instance.delete, url, config);
    }

    public setHttpConfigs(config?: Partial<AxiosRequestConfig>) {
        if (config?.baseURL) {
            this.instance.defaults.baseURL = config.baseURL;
        }

        this.instance.defaults = {
            ...this.instance.defaults,
            ..._omitBy(config, "BaseURL"),
        };
    }
}
