import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaImages } from "react-icons/fa";

// 더미 데이터
const dummyMenuItems = [
  {
    id: 1,
    imageUrl: "https://via.placeholder.com/150",
    name: "불고기",
    description: "달콤한 소고기 불고기",
  },
  {
    id: 2,
    imageUrl: "https://via.placeholder.com/150",
    name: "비빔밥",
    description: "신선한 채소와 고추장으로 맛을 낸 비빔밥",
  },
  {
    id: 3,
    imageUrl: "https://via.placeholder.com/150",
    name: "김치찌개",
    description: "매콤한 김치와 돼지고기가 들어간 김치찌개",
  },
];

const MenuList = () => {
  const [menuItems, setMenuItems] = useState(dummyMenuItems);

  return (
    <div className="m-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">메뉴</h1>
      </div>

      <div className="flex flex-col items-center justify-center bg-gray-100">
        <div className="w-full max-w-2xl px-4 py-5">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg overflow-hidden my-4 flex flex-row"
            >
              {/* 이미지 섹션 */}
              <div
                className="relative w-1/3"
                style={{
                  paddingBottom: "33.33%", // 1:3 비율
                }}
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt="메뉴 이미지"
                    className="absolute h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <FaImages size={50} /> {/* 아이콘 크기 조정 가능 */}
                  </div>
                )}
              </div>
              {/* 상세 설명 섹션 */}
              <div className="p-4 flex flex-col justify-center w-2/3">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-md mb-2">{item.description}</p>
                {/* 액션 버튼 */}
                <div className="flex items-center justify-end mt-4">
                  <div className="flex items-center">
                    <input
                      type="button"
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2">선택</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuList;
