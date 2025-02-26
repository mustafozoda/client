import React from "react";
import Header from "../layout/Header";
import SkeletonLoader from "../components/SkeletonLoader";
const Dashboard = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10 flex flex-col">
      <Header title="Overview" />
      <div className=" items-center  justify-center h-max flex flex-wrap">
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />

        <div className=""></div>
      </div>
    </div>
  );
};

export default Dashboard;
