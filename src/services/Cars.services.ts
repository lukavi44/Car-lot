import { AxiosResponse } from "axios";
import axiosInstance, { baseUrl } from "./axiosCongfic.services";
import { Car } from "../models/Car.model";

interface Response {
  status: boolean;
  errors: string;
  data: string;
  total: number;
}

export const getCars = async (): Promise<AxiosResponse<Response>> => {
  return axiosInstance.post<Response>(`${baseUrl}car/list`);
};

export const removeCar = async (carId: string): Promise<AxiosResponse> => {
  return axiosInstance.post(`${baseUrl}car/delete`, { data: { id: carId } });
};

export const postCar = async (body: Car): Promise<AxiosResponse<Car>> => {
  return axiosInstance.post<Car>(`${baseUrl}car/create`, { data: body });
};

export const getOneCar = async (carId: string): Promise<AxiosResponse<any>> => {
  return axiosInstance.post(`${baseUrl}car/read`, { data: { id: carId } });
};
