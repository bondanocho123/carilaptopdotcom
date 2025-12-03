import axiosInstance from "./axiosInstance";

export const LaptopApi = {
    get_rekomendasi: async (budget, kebutuhan, urgensi) => {
        const { data } = await axiosInstance.get(`laptop/rekomendasi/?budget=${budget}&kebutuhan=${kebutuhan}&urgensi=${urgensi}`);
        return data;
    },
};
