import React from "react";
import Header from "../layout/Header";

const UserManagement = () => {
  return (
    <div className="flex-1 flex flex-col  overflow-auto relative z-10">
      <Header title="User Management" />
      <div className="flex-1"></div>
    </div>
  );
};

export default UserManagement;
