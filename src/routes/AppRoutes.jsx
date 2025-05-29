import { Routes, Route } from "react-router-dom";
import Machines from "../pages/Machines";
import IssueReports from "../pages/Reports";
import NotFound from "../pages/NotFound";
import Overview from "../pages/Overview";
import PrivateRoute from "../auth/PrivateRoute";
import Tasks from "../pages/Tasks";
import Reports from "../pages/Reports";

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
        path="/tasks"
        element={
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
