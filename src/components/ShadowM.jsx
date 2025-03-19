import React from "react";
import SkeletonLoader from "./SkeletonLoader";

const ShadowM = () => {
  return (
    <div className="overflow-hidden ">
      <div className=" items-center justify-center flex flex-wrap">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </div>
    </div>
  );
};

export default ShadowM;
