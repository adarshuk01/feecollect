import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  User,
  Mail,
  MapPin,
  Phone,
  CreditCard,
  Calendar,
  CheckCircle,
  XCircle,
  Wallet,
  Building2,
  Edit,
  RefreshCcw,
} from "lucide-react";

function ClientProfilePage() {
  const { id } = useParams(); // ✅ Get client ID from URL
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token] = useState(localStorage.getItem("token"));

  // ✅ Fetch user details by ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/feezy/client/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching client data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading client details...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Failed to load client data.
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-6">
      {/* Header Section */}
      <div className="bg-primary text-white px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Building2 size={24} /> {user.business_name}
          </h2>
          <p className="text-sm text-blue-100 mt-1">{user.address}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 sm:mt-0">
          {/* Status Badge */}
          <div
            className={`flex w-fit items-center gap-2 text-sm px-4 py-2 rounded-full ${
              user.is_active ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {user.is_active ? (
              <>
                <CheckCircle size={18} /> <span>Active</span>
              </>
            ) : (
              <>
                <XCircle size={18} /> <span>Inactive</span>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/admin/client/edit/${id}`)}
              className="flex items-center gap-2 bg-blue-900 hover:bg-gray-400 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
            >
              <Edit size={16} /> Edit
            </button>

            <button
             
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
            >
              <RefreshCcw size={16} /> Renewal
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-6">
        {/* User Info */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <User className="text-primary mt-1" />
            <div>
              <p className="text-gray-500 text-sm">Username</p>
              <p className="font-semibold text-gray-800">{user.username}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="text-primary mt-1" />
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-semibold text-gray-800">{user.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="text-primary mt-1" />
            <div>
              <p className="text-gray-500 text-sm">Contact Number</p>
              <p className="font-semibold text-gray-800">
                +{user.contact_number}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="text-primary mt-1" />
            <div>
              <p className="text-gray-500 text-sm">Address</p>
              <p className="font-semibold text-gray-800">{user.address}</p>
            </div>
          </div>
        </div>

        {/* Subscription Info */}
        <div className="pt-4">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            Subscription Details
          </h3>
          <hr className="text-gray-200 my-2" />

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <CreditCard className="text-primary mt-1" />
              <div>
                <p className="text-gray-500 text-sm">Payment Method</p>
                <p className="font-semibold text-gray-800">
                  {user.payment_method}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Wallet className="text-primary mt-1" />
              <div>
                <p className="text-gray-500 text-sm">Subscription Amount</p>
                <p className="font-semibold text-gray-800">
                  {user.currency_emoji} {user.subscription_amount}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="text-primary mt-1" />
              <div>
                <p className="text-gray-500 text-sm">Subscription Start</p>
                <p className="font-semibold text-gray-800">
                  {user.subscription_start}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="text-primary mt-1" />
              <div>
                <p className="text-gray-500 text-sm">Subscription End</p>
                <p className="font-semibold text-gray-800">
                  {user.subscription_end}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientProfilePage;
