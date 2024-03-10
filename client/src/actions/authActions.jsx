import axios from "axios";

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3001/api/auth/register", userData);
    dispatch({ type: "REGISTER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "REGISTER_FAILURE", payload: error.response.data });
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3001/api/auth/login", userData);
    if (response.status === 200 && response.data && response.data.token) {
      const { token, userId } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      dispatch({ type: "LOGIN_SUCCESS", payload: { token, userId } });
      console.log("User ID:", userId);
    } else {
      console.error("Login failed: Unexpected response format");
      dispatch({ type: "LOGIN_FAILURE", payload: "Unexpected response format" });
    }
  } catch (error) {
    console.error("Login failed:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.error;
      dispatch({
        type: "LOGIN_FAILURE",
        payload: errorMessage === "User not found"
          ? { email: "User not found" }
          : { password: "Invalid password" }
      });
    }
  }
};

