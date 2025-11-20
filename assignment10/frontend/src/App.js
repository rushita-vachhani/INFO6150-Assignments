import { Routes, Route, Navigate } from "react-router-dom";
import { Container, Box } from "@mui/material";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Companies from "./pages/Company_Showcase";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";

// NEW IMPORTS FOR ASSIGNMENT 10
import AdminRoute from "./components/ProtectedRoutes/AdminRoute";
import EmployeeRoute from "./components/ProtectedRoutes/EmployeeRoute";

// NEW PAGES
import Employees from "./pages/Admin/Employees";
import AddJob from "./pages/Admin/AddJob";
import EmployeeJobs from "./pages/Employees/Jobs";

export default function App() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fafafa" }}>
      <NavBar />

      <Container sx={{ py: 4 }}>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Old Job page is replaced */}
          <Route path="/login" element={<Login />} />

          {/* Protected by login + ADMIN ONLY */}
          <Route
            path="/admin/employees"
            element={
              <AdminRoute>
                <Employees />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/add-job"
            element={
              <AdminRoute>
                <AddJob />
              </AdminRoute>
            }
          />

          {/* Protected by login + EMPLOYEE ONLY */}
          <Route
            path="/employee/jobs"
            element={
              <EmployeeRoute>
                <EmployeeJobs />
              </EmployeeRoute>
            }
          />

          {/* Protected for both (employee & admin because both are logged in) */}
          <Route
            path="/companies"
            element={
              <EmployeeRoute>
                <Companies />
              </EmployeeRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Box>
  );
}
