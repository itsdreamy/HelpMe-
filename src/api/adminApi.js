import axios from "axios";
import { API_URL } from "./api";

export const addAdmin = async (
  full_name,
  username,
  phone_number,
  password,
  password_confirmation
) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const response = await axios.post(
      API_URL + "/admins",
      {
        full_name: full_name,
        username: username,
        phone_number: phone_number,
        password: password,
        password_confirmation: password_confirmation,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding admin:", error);
    return error;
  }
};

export const deleteAdmin = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const response = await axios.delete(API_URL + "/admins", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting admin:", error);
    return error;
  }
};

export const changeStatusUser = async (userId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const response = await axios.put(API_URL + `/users/status/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error changing status user:", error);
    return error;
  }
};

export const listUsersByRole = async (role) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const response = await axios.get(API_URL + `/users?role=${role}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error listing users by role:", error);
    return error;
  }
};

export const listUsersByStatus = async (status) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const response = await axios.get(API_URL + `/users?status=${status}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error listing users by status:", error);
    return error;
  }
};

export const statsBetweenClientAndMitra = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const response = await axios.get(API_URL + `/users/stats?client-mitra`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching stats between mitra and client:", error);
    return error;
  }
};

export const statsUserByGranularity = async (
  granularity,
  year = null,
  startYear = null,
  endYear = null
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return null;
  }

  const body = { granularity };

  if (granularity === "monthly" && year) {
    body.year = year;
  } else if (granularity === "yearly" && startYear && endYear) {
    body.start_year = startYear;
    body.end_year = endYear;
  }

  try {
    const response = await axios.get(
      API_URL + `/users/stats?granularity`,
      {
        body,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching stats user by granularity:", error);
    return error;
  }
};

export const statsOrderByGranularity = async (
  granularity,
  date,
  startDate,
  endDate,
  year,
  startYear,
  endYear
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return null;
  }

  const body = {};

  if (granularity === "hourly") {
    body.date = date;
  } else if (granularity === "daily") {
    body.start_date = startDate;
    body.end_date = endDate;
  } else if (granularity === "monthly") {
    body.year = year;
  } else if (granularity === "yearly") {
    body.start_year = startYear;
    body.end_year = endYear;
  }

  try {
    const response = await axios.post(
      API_URL + `/orders?stats=${granularity}`,
      body,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching order stats:", error);
    return null;
  }
};