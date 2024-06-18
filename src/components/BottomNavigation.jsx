import React, { useState } from "react";
import {
  FaUtensils,
  FaMapSigns,
  FaCamera,
  FaUser,
  FaTimes,
  FaComments,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import mmg1 from "../assets/mgg.jpeg";
import mmg2 from "../assets/mgg_2.jpeg";
import mmg3 from "../assets/mgg_3.jpeg";
import mmg4 from "../assets/mgg_4.jpeg";
import video1 from "../assets/mgg_animation.mp4";
import video2 from "../assets/mgg_2_animation.mp4";
import video3 from "../assets/mgg_3_animation.mp4";
import video4 from "../assets/mgg_4_animation.mp4";
import { useOutletContext } from "react-router-dom";

const BottomNavigation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { backgroundVideo, handleImageSelect } = useOutletContext();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleImageClick = (index) => {
    handleImageSelect(index);
    toggleModal();
  };

  return (
    <div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col justify-around items-center h-auto pb-4 z-10 opacity-70 w-4/5 pb-6">
        <Link to="menupan" className="w-full">
          <button className="w-full bg-orange-200 p-2 mb-2 rounded-lg flex items-center justify-center">
            <FaCamera size={24} className="mr-2" />
            <span className="text-sm font-bold">메뉴판 번역</span>
          </button>
        </Link>
        <Link to="chat" className="w-full">
          <button className="w-full bg-orange-200 p-2 rounded-lg flex items-center justify-center">
            <FaComments size={24} className="mr-2" />
            <span className="text-sm font-bold">리피와 대화</span>
          </button>
        </Link>
        <button
          onClick={toggleModal}
          className="w-full bg-orange-200 p-2 mb-2 mt-2 rounded-lg flex items-center justify-center"
        >
          <FaMapSigns size={24} className="mr-2" />
          <span className="text-sm font-bold">이미지 변경</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-lg w-full max-h-full overflow-auto">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={24} />
            </button>
            <h2 className="text-xl mb-4">배경이미지를 선택하세요</h2>
            <div className="grid grid-cols-2 gap-4">
              {[mmg1, mmg2, mmg3, mmg4].map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`costume-${index}`}
                  className="w-full h-auto cursor-pointer"
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomNavigation;
