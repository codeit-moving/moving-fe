import axiosInstance from "./axios";

const PATH = "/customers";

export const editCustomerProfile = async (formData: FormData) => {
  const response = await axiosInstance.patch(`${PATH}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
