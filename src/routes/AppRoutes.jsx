import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Machines from "../pages/Machines";
import MaintenanceLogs from "../pages/MaintenanceLogs";
import IssueReports from "../pages/IssueReports";
import UserManagement from "../pages/UserManagement";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import Overview from "../pages/Overview";
import LoginPage from "../pages/LoginPage";
const AppRoutes = ({ dark }) => {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard dark={dark} />} />
      <Route path="/machines" element={<Machines />} />
      <Route path="/maintenance-logs" element={<MaintenanceLogs />} />
      <Route path="/issue-reports" element={<IssueReports />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
