import React, { useState } from "react";
import Tabs from "../../components/common/Tabs";
import { FaFileImport, FaUserEdit } from "react-icons/fa";
import { CloudUpload, Download } from "lucide-react";
import Button from "../../components/common/Button";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import MemberForm from "../../components/Client/MemberForm";
import axios from "axios";
import toast from "react-hot-toast";

// ========================= ImportFile Component =========================
function ImportFile() {
  const [previewData, setPreviewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // --------------------- Pagination State ---------------------
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(previewData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = previewData.slice(indexOfFirstRow, indexOfLastRow);

  // Backend URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // --------------------- File Upload ---------------------
  const uploadFile = async (file) => {
    if (!file) return;

    setLoading(true);
    const toastId = toast.loading("Uploading... 0%");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/upload-excel`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progress) => {
          const percent = Math.round((progress.loaded * 100) / progress.total);
          toast.loading(`Uploading... ${percent}%`, { id: toastId });
        },
      });

      setPreviewData(res.data.data || []);
      setCurrentPage(1);

      toast.success(
        `File uploaded successfully (${res.data.totalRecords} records)`,
        { id: toastId }
      );
    } catch (err) {
      console.error(err);
      toast.error("Error uploading file", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => uploadFile(e.target.files[0]);
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = () => setDragActive(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    uploadFile(e.dataTransfer.files[0]);
  };

  // ------------------------- UI ------------------------------
  return (
    <div className="space-y-6">
      {previewData.length === 0 && (
        <div>
          {/* Download Template */}
          <Button icon={Download} text="Download Basic Template" />

          {/* Upload Box */}
          <div className="flex justify-center items-center mt-4">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`w-full border-2 border-dashed rounded-lg p-12 transition duration-300 ease-in-out text-center
              ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400"
              }`}
              style={{ minHeight: "300px" }}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-4 rounded-full bg-gray-100 text-gray-500">
                  <CloudUpload className="w-12 h-12" />
                </div>

                <p className="text-base text-gray-700 mb-1">
                  Drag & drop file or{" "}
                  <label
                    htmlFor="fileUpload"
                    className="text-primary font-semibold cursor-pointer border-b border-primary"
                  >
                    Browse
                  </label>
                </p>

                <input
                  id="fileUpload"
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {loading && (
                  <p className="text-sm text-gray-600">Uploading...</p>
                )}

                <p className="text-sm text-gray-500">
                  Max members per upload: <b>500</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --------------------- TABLE WITH PAGINATION --------------------- */}
      {previewData.length > 0 && (
        <div className="mt-6 w-full">
          <h3 className="font-semibold text-lg mb-3">
            Preview ({previewData.length} records)
          </h3>

          <div className="overflow-auto border lg:min-w-full w-[320px] border-gray-200 rounded-lg shadow-sm">
            <table className=" text-sm text-left">
              <thead className="bg-primary text-white">
                <tr>
                  {Object.keys(previewData[0]).map((key) => (
                    <th key={key} className="px-4 py-2 border-b font-semibold">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {currentRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 even:bg-gray-50/50 transition"
                  >
                    {Object.keys(row).map((key) => (
                      <td
                        key={key}
                        className="px-4 py-2 border-b border-gray-200 whitespace-nowrap"
                      >
                        {row[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`px-4 py-2 rounded-md border ${
                currentPage === 1
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-primary text-primary"
              }`}
            >
              Prev
            </button>

            <span className="text-sm">
              Page <b>{currentPage}</b> of <b>{totalPages}</b>
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`px-4 py-2 rounded-md border ${
                currentPage === totalPages
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-primary text-primary"
              }`}
            >
              Next
            </button>
          </div>

          <Button text="Add to Database" className="mt-6" />
        </div>
      )}
    </div>
  );
}

// ========================= AddMembers Page =========================
function AddMembers() {
  const tabs = [
    {
      id: "importfile",
      label: "Import File",
      content: <ImportFile />,
      icon: FaFileImport,
    },
    {
      id: "addmanually",
      label: "Add Manually",
      icon: FaUserEdit,
      content: <MemberForm mode="add" />,
    },
  ];

  return (
    <div className="space-y-4 py-4 px-4 rounded-lg bg-white">
      <Breadcrumbs />
      <div className="rounded-xl">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}

export default AddMembers;
