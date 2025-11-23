import React, { useState } from "react";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { ChevronLeft, Plus } from "lucide-react";
import SubscriptionForm from "../../components/Client/SubscriptionForm";
import Button from "../../components/common/Button";

function Subscription() {
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, subscriptionName: "Monthly Plan", tuitionFee: 2000 },
    { id: 2, subscriptionName: "Quarterly Plan", tuitionFee: 5000 },
  ]);

  const [viewMode, setViewMode] = useState("list"); // 'list' | 'add' | 'edit'
  const [editData, setEditData] = useState(null);

  const handleAdd = () => {
    setEditData(null);
    setViewMode("add");
  };

  const handleEdit = (subscription) => {
    setEditData(subscription);
    setViewMode("edit");
  };

  const handleSave = (formData) => {
    if (viewMode === "edit") {
      setSubscriptions((prev) =>
        prev.map((s) => (s.id === editData.id ? { ...formData, id: s.id } : s))
      );
    } else if (viewMode === "add") {
      setSubscriptions((prev) => [
        ...prev,
        { ...formData, id: prev.length + 1 },
      ]);
    }
    setViewMode("list");
    setEditData(null);
  };

  const handleCancel = () => {
    setViewMode("list");
    setEditData(null);
  };

  const handleDelete = (id) => {
    setSubscriptions(subscriptions.filter((s) => s.id !== id));
  };

  return (
    <div className="p- rounded">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {viewMode === "list" ? (
          <>
            <div>
              <h1 className="lg:text-3xl text-2xl font-bold text-gray-900">Subscription</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage your subscriptions.
          </p>
            </div>
            <Button icon={Plus} onClick={handleAdd} text="Add" />
          </>
        ) : (
          <div className="flex items-center gap-3">
            {/* Back Button */}
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
            >
              <ChevronLeft />
              
            </button>
            <h2 className="text-xl font-bold text-gray-800">
              {viewMode === "add" ? "Add Subscription" : "Edit Subscription"}
            </h2>
          </div>
        )}
      </div>
      

      {/* Form View */}
      {viewMode !== "list" && (
        <div className="  rounded-lg p-3 bg-white  ">
          <SubscriptionForm
            initialData={editData}
            onSave={handleSave}
            onCancel={handleCancel}
            mode={viewMode}
          />
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-primary">{sub.subscriptionName}</h3>
              <p className="text-gray-600 mt-1">
                Tuition Fee: ₹{sub.tuitionFee}
              </p>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => handleEdit(sub)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(sub.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Subscription;
