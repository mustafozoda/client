import React from "react";
import Header from "../layout/Header";
import SkeletonLoader from "../components/SkeletonLoader";
const Dashboard = ({ dark }) => {
  return (
    <div className="flex-1 relative  z-10 flex flex-col">
      <Header title="Dashboard" />
      <div className="overflow-hidden ">
        <div className=" items-center justify-center flex flex-wrap">
          <SkeletonLoader dark={dark} />
          <SkeletonLoader dark={dark} />
          <SkeletonLoader dark={dark} />
          <SkeletonLoader dark={dark} />
          <SkeletonLoader dark={dark} />
          <SkeletonLoader dark={dark} />
          <SkeletonLoader dark={dark} />
          <SkeletonLoader dark={dark} />
          {/* <SkeletonLoader dark={dark} />
          <SkeletonLoader dark={dark} />
          <SkeletonLoader dark={dark} />
          <SkeletonLoader dark={dark} /> */}
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
