import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAdmin } from "../../context/admin/AdminContext";
import axios from "axios";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import Modal from "../common/Modal";
import Button from "../common/Button";
import toast from "react-hot-toast";
import {
  FaBoxOpen,
  FaEnvelope,
  FaFlag,
  FaLock,
  FaPlusSquare,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import {
  FaBuildingUser,
  FaHandHoldingDollar,
  FaMoneyCheckDollar,
} from "react-icons/fa6";
import { Plus, Search } from "lucide-react";

function AddClient() {
  const { id } = useParams();
  const {
    categories,
    addCategory,
    addClient,
    client,
    updateClient,
    fetchClient,
    loading,
  } = useAdmin();

  const [formData, setFormData] = useState({
    fullName: "",
    first_name:"",
    lastName:"",
    phoneno: "",
    email: "",
    address: "",
    businessName: "",
    payment_method: "",
    category: "",
    currency_emoji:""
  });

  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // ---------------- Fetch Countries ----------------
  useEffect(() => {
    axios
      .get(
        "https://restcountries.com/v3.1/independent?status=true&fields=name,currencies,idd,cca2"
      )
      .then((res) => {
        const list = res.data.map((country) => ({
          name: country.name?.common || "",
          code: country.cca2 || "",
          currency: country.currencies
            ? Object.values(country.currencies)[0]
            : null,
          phoneCode: country.idd?.root
            ? `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ""}`
            : "",
        }));
        setCountries(list);
      })
      .catch(() => toast.error("Failed to fetch countries"));
  }, []);

  // ---------------- Country Select ----------------
  const handleCountrySelect = (countryName) => {
    const country = countries.find((c) => c.name === countryName);
    setSelectedCountry(country);
    setCurrencySymbol(country?.currency?.symbol || "");
    setPhoneCode(country?.phoneCode || "");
  };

  // ---------------- Validation ----------------
  const validateForm = () => {
    const newErrors = {};
    // if (!formData.first_name) newErrors.fullName = "first_name name required";
    //  if (!formData.lastName) newErrors.fullName = "lastName name required";
    if (!formData.phoneno) newErrors.phoneno = "Phone number required";
    if (!formData.email) newErrors.email = "Email required";
    if (!formData.category) newErrors.category = "Select a category";
    if (!formData.payment_method) newErrors.payment_method = "Select payment method";
    return newErrors;
  };

  // ---------------- Submit ----------------
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) return setErrors(errors);

    const payload = {
      username: formData.email,
      first_name:formData.first_name,
      last_name:formData.lastName,
      email: formData.email,
      business_name: formData.businessName,
      contact_number: `${phoneCode}${formData.phoneno}`,
      address: formData.address,
      payment_method: formData.payment_method,
      category: formData.category,
      country: selectedCountry?.name,
      subscription_currency: currencySymbol,
      country_code: selectedCountry?.code,
      currency_emoji: currencySymbol,
    };

    if (id) {
      updateClient(id, payload);
    } else {
      addClient(payload);
    }
  };

  // ---------------- Load Client Details via Context ----------------
  useEffect(() => {
    if (id) fetchClient(id);
  }, [id]);

  // ---------------- Auto-fill Form When Client Updates ----------------
  useEffect(() => {
    if (client && id) {
      setFormData({
        fullName: client?.username || "",
        first_name:client?.first_name || "",
         lastName:client?.last_name || "",
        phoneno: client?.contact_number || "",
        email: client?.email || "",
        address: client?.address || "",
        businessName: client?.business_name || "",
        payment_method: client?.payment_method || "",
        category: client?.category || "",
        currency_emoji:client?.currency_emoji
        
      });

      if (client?.country && countries.length > 0) {
        const found = countries.find((c) => c.name === client.country);
        if (found) {
          setSelectedCountry(found);
          setCurrencySymbol(found?.currency?.symbol || "");
          setPhoneCode(found?.phoneCode || "");
        }
      }
    }
  }, [client, id, countries]);

  // ---------------- Filter Countries ----------------
  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ---------------- Add Category ----------------
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return toast.error("Enter a category name");
    await addCategory(newCategory);
    setNewCategory("");
    setIsModalOpen(false);
  };

  // ---------------- JSX ----------------
  return (
    <div className="p-6 rounded-2xl bg-white shadow-md">
      

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ---------------- Personal Details ---------------- */}
        <div className="space-y-2">
          <h1 className="text-xl text-primary font-bold uppercase flex gap-2 items-center">
            <FaUsers /> Personal Details
          </h1>
          <hr className="border border-primary mb-4" />

          {/* <TextInput
            label="First Name"
            name="fullName"
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
            placeholder="Enter full name"
            icon={FaUser}
            error={errors.first_name}
          />
          <TextInput
            label="Last Name"
            name="fullName"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            placeholder="Enter full name"
            icon={FaUser}
            error={errors.lastName}
          /> */}

          <TextInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Enter your email"
            icon={FaEnvelope}
            error={errors.email}
          />

          {/* ---------------- Country Selection ---------------- */}
          <div className="mt-1 grid grid-cols-1 lg:grid-cols-3 items-end gap-2">
            <TextInput
              label="Search country"
              type="text"
              icon={Search}
              placeholder="Search country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <SelectInput
              label="Select Country"
              name="country"
              value={selectedCountry?.name || ""}
              onChange={(e) => handleCountrySelect(e.target.value)}
              icon={FaFlag}
              options={filteredCountries.map((c) => ({
                label: c.name,
                value: c.name,
              }))}
            />

            <TextInput
              label="Currency"
              value={currencySymbol?currencySymbol:client?.currency_emoji}
              readOnly
              placeholder="₹, $, €..."
            />
          </div>

          {/* ---------------- Phone ---------------- */}
          <div>
            <label className="font-semibold text-sm">Phone number</label>
            <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 mt-2 focus-within:ring-2 focus-within:ring-blue-500">
              <span className="px-3 py-2 bg-gray-100 border-r border-gray-300 text-gray-700 whitespace-nowrap">
                {phoneCode || "+__"}
              </span>
              <input
                type="text"
                name="phoneno"
                value={formData.phoneno}
                onChange={(e) =>
                  setFormData({ ...formData, phoneno: e.target.value })
                }
                placeholder="Enter phone number"
                className="w-full p-2 outline-none bg-gray-50"
              />
            </div>
            {errors.phoneno && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneno}</p>
            )}
          </div>

          {/* ---------------- Address ---------------- */}
          <label className="font-semibold text-sm">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            placeholder="Enter your address"
            className="border w-full p-2 focus:ring-blue-500 focus:border-transparent transition focus:ring-2 focus:outline-none mt-2 bg-gray-50 border-gray-300 rounded-lg"
            rows={4}
          />
        </div>

        {/* ---------------- Business Details ---------------- */}
        <div className="space-y-2">
          <h1 className="text-xl text-primary font-bold uppercase flex gap-2 items-center">
            <FaBuildingUser /> Business Details
          </h1>
          <hr className="border border-primary mb-4" />

          <SelectInput
            label="Category"
            name="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            icon={FaPlusSquare}
            options={categories.map((c) => ({ label: c.name, value: c.id }))}
            error={errors.category}
          />

          <Button
            type="button"
            text="Add Category"
            icon={Plus}
            onClick={() => setIsModalOpen(true)}
            loading={loading}
          />

          <TextInput
            label="Business Name"
            name="businessName"
            value={formData.businessName}
            onChange={(e) =>
              setFormData({ ...formData, businessName: e.target.value })
            }
            placeholder="Enter business name"
            icon={FaUser}
          />

          {/* ---------------- Payment ---------------- */}
          <h1 className="text-xl text-primary font-bold uppercase flex gap-2 items-center mt-6">
            <FaMoneyCheckDollar /> Payment
          </h1>
          <hr className="border border-primary mb-4" />

          <SelectInput
            label="Payment Type"
            name="payment_method"
            value={formData.payment_method}
            onChange={(e) =>
              setFormData({ ...formData, payment_method: e.target.value })
            }
            icon={FaHandHoldingDollar}
            options={[
              { label: "Cash", value: "Cash" },
              { label: "Card", value: "Card" },
              { label: "Gpay", value: "Gpay" },
            ]}
            error={errors.payment_method}
          />

          <TextInput
            label="Amount"
            name="amount"
            type="text"
            value="5000"
            readOnly
            icon={FaLock}
          />
        </div>

        {/* ---------------- Submit ---------------- */}
        <div className="col-span-1 lg:col-span-2 flex justify-end mt-4">
          <Button
            type="submit"
            text={id ? "Update Client" : "Register Client"}
            loading={loading}
            className="lg:w-fit"
          />
        </div>
      </form>

      {/* ---------------- Modal ---------------- */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Category"
      >
        <TextInput
          label="Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter category name"
          icon={FaBoxOpen}
        />
        <Button text="Create" onClick={handleAddCategory} loading={loading} />
      </Modal>
    </div>
  );
}

export default AddClient;
