import React, { useRef, useState } from "react";
import axios from "axios";
import { getAuthToken } from "../util/auth";
import { FaCamera } from "react-icons/fa";
import SpeechBubble from "../components/SpeechBubble";
import { FaSpinner, FaTimes } from "react-icons/fa";
import move from "../assets/mgg_animation.mp4";

import MenuList from "./MenuList"; // MenuList 컴포넌트 임포트
import { Form, useOutletContext } from "react-router-dom";

const MenuForm = () => {
  const [error, setError] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [mappingFailedMessage, setMappingFailedMessage] = useState(null); // 새로운 상태 추가
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [selectedType, setSelectedType] = useState("MENU");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const { backgroundVideo, handleImageSelect } = useOutletContext();
  const token = getAuthToken();
  const apiEndpoint = "https://trip-ani.kro.kr/image/translate"; // 업로드할 API 엔드포인트

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append(
      "requestDTO",
      new Blob([JSON.stringify({ imageTranslateType: selectedType })], {
        type: "application/json",
      })
    );

    try {
      setLoading(true);
      setShowModal(true);
      const response = await axios.post(apiEndpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Success:", response.data);
      if (response.data.menus && response.data.menus.length > 0) {
        setMenuItems(response.data.menus);
        setMappingFailedMessage(null);
      } else {
        setMappingFailedMessage(response.data.mappingFailedOrNoForm);
      }
      setError(null);
    } catch (error) {
      console.error("Error uploading file", error);
      setError("File upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const closeModal = () => {
    setShowModal(false); // 모달을 닫는 함수
  };

  return (
    <div
      className="relative flex flex-col items-center justify-start bg-stone-200 text-purple-900"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      <div className="relative w-full" style={{ height: "calc(100vh - 64px)" }}>
        <video
          muted
          autoPlay
          loop
          playsInline
          key={backgroundVideo}
          className="w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start">
          <SpeechBubble text="사진을 올려줘!" />
          <div className="mt-auto mb-4 w-full flex flex-col items-center">
            <Form
              className="w-4/5 opacity-70"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="bg-orange-100 p-2 mb-2 rounded-lg flex items-center justify-center">
                <label className="mr-2 text-sm font-bold">종류 :</label>
                <select
                  value={selectedType}
                  onChange={handleTypeChange}
                  className="bg-orange-100 text-sm text-bold rounded-lg"
                >
                  <option value="MENU">메뉴판</option>
                  <option value="OTHER">기타</option>
                </select>
              </div>
              <div
                className="bg-orange-100 p-2 mb-2 rounded-lg flex items-center justify-center cursor-pointer"
                onClick={handleFileInputClick}
              >
                <FaCamera size={24} className="mr-2 text-sm font-bold" />
                <span className="text-sm font-bold">
                  {selectedFile ? selectedFile.name : "사진 선택"}
                </span>
                <input
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-300 p-2 rounded-lg font-bold text-white"
              >
                제출
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </Form>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full h-full overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 text-black"
              onClick={closeModal}
            >
              <FaTimes size={24} />
            </button>
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <FaSpinner className="animate-spin text-4xl mb-4" />
                <p className="text-2xl">리피에게 물어보는 중...</p>
              </div>
            ) : (
              <MenuList
                menuItems={menuItems}
                mappingFailedMessage={mappingFailedMessage}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuForm;
