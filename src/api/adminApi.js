import axios from "axios";
import { API_URL } from "./api";

export const toggleStatusUser = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found. Cannot toggle user status.");
    return null;
  }

  try {
    const response = await axios.post(
      `${API_URL}/users/status/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error toggling user status:", error);
    throw error;
  }
};
