import React, { useRef, useState } from "react";
import { getAuthToken } from "../util/auth";
import { FaCameraRetro } from "react-icons/fa";
import { Link } from "react-router-dom";
const MenuForm = () => {
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const token = getAuthToken();
  const apiEndpoint = "https://your-api-endpoint.com/upload"; // 업로드할 API 엔드포인트

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        setError(error.message);
        return;
      }
    } catch (error) {
      console.error("Error uploading file", error);
      setError("File upload failed");
    }
  };

  return (
    <div
      className="bg-purple-200 min-h-screen flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      <div className="relative bg-gray-100 p-6 rounded shadow-md text-center">
        <FaCameraRetro
          size={64}
          className="relative left-1/2 transform -translate-x-1/2 mb-5  text-gray-600"
        />
        <h2 className="text-2xl mb-4">사진을 업로드 하세요!</h2>
        <button
          onClick={handleFileInputClick}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded mb-4"
        >
          사진 선택
        </button>
        <input
          id="file"
          name="file"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <div>
        <Link to="/dummy">
          <button>dummy</button>
        </Link>
      </div>
    </div>
  );
};

export default MenuForm;
