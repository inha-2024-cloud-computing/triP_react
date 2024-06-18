import React from "react";
import Header from "../components/Header";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";
import { useState } from "react";
import video1 from "../assets/mgg_animation.mp4";
import video2 from "../assets/mgg_2_animation.mp4";
import video3 from "../assets/mgg_3_animation.mp4";
import video4 from "../assets/mgg_4_animation.mp4";

const Root = () => {
  const [backgroundVideo, setBackgroundVideo] = useState(video1);
  const handleImageSelect = (index) => {
    const videoMap = [video1, video2, video3, video4];
    setBackgroundVideo(videoMap[index]);
  };
  return (
    <>
      <Header />

      <main>
        <Outlet context={{ backgroundVideo, handleImageSelect }} />
      </main>
    </>
  );
};

export default Root;
