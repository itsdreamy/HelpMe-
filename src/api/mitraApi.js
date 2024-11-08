import axios from "axios";
import { API_URL } from "./api";

export const listMitras = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const response = await axios.get(API_URL + "/mitras", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return err;
  }
};

export const verifyMitra = async (mitraId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const response = await axios.put(API_URL + `/mitras/${mitraId}/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error verifying mitra:", error);
    return error;
  }
};
