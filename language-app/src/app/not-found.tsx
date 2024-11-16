import LottieNotFound from "@/components/LottieNotFound";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div>
        <div className="text-2xl">ページが見つかりません</div>
        <LottieNotFound />
      </div>
    </div>
  );
};

export default NotFound;
