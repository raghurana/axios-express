import axios, { AxiosInstance, AxiosResponse } from "axios";

export class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string = "http://localhost:3000") {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async get<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url);
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.client.request({
      method: "PUT",
      url,
      data,
    });
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url);
    return response.data;
  }
}

// Example usage
const client = new ApiClient();

const example = async () => {
  try {
    const data = await client.get("/api/health");
    console.log("Health check response:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};

example();
