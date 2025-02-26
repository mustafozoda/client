import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Machines from "./pages/Machines";
import MaintenanceLogs from "./pages/MaintenanceLogs";
import IssueReports from "./pages/IssueReports";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/machines" element={<Machines />} />
      <Route path="/maintenance-logs" element={<MaintenanceLogs />} />
      <Route path="/issue-reports" element={<IssueReports />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} /> {/* 404 Catch-all */}
    </Routes>
  );
};

export default AppRoutes;
