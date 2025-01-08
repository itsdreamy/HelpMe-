import axios from "axios";
import { API_URL } from "./api";

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
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return [];
  }
};

export const storeCategory = async (name) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.post(
    `${API_URL}/categories`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const deleteCategory = async (categoryId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found");
    return null;
  }

  try {
    const response = await axios.delete(`${API_URL}/categories/${categoryId}`, {
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

export const listHelpers = async (categoryName) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found");
    return null;
  }

  try {
    const response = await axios.get(
      `${API_URL}/categories/helpers?category=${categoryName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return err;
  }
};

export const storeHelper = async (categoryName, name, category_id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found");
    return null;
  }

  try {
    const response = await axios.post(
      `${API_URL}/categories/helpers?category=${categoryName}`,
      {
        category_id,
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return err;
  }
};


export const deleteHelper = async (helperId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found");
    return null;
  }

  try {
    const response = await axios.delete(
      `${API_URL}/categories/helpers/${helperId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return err;
  }
};

export const listProblems = async (categoryName) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found");
    return null;
  }

  try {
    const response = await axios.get(
      `${API_URL}/categories/problems?category=${categoryName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Return just the response data instead of wrapping it
    return response.data;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    throw err; // Throw the error instead of returning it
  }
};

export const storeProblem = async (name, helperId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found");
    return null;
  }

  try {
    const response = await axios.post(
      `${API_URL}/categories/problems`,
      {
        name,
        helper_id: helperId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return err;
  }
};

export const deleteProblem = async (problemId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found");
    return null;
  }

  try {
    const response = await axios.delete(
      `${API_URL}/categories/problems/${problemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return err;
  }
};
