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
    return response; // Return the entire response object
  } catch (err) {
    console.error("Error fetching data from API:", err);
    throw err; // Throw the error instead of returning it
  }
};

export const verifyMitra = async (mitraId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const response = await axios.put(
      API_URL + `/mitras/${mitraId}/status`,
      {}, // Empty body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error verifying mitra:", error);
    throw error;
  }
};