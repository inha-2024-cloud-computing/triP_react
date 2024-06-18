import React from "react";
import { FaImages } from "react-icons/fa";

const MenuList = ({ menuItems, mappingFailedMessage }) => {
  return (
    <div className="m-4">
      {!mappingFailedMessage && (
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">메뉴</h1>
        </div>
      )}

      <div className="flex flex-col items-center justify-center bg-gray-100 h-full">
        <div className="w-full max-w-3xl px-4 py-5">
          {mappingFailedMessage ? (
            <div className="bg-white shadow-md rounded-lg overflow-hidden my-4 p-4 h-full flex items-center justify-center">
              <p className="text-gray-800 text-center">
                {mappingFailedMessage}
              </p>
            </div>
          ) : (
            menuItems.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden my-4 flex flex-row"
              >
                <div
                  className="relative w-1/3"
                  style={{
                    paddingBottom: "33.33%", // 1:3 비율
                  }}
                >
                  {item.imageUrl && item.imageUrl.length > 0 ? (
                    <img
                      src={item.imageUrl[0]}
                      alt="메뉴 이미지"
                      className="absolute h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                      <FaImages size={50} /> {/* 아이콘 크기 조정 가능 */}
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col justify-center w-2/3">
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p className="text-md mb-2">{item.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuList;
