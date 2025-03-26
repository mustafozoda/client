import { Routes, Route } from "react-router-dom";
import Machines from "../pages/Machines";
import MaintenanceLogs from "../pages/MaintenanceLogs";
import IssueReports from "../pages/IssueReports";
import UserManagement from "../pages/UserManagement";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import Overview from "../pages/Overview";
import Login from "../auth/Login";
import PrivateRoute from "../layout/PrivateRoute";

const AppRoutes = ({ dark }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Overview />
          </PrivateRoute>
        }
      />
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

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
