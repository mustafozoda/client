import React from "react";
import Header from "../layout/Header";
import ShadowM from "../components/ShadowM";

const Dashboard = ({ dark }) => {
  return (
    <div className="flex-1 relative  z-10 flex flex-col">
      <Header title="Dashboard" />
      <ShadowM />
    </div>
  );
};

export default Dashboard;
