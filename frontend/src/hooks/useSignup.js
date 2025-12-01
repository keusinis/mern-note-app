import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import api from "../lib/axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await api.post("/user/signup", { email, password });
      const data = res.data;

      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });

      return data;
    } catch (err) {
      if (err.response.status === 429 || err.response.data?.remainingAttempts === 0) {
        setError(`Too many attempts, try again later`);
      } else if (err.response) {
        setError(
          `${err.response.data?.error}`
        );
      } else {
        setError("Could not reach the server");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, error, isLoading };
};
