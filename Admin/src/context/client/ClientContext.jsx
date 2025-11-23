import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [client, setClient] = useState(
    JSON.parse(sessionStorage.getItem("client")) || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔐 Login function
  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://127.0.0.1:8000/feezy/token/", {
        username,
        password,
      });

      // Example response: { access: "token", refresh: "token" }
      const clientData = response.data;
      setClient(clientData);
      sessionStorage.setItem("client", JSON.stringify(clientData));

      return clientData;
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 🚪 Logout
  const logout = () => {
    setClient(null);
    sessionStorage.removeItem("client");
  };

  return (
    <ClientContext.Provider
      value={{
        client,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!client,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

// 🔄 Hook for easy access
export const useClient = () => useContext(ClientContext);
