import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import usersData from "../../data/userData";
import { User, Mail, Phone, Calendar, MapPin, CreditCard, DollarSign, AlertCircle, Pencil, Settings, Bell } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Tabs from "../../components/common/Tabs";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import { FiBell } from "react-icons/fi";
import ToggleSwitch from "../../components/common/Switch";

function Details({ user }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-gray-700">
            <div className="space-y-2">
                <p><span className="font-semibold">Full Name:</span> {user.name}</p>
                <p><span className="font-semibold">Email:</span> {user.email}</p>
                <p><span className="font-semibold">Phone:</span> {user.phone}</p>
                <p><span className="font-semibold">Date of Birth:</span> {user.dob}</p>
            </div>
            <div className="space-y-2">
                <p><span className="font-semibold">Place:</span> {user.place}</p>
                <p><span className="font-semibold">Subscription Plan:</span> {user.plan}</p>
                <p>
                    <span className="font-semibold">Payment Status:</span>{" "}
                    <span
                        className={`${user.payment === "paid"
                            ? "text-green-600"
                            : user.payment === "pending"
                                ? "text-yellow-600"
                                : "text-blue-600"
                            } font-medium`}
                    >
                        {user.payment.charAt(0).toUpperCase() + user.payment.slice(1)}
                    </span>
                </p>
                <p>
                    <span className="font-semibold">Account Status:</span>{" "}
                    <span
                        className={`${user.status === "active"
                            ? "text-green-600"
                            : user.status === "inactive"
                                ? "text-gray-600"
                                : "text-red-600"
                            } font-medium`}
                    >
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                </p>
            </div>
        </div>
    );
}

function Transaction({ user }) {
    const { transactions = [] } = user;
    const [activeTab, setActiveTab] = useState("Pending");

    const tabs = ["Partially Paid", "Paid", "Pending"];

    return (
        <div className="mt-">
            <div className="relative grid grid-cols-3 bg-gray-100 rounded-t-xl p-1 lg:w-fit">
                {/* Sliding indicator */}
                <div
                    className="absolute top-1 bottom-1 bg-primary text-white rounded-lg shadow-sm transition-all duration-300 ease-in-out"
                    style={{
                        width: `${100 / tabs.length}%`,
                        transform: `translateX(${tabs.indexOf(activeTab) * 100}%)`,
                    }}
                ></div>

                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative z-10 flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200  ${activeTab === tab ? "text-white" : "text-gray-500"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {transactions.map((t, index) => (
                    <Link to={`/client/payment`} className="mb-">
                        <div

                            key={index}
                            className="bg-white border space-y-4 mb-2 border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-sm text-gray-500">Txn ID: {t.id}</span>
                                <span
                                    className={`text-xs font-medium px-2 py-1 rounded-full ${t.status === "Success"
                                        ? "bg-green-100 text-green-700"
                                        : t.status === "Failed"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {t.status}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                                <p className="flex items-center gap-2">
                                    <Calendar size={16} className="text-gray-500" />
                                    <span>{t.date}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <DollarSign size={16} className="text-gray-500" />
                                    <span className="font-semibold">{t.amount}</span>
                                </p>
                                <p>
                                    <span className="font-medium text-gray-600">Plan:</span>{" "}
                                    {t.plan}
                                </p>
                                <p>
                                    <span className="font-medium text-gray-600">Payment Method:</span>{" "}
                                    {t.method}
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-200 my-3" />

                            {/* Footer */}
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>By: {user.name}</span>
                                {t.status === "Success" && (
                                    <span className="flex items-center gap-1 text-green-600">
                                        <CheckCircle size={14} /> Verified
                                    </span>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

function UserDetails() {
    const { id } = useParams();
    const user = usersData.find((u) => u.id === parseInt(id));
    const [isModalOpen, setIsModalOpen] = useState(false);


    if (!user)
        return <p className="text-center py-6 text-gray-500">User not found</p>;

    const tabs = [
        {
            id: "details",
            label: "Details",
            icon: FaUser,
            content: <Details user={user} />,
        },
        {
            id: "transaction",
            label: "Transactions",
            icon: GrTransaction,
            content: <Transaction user={user} />,
        },
    ];

    return (
        <div className=" z-10 p-4 bg-white rounded-lg shadow-md flex flex-col">
            <Breadcrumbs />

            {/* Header Info */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3  pb-4 border-gray-200">
                    <div className="w-fit p-3 bg-blue-100 text-blue-600 rounded-full">
                        <User size={30} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-900">{user.name}</h3>
                        <p className="text-sm flex items-start font-medium text-gray-600">
                          <ToggleSwitch/>  
                        </p>
                       
                    </div>

                </div>
                <div className="flex gap-2">
                    <button className="bg-gray-200 border-b-2 border-gray-300 shadow-md px-3 py-2 rounded-lg flex gap-2 font-bold  text-gray-500"> <Pencil /></button>

                </div>
            </div>
            <div className="p-3 flex justify-between items-center  bg-primary/10 rounded-lg ">
                <p className="font-light"><span className="font-bold">25 Days </span> left for next Bill</p>
                <button onClick={() => setIsModalOpen(true)} className="bg-red-500 border-b-2 border-red-700 shadow-md px-3 py-2 rounded-lg flex gap-2 font-bold text-white"> <AlertCircle /> Alert</button>
            </div>



            {/* Tabs Section */}
            <div className="flex-1 mt- overflow-y-auto pb-28">
                <Tabs tabs={tabs} />
            </div>

            <Modal

                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Alert"
            >
                <textarea value={'25 days left for next bill payment !'} className="border p-3 rounded-lg w-full border-gray-300 focus:outline-none" rows={4} name="" id="">

                </textarea>
                <div className="mt-3">
                    <Button icon={Bell} text="Send notification" onClick={() => console.log('hi')} />
                </div>
            </Modal>
        </div>
    );
}

export default UserDetails;
