import { withApiLoading } from "@/utils/helpers";
import axios, { AxiosResponse } from "axios";

export const removeBackgroundAsync = (formData: FormData): Promise<AxiosResponse<any, any>> =>
    withApiLoading('remove-background', () =>
        axios.post('https://lionfish-real-lab.ngrok-free.app/remove-bg', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            responseType: 'blob',
        }));