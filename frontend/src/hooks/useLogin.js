import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import api from "../lib/axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await api.post("/user/login", { email, password });
      const data = res.data;

      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });

      return data;
    } catch (err) {
      if (err.response) {
        setError(`${err.response.data?.error}${err.response.data?.remainingAttempts}` || "Signup failed");
      } else {
        setError("Could not reach the server");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};
