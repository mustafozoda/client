import React from "react";
import Header from "../layout/Header";

const UserManagement = () => {
  return (
    <div className="relative z-10 flex flex-1 flex-col overflow-auto">
      <Header title="User Management" />
      <div className="flex-1"></div>
    </div>
  );
};

export default UserManagement;
