import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

export class HttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL });
  }

  async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    const config: AxiosRequestConfig = headers ? { headers } : {};
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    const config: AxiosRequestConfig = headers ? { headers } : {};
    const response: AxiosResponse<T> = await this.client.post(
      url,
      data,
      config
    );
    return response.data;
  }

  async put<T>(
    url: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    const config: AxiosRequestConfig = headers ? { headers } : {};
    const response: AxiosResponse<T> = await this.client.request({
      method: "PUT",
      url,
      data,
      ...config,
    });
    return response.data;
  }

  async delete<T>(url: string, headers?: Record<string, string>): Promise<T> {
    const config: AxiosRequestConfig = headers ? { headers } : {};
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }
}
