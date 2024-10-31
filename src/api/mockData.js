import axios from "axios";
import { API_URL } from "./api";

export const mockDataMitra = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    // console.error("No token found");
    return [];
  }

  try {
    const response = await axios.get(API_URL + "/mitras", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response);
    return response;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return [];
  }
};



export const mockDataUsers = async (role) => {
  const token = localStorage.getItem("token");
  if (!token) {
    // console.error("No token found");
    return [];
  }
  try {
    const response = await axios.post(API_URL + "/users?role=" + role, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response);
    return response;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return [];
  }
};

export const mockDataCategory = async (categoryName) => {
  const token = localStorage.getItem("token");
  if (!token) {
    // console.error("No token found");
    return [];
  }
  try {
    const response = await axios.get(
      API_URL + "/categories/problems?category=" + categoryName,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.data);
    return response;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return err;
  }
};

export const listCategory = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return [];
  }

  try {
    const response = await axios.get(API_URL + "/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log( response.data.data);
    return response.data.data;
  } catch (err) {
    console.error("Error fetching data from API:", err.response ? err.response.data : err);
    return [];
  }
};

export const fetchClientAndMitraStats = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
     //console.error("No token found");
    return null;
  }

  try {
    const response = await axios.post(API_URL + "/users?stats=client-mitra", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
     console.log({"response.data": response.data});
    return response;
  } catch (error) {
    console.error("Error fetching client and mitra stats:", error);
    return error;
  }
};

export const fetchUserStatsByGranularity = async (granularity, year = null, startYear = null, endYear = null) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const body = { granularity };
    
    // Append appropriate data based on granularity
    if (granularity === "monthly" && year) {
      body.year = year;
    } else if (granularity === "yearly" && startYear && endYear) {
      body.start_year = startYear;
      body.end_year = endYear;
    }

    const response = await axios.post(
      API_URL + "/users?stats=granularity",
      body,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    // console.log({'USER': response.data});
    return response;
  } catch (error) {
    // console.error("Error fetching user stats:", error);
    return null;
  }
};

export const orderStats = async (status = null, stats, date = null, start_date = null, end_date = null, year = null, start_year = null, end_year = null) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // console.error("No token found");
    return null;
  }

  try {
    let query = '';

    if (stats === 'hourly') {
      query = `?stats=hourly&date=${date}`;
    } else if (stats === 'daily') {
      query = `?stats=daily&start_date=${start_date}&end_date=${end_date}`;
    } else if (stats === 'monthly') {
      query = `?stats=monthly&year=${year}`;
    } else if (stats === 'yearly') {
      query = `?stats=yearly&start_year=${start_year}&end_year=${end_year}`;
    }

    // Menambahkan status jika ada
    if (status !== null) {
      query += `&status=${status}`;
    }

    const response = await axios.get(API_URL + "/users/orders" + query, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching order stats:", error);
    return error;
  }
}

export const mockDataHelpers = async (category) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No Token Found")
  }

  try {
    const response = await axios.get(API_URL + "/categories/helpers?category=" + category, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return err;
  }
};