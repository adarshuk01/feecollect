// src/context/AdminContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// ✅ Create Context
const AdminContext = createContext();

// ✅ Provider Component
export const AdminProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [categories, setCategories] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
   const [client, setClient] = useState(null);
   const [error,setError]=useState('')

  // ---------------- Fetch Categories ----------------
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:8000/feezy/category/", {
        headers: { Authorization: `Token ${token}` },
      });
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error.response?.data || error);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Add Category ----------------
  const addCategory = async (newCategory) => {
    try {
      if (!newCategory.trim()) {
        toast.error("Category name is required!");
        return;
      }
      const res = await axios.post(
        "http://127.0.0.1:8000/feezy/category/",
        { name: newCategory },
        { headers: { Authorization: `Token ${token}` } }
      );
      setCategories((prev) => [...prev, res.data]);
      toast.success("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error.response?.data || error);
      toast.error("Failed to add category!");
    }
  };

  // ---------------- Fetch Clients ----------------
  const fetchClients = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/feezy/user/", {
        headers: { Authorization: `Token ${token}` },
      });
      const data = Array.isArray(res.data) ? res.data : [res.data];
      const formatted = data.map((item, index) => ({
        id: index + 1,
        name: item.business_name || "N/A",
        email: item.email,
        joinDate: item.subscription_start,
        endDate: item.subscription_end,
        isActive: item.is_active,
      }));
      setClients(formatted);
    } catch (error) {
      console.error("Error fetching clients:", error.response?.data || error);
    }
  };

  // ---------------- Add Client ----------------
  const addClient = async (payload) => {
    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/feezy/user/", payload, {
        headers: { Authorization: `Token ${token}` },
      });
      setClients((prev) => [...prev, res.data]);
        fetchClients()
      toast.success("Client Created!");
    } catch (error) {
      console.error("Error creating client:", error.response?.data || error);
      toast.error("Failed to register client!");
    } finally {
      setLoading(false);
    }
  };

  const updateClient = async (id, payload) => {
  try {
    setLoading(true);
    const res = await axios.put(`http://127.0.0.1:8000/feezy/client/${id}/`, payload, {
      headers: { Authorization: `Token ${token}` },
    });
    fetchClients()

    // Update the local clients state
    setClients((prev) =>
      prev.map((client) => (client.id === id ? res.data : client))
    );

    toast.success("Client Updated Successfully!");
    return res.data;
  } catch (error) {
    console.error("Error updating client:", error.response?.data || error);
    toast.error("Failed to update client!");
  } finally {
    setLoading(false);
  }
};


   // ---------------- Fetch Single Client ----------------
  const fetchClient = async (id) => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`http://127.0.0.1:8000/feezy/client/${id}/`,{
      headers: { Authorization: `Token ${token}` },
    });
    console.log(response);
    
      setClient(response.data);
    } catch (err) {
      console.error("Error fetching client:", err);
      setError("Failed to load client details");
      toast.error("Failed to load client details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCategories();
      fetchClients();
      
    }
  }, [token]);

  return (
    <AdminContext.Provider
      value={{
        token,
        categories,
        clients,
        client,
        error,
        fetchClients,
         fetchClient,
        fetchCategories,
        addCategory,
        addClient,
        updateClient,
        loading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

// ✅ Custom Hook for easy access
export const useAdmin = () => useContext(AdminContext);
