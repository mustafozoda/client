import { Routes, Route } from "react-router-dom";
import Machines from "../pages/Machines";
import MaintenanceLogs from "../pages/MaintenanceLogs";
import IssueReports from "../pages/IssueReports";
import UserManagement from "../pages/UserManagement";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import Overview from "../pages/Overview";
import PrivateRoute from "../auth/PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />

      <Route
        path="/machines"
        element={
          <PrivateRoute>
            <Machines />
          </PrivateRoute>
        }
      />

      <Route
        path="/maintenance-logs"
        element={
          <PrivateRoute>
            <MaintenanceLogs />
          </PrivateRoute>
        }
      />
      <Route
        path="/issue-reports"
        element={
          <PrivateRoute>
            <IssueReports />
          </PrivateRoute>
        }
      />
      <Route
        path="/user-management"
        element={
          <PrivateRoute>
            <UserManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
