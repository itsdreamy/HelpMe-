import { tokens } from "../theme";
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

export const mockDataSerabutan = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    // console.error("No token found");
    return [];
  }
  try {
    const response = await axios.get(
      API_URL + "/categories/problems?category=serabutan",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return err;
  }
};

export const mockDataKendaraan = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    // console.error("No token found");
    return [];
  }
  try {
    const response = await axios.get(
      API_URL + "/categories/problems?category=kendaraan",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return err;
  }
};

export const mockDataRumah = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    // console.error("No token found");
    return [];
  }
  try {
    const response = await axios.get(
      API_URL + "/categories/problems?category=rumah",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return err;
  }
};

export const mockDataElektronik = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    // console.error("No token found");
    return [];
  }
  try {
    const response = await axios.get(
      API_URL + "/categories/problems?category=elektronik",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return err;
  }
};

export const mockDataPersonal = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    // console.error("No token found");
    return [];
  }
  try {
    const response = await axios.get(
      API_URL + "/categories/problems?category=personal",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return err;
  }
};


export const listCategory = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    // console.error("No token found");
    return [];
  }

  try {
    const response = await axios.get(API_URL + "/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response);
    return response.data;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return err;
  }
};

export const fetchClientAndMitraStats = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    // console.error("No token found");
    return null;
  }

  try {
    const response = await axios.post(API_URL + "/users?stats=client-mitra", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log('USER' + response);
    return response.data;
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
    console.log({'USER': response.data});
    return response;
  } catch (error) {
    console.error("Error fetching user stats:", error);
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
