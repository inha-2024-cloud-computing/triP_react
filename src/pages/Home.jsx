import axios from "axios";
import travelImage from "../assets/MGF.webp";
import demo from "../assets/mgg.jpeg";
import video1 from "../assets/mgg_animation.mp4"; // 기본 배경 비디오
import SpeechBubble from "../components/SpeechBubble";
import BottomNavigation from "../components/BottomNavigation";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getAuthToken } from "../util/auth";

const Home = () => {
  const { backgroundVideo, handleImageSelect } = useOutletContext();

  return (
    <div
      className="relative flex flex-col items-center justify-start bg-stone-200 text-purple-900"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      {backgroundVideo && (
        <div
          className="relative w-full"
          style={{ height: "calc(100vh - 64px)" }}
        >
          <video
            muted
            autoPlay
            loop
            key={backgroundVideo}
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>

          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start">
            <SpeechBubble text="안녕~ 오늘은 뭘 해볼까??" />
            <div className="mt-auto mb-4 w-full flex flex-col items-center">
              <BottomNavigation />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
