import axios from "axios";
import { API_URL } from "./api";
import { useState } from "react";

export const useStoreCategory = () => {
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    // Store a category
    const storeCategory = async (name) => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.log("No token found");
            return null;
        }

        try {
            const fetchApi = await axios.post(
                `${API_URL}/categories`,
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    } 
                }
            );
            console.log("API Response: ", fetchApi.data); // Log response
            setAlert({
                open: true,
                message: "Category stored successfully!",
                severity: "success",
            });
            return fetchApi.data;
        } catch (error) {
            console.error(
                "Error storing category:",
                error.response?.data || error.message
            ); // Log error
            setAlert({
                open: true,
                message: "Error storing category!",
                severity: "error",
            });
            return null;
        }
    };

    // Delete a category
    const deleteCategory = async (category_id) => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.log("No token found");
            return null;
        }

        try {
            await axios.delete(`${API_URL}/categories/${category_id}`, { // Fixed variable name
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setAlert({
                open: true,
                message: "Category deleted successfully!",
                severity: "success",
            });
            return true;
        } catch (error) {
            console.error(
                "Error deleting category:",
                error.response?.data || error.message
            ); // Log error
            setAlert({
                open: true,
                message: "Error deleting category!",
                severity: "error",
            });
            return false;
        }
    };

    return { storeCategory, deleteCategory, alert }; // Return correct function names
};
