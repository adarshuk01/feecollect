import React, { useState } from "react";
import {
    CheckCircle,
    XCircle,
    Clock,
    Layers,
    RefreshCw,
} from "lucide-react";
import SelectInput from "../../components/common/SelectInput";
import TextInput from "../../components/common/TextInput";

function PaymentPage() {
    const feeTypesList = [
        "Tuition Fee",
        "Admission Fee",
        "Book Fee",
        "Transport Fee",
        "Uniform Fee",
        "Management Fee",
        "Other Fee",
    ];

    const [selectedFees, setSelectedFees] = useState([]);

    const toggleFee = (fee) => {
        setSelectedFees((prev) =>
            prev.includes(fee)
                ? prev.filter((f) => f !== fee)
                : [...prev, fee]
        );
    };

    const [payment, setPayment] = useState({
        id: "TXN6001",
        date: "2025-06-30",
        amount: "₹899",
        status: "pending",
        method: "upi",
    });

    const [subscription, setSubscription] = useState({
        planName: "Premium Monthly Plan",
        duration: "30 Days",
        nextRenewal: "2025-07-30",
    });

    const [form, setForm] = useState({
        date: payment.date,
        amount: payment.amount.replace("₹", ""),
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedFees.length === 0) {
            alert("Please select at least one fee type!");
            return;
        }

        alert(`
Payment Done!
Selected Fees: ${selectedFees.join(", ")}
Date: ${form.date}
Amount: ₹${form.amount}
        `);
    };

    const statusStyles = {
        success: "text-green-600 bg-green-100",
        failed: "text-red-600 bg-red-100",
        pending: "text-yellow-600 bg-yellow-100",
    };

    const statusIcons = {
        success: <CheckCircle className="w-5 h-5" />,
        failed: <XCircle className="w-5 h-5" />,
        pending: <Clock className="w-5 h-5" />,
    };

    return (
        <div className="w-full max-w-lg bg-white shadow-md rounded-2xl p-4 h-fit mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Payment Details</h2>
                <span
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                        statusStyles[payment.status] || "text-gray-600 bg-gray-100"
                    }`}
                >
                    {statusIcons[payment.status]}
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </span>
            </div>

            {/* Subscription Details */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-500" />
                    Subscription Details
                </h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Plan Name</span>
                        <span className="font-medium text-gray-800">{subscription.planName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-medium text-gray-800">{subscription.duration}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 flex items-center gap-1">
                            <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
                            Next Renewal
                        </span>
                        <span className="font-medium text-gray-800">{subscription.nextRenewal}</span>
                    </div>
                </div>
            </div>

            {/* Editable Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Fee Type Selection */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Select Fee Types
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                        {feeTypesList.map((fee) => (
                            <label key={fee} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    checked={selectedFees.includes(fee)}
                                    onChange={() => toggleFee(fee)}
                                />
                                <span className="text-gray-700 text-sm">{fee}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <SelectInput
                    label="Select Payment Method"
                    icon={"FaUserFriends"}
                    options={[
                        { label: "Cash", value: "cash" },
                        { label: "UPI", value: "upi" },
                        { label: "Card", value: "card" },
                    ]}
                />

                <TextInput
                    label="Amount"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 px-6 bg-primary text-white font-semibold rounded-lg"
                >
                    MAKE PAYMENT
                </button>
            </form>
        </div>
    );
}

export default PaymentPage;
