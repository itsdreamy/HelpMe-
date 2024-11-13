import axios from "axios";
import { API_URL } from "./api";

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL + "/auth/login?app_type=admin", {
      username,
      password,
    });
    // console.log(response.data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (err) {
    console.error("Error logging in:", err);
    return err;
  }
};

export const aboutMe = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const response = await axios.get(API_URL + "/auth/me", {
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

export const changePassword = async (
  oldPassword,
  newPassword,
  confirmNewPassword
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const response = await axios.post(
      API_URL + "/auth/change-password",
      {
        current_password: oldPassword,
        new_password: newPassword,
        new_password_confirmation: confirmNewPassword,
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
    console.error("Error changing password:", err);
    return err;
  }
};

export const logout = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const response = await axios.post(
      API_URL + "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    localStorage.removeItem("token");
    return response.data;
  } catch (err) {
    console.error("Error logging out:", err);
    return err;
  }
};

export const editProfile = async (fullName, username, phoneNumber) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const response = await axios.put(
      API_URL + "/users/profile",
      {
        full_name: fullName,
        username: username,
        phone_number: phoneNumber,
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
    console.error("Error editing profile:", err);
    return err;
  }
};

export const forgotPassword = async (phoneNumber) => {
  try {
    const response = await axios.post(API_URL + "/auth/forgot-password", {
      phone_number: phoneNumber,
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error sending forgot password:", err);
    return err;
  }
};

export const resetPassword = async (
  phoneNumber,
  token,
  password,
  confirmPassword
) => {
  try {
    const response = await axios.post(API_URL + "/auth/reset-password", {
      phone_number: phoneNumber,
      token: token,
      password: password,
      password_confirmation: confirmPassword,
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error resetting password:", err);
    return err;
  }
};
