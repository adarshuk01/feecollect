import React, { useState, useMemo } from "react";
// Import 'saveAs' from a library like 'file-saver' if you intend to implement actual saving logic.
// For this example, we'll use a placeholder for the save action.

// --- Helper Functions and Components ---

/**
 * Converts a File object to a Data URL (base64 string) for display.
 * @param {File} file The file to convert.
 * @returns {Promise<string|null>} The Data URL or null if an error occurs.
 */
const fileToDataUrl = (file) => {
  return new Promise((resolve) => {
    if (!file) {
      resolve(null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = () => resolve(null); // Handle errors gracefully
    reader.readAsDataURL(file);
  });
};

// Reusable Input Component (UI change: use focus-green for a modern look)
const ConfigInput = ({ label, id, value, onChange, placeholder, type = "text", className = "" }) => (
  <div className={`mb-4 ${className}`}>
    <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 transition duration-200"
    />
  </div>
);

// Logo Upload Component
const LogoUploadInput = ({ logoFile, setLogoFile, label = "Upload Company Logo" }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setLogoFile(file);
    } else {
      setLogoFile(null);
      alert("Please upload a valid image file.");
    }
  };

  return (
    <div className="mb-6 p-4 border border-dashed border-gray-400 rounded-lg bg-gray-50">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="file"
        id="logo-upload"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
      />
      {logoFile && (
        <p className="mt-2 text-xs text-green-600">
          File selected: **{logoFile.name}**
        </p>
      )}
    </div>
  );
};

// Receipt Preview Component (UI changes: modern font, box-shadow adjustments, use of Data URL)
const ReceiptPreview = ({ config }) => {
  // Use a mock Data URL for the logo while waiting for the fileToDataUrl Promise in the parent
  const logoSrc = config.logoDataUrl || config.logoFile; 
  
  const items = [
    { id: 1, description: "Product A - Premium Service", qty: 1, unitPrice: 99.99, total: 99.99 },
    { id: 2, description: "Product B - Standard License", qty: 2, unitPrice: 25.0, total: 50.0 },
    { id: 3, description: "Subscription Fee (Monthly)", qty: 1, unitPrice: 15.0, total: 15.0 },
  ];

  const subtotal = items.reduce((acc, item) => acc + item.total, 0);
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const grandTotal = subtotal + tax;

  return (
    <div className="font-sans  rounded-2xl  max-w-6xl mx-auto min-w-[300px] lg:min-w-[500px]">
      {/* Header */}
      <div className="border-b-2 border-gray-200 pb-4 mb-6">
        <div className="flex justify-between items-start">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt="Company Logo"
              className="h-12 w-auto object-contain rounded-md"
              // Fallback is handled by the data structure in the main component
            />
          ) : (
            <div className="h-12 w-28 bg-gray-100 text-xs flex items-center justify-center rounded-md text-gray-400 font-medium">
              NO LOGO
            </div>
          )}

          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight ml-4">INVOICE</h1>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p className="text-xl font-bold capitalize text-gray-900">{config.companyName || "Your Company Name"}</p>
          <p>{config.address || "123 Business Blvd"}</p>
          <p>Phone: {config.phone || "555-123-4567"}</p>
          <p>Tax ID: {config.taxId || "TX-00000"}</p>
          <p className="pt-3 text-sm text-gray-400 font-mono">
            Date: {new Date().toLocaleDateString()} | Receipt #INV-8794
          </p>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-gray-700 mb-6 border-collapse">
        <thead>
          <tr className="border-b border-t border-gray-200 bg-gray-50">
            <th className="py-2 text-left font-bold pl-1">Item</th>
            <th className="py-2 text-right font-bold">Qty</th>
            <th className="py-2 text-right font-bold">Price</th>
            <th className="py-2 text-right font-bold pr-1">Total</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-gray-100 last:border-b-0">
              <td className="py-2 text-left text-xs text-gray-800">{item.description}</td>
              <td className="py-2 text-right">{item.qty}</td>
              <td className="py-2 text-right">${item.unitPrice.toFixed(2)}</td>
              <td className="py-2 text-right font-semibold">${item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="text-base space-y-2">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal:</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span>Tax (8%):</span>
          <span className="font-semibold">${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between border-t border-gray-300 pt-4 font-extrabold text-xl text-green-700">
          <span>GRAND TOTAL:</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-gray-500 border-t pt-4">Thank you for your business! | Visit us at {config.companyName}.com</p>
    </div>
  );
};

// Modal Component (UI change: more distinct backdrop, smooth transition)
const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 transition-opacity duration-300">
      <div className="relative bg-white rounded-2xl p-6 max-h-[90vh] overflow-y-auto shadow-2xl transition-transform duration-300 transform scale-100">
        <button
          className="absolute top-4 right-4 bg-red-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-lg font-bold hover:bg-red-700 transition"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        {children}
      </div>
    </div>
  );
};

// Main Settings Page
export default function ReceiptCustomization() {
  const [showModal, setShowModal] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoDataUrl, setLogoDataUrl] = useState(null); // Data URL for immediate preview

  const [config, setConfig] = useState({
    companyName: "Acme Software Corp",
    address: "123 Dev Street, Suite 404",
    phone: "555-555-CODE",
    taxId: "TX-404808",
  });

  // Effect to convert logoFile to Data URL whenever logoFile changes
  React.useEffect(() => {
    async function updateLogoDataUrl() {
      const url = await fileToDataUrl(logoFile);
      setLogoDataUrl(url);
    }
    updateLogoDataUrl();
  }, [logoFile]);

  const handleConfigChange = (field) => (e) => {
    setConfig((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSaveDetails = () => {
    // 1. Get the current configuration and logo data
    const finalConfig = {
      ...config,
      // You would typically save the logo file to a server (e.g., AWS S3, Cloudinary)
      // and save the returned URL here, not the Data URL.
      // For this example, we just log the data.
      logoDataUrl: logoDataUrl, 
    };

    console.log("Saving Configuration:", finalConfig);

    // Placeholder for actual save logic (API call, local storage, etc.)
    alert("Configuration saved successfully! (Check console for data)");
  };

  // Combine config and logoDataUrl for the ReceiptPreview
  const previewConfig = useMemo(() => ({
    ...config,
    logoDataUrl: logoDataUrl
  }), [config, logoDataUrl]);


  return (
    <div className=" font-sans">
      <div className="max-w-xl mx-auto ">
        <h1 className="text-xl font-extrabold text-gray-800 mb-8 border-b border-gray-200 pb-3 text-center">
          <span role="img" aria-label="settings">⚙️</span> Receipt Customization
        </h1>

        {/* Logo Upload Section */}
        <LogoUploadInput logoFile={logoFile} setLogoFile={setLogoFile} />
        
        <div className="space-y-4">
            <ConfigInput 
                label="Company Name" 
                id="cname" 
                value={config.companyName} 
                onChange={handleConfigChange("companyName")} 
                placeholder="e.g., Acme Corp"
            />
            <ConfigInput 
                label="Address" 
                id="addr" 
                value={config.address} 
                onChange={handleConfigChange("address")} 
                placeholder="e.g., 123 Main St."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ConfigInput 
                    label="Phone" 
                    id="phone" 
                    value={config.phone} 
                    onChange={handleConfigChange("phone")} 
                    placeholder="e.g., (123) 456-7890"
                />
                <ConfigInput 
                    label="Tax ID" 
                    id="tax" 
                    value={config.taxId} 
                    onChange={handleConfigChange("taxId")} 
                    placeholder="e.g., TX-123456"
                />
            </div>
        </div>
        
        <div className="mt-8 space-y-4">
            {/* Save Details Button */}
            <button
                onClick={handleSaveDetails}
                className="w-full py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition duration-200 text-lg tracking-wider"
            >
                💾 Save Details
            </button>
            
            {/* Preview Button */}
            <button
                onClick={() => setShowModal(true)}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-200"
            >
                🔍 Preview Receipt
            </button>
        </div>
      </div>

      {/* Preview Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ReceiptPreview config={previewConfig} />
      </Modal>
    </div>
  );
}