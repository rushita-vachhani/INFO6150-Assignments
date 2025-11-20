import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, role, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static" color="primary" sx={{ mb: 3 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* LEFT SIDE NAV */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>

          {/* BEFORE LOGIN — SHOW ONLY HOME + LOGIN */}
          {!isAuthenticated && (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}

          {/* EMPLOYEE NAV */}
          {isAuthenticated && role === "employee" && (
            <>
              <Button color="inherit" component={Link} to="/employee/jobs">
                Jobs
              </Button>
              <Button color="inherit" component={Link} to="/companies">
                Companies
              </Button>
              <Button color="inherit" component={Link} to="/contact">
                Contact
              </Button>
            </>
          )}

          {/* ADMIN NAV */}
          {isAuthenticated && role === "admin" && (
            <>
              <Button color="inherit" component={Link} to="/admin/employees">
                Employees
              </Button>
              <Button color="inherit" component={Link} to="/admin/add-job">
                Add Job
              </Button>
              <Button color="inherit" component={Link} to="/companies">
                Companies
              </Button>
              <Button color="inherit" component={Link} to="/contact">
                Contact
              </Button>
            </>
          )}
        </Box>

        {/* RIGHT SIDE: USER INFO + LOGOUT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          
          {/* SHOW USER EMAIL + ROLE */}
          {isAuthenticated && user?.email && (
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1 }}>
                {user.email}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "#e3f2fd", fontWeight: 500 }}
              >
                ({user.type === "admin" ? "Admin" : "Employee"})
              </Typography>
            </Box>
          )}

          {/* LOGOUT BUTTON */}
          {isAuthenticated && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
