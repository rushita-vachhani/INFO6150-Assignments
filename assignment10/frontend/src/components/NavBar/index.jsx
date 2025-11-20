import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, role } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static" color="primary" sx={{ mb: 3 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* LEFT SIDE NAV */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          {/* BEFORE LOGIN — SHOW ONLY HOME + LOGIN */}
          {!isAuthenticated && (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </>
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
            </>
          )}
        </Box>

        {/* RIGHT SIDE: LOGOUT */}
        <Box>
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
