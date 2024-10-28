import axios from "axios";
import { API_URL } from "./api";
import { useState } from "react";

// Custom hook for storing and deleting a problem
export const useStoreProblem = () => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Store a problem
  // Store a problem
  const storeProblem = async (name, helper_id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found");
      return null;
    }

    try {
      const fetchApi = await axios.post(
        `${API_URL}/categories/problems`,
        {
            name: name,
            helper_id: helper_id
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            } 
        }
      );

      console.log("API Response: ", fetchApi.data); // Log response
      setAlert({
        open: true,
        message: "Problem stored successfully!",
        severity: "success",
      });
      return fetchApi.data;
    } catch (error) {
      console.error(
        "Error storing problem:",
        error.response?.data || error.message
      ); // Log error
      setAlert({
        open: true,
        message: "Error storing problem!",
        severity: "error",
      });
      return null;
    }
  };

  // Delete a problem
  const deleteProblem = async (problem_id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found");
      return null;
    }

    try {
      await axios.delete(`${API_URL}/categories/problems/${problem_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAlert({
        open: true,
        message: "Problem deleted successfully!",
        severity: "success",
      });
      return true;
    } catch (error) {
      setAlert({
        open: true,
        message: "Error deleting problem!",
        severity: "error",
      });
      return false;
    }
  };

  return { storeProblem, deleteProblem };
};
