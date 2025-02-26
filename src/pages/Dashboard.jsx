import React from "react";
import Header from "../layout/Header";

const Dashboard = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10 flex flex-col">
      <Header title="Overview" />
      <div className="flex-1"></div>
    </div>
  );
};

export default Dashboard;
