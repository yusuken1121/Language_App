"use client";
import React from "react";
import Lottie from "react-lottie";
import animationData from "../public/assets/not-found.json";
const LottieNotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default LottieNotFound;