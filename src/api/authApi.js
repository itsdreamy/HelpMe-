// src/controllers/LoginController.js

import axios from "axios";
import { API_URL } from "./api";
const AUTH_API = API_URL + "/auth";

export const login = async (username, password) => {
  try {
    const response = await axios.post(AUTH_API + "/login?app_type=admin", {
      username: username,
      password: password,
    });

    // Jika login berhasil, misal response ada token
    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // Simpan token ke localStorage
      // console.log(response);
      return response.data;
    }

    return null; // Jika tidak ada token, login gagal
  } catch (error) {
    console.error("Login failed:", error.response.data);
    return error;
  }
};

export const aboutMe = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    // console.error("No token found");
    return null;
  }

  try {
    const response = await axios.get(AUTH_API + "/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response);
    return response.data;
  } catch (e) {
    console.error("Error fetching about me:", e);
    return e;
  }
};

export const logout = async () => {
  const token = localStorage.getItem("token"); // Ambil token dari localStorage

  if (!token) {
    // console.error("No token found");
    return null;
  }

  try {
    const response = await axios.post(
      AUTH_API + "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Kirim token di header Authorization
        },
      }
    );

    // Jika logout berhasil, hapus token dari localStorage
    localStorage.removeItem("token");
    // console.log("Logout successful", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
    return error;
  }
};

// export const changePassword = async () => {

// }

export const forgotPassword = async (phone_number) => {
  try {
    const response = await axios.post(AUTH_API + "/forgot-password", {
      phone_number: phone_number,
    });
    // console.log('Reset password response:', response);
    return response;
  } catch (err) {
    // console.error('Error during reset password:', err);
    return null;
  }
};

export const resetPassword = async (
  token,
  phone_number,
  password,
  confirmPassword
) => {
  try {
    const response = await axios.post(AUTH_API + "/reset-password", {
      token: token,
      phone_number: phone_number,
      password: password,
      password_confirmation: confirmPassword,
    });
    // console.log("Reset password response:", response);
    return response;
  } catch (err) {
    // console.error('Error during reset password:', err.response.data.errors);
    return err;
  }
};
