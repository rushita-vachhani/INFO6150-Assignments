import * as React from "react";
import {
  AppBar, Toolbar, Typography, Button, IconButton, Box, Stack,
  Drawer, List, ListItemButton, useScrollTrigger, useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../../state/AuthContext.jsx";

function ElevationScroll({ children }) {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 4 });
  return React.cloneElement(children, { elevation: trigger ? 6 : 0 });
}

const authedPages = [
  { to: "/", label: "HOME" },
  { to: "/companies", label: "COMPANIES" },
  { to: "/jobs", label: "JOBS" },
  { to: "/about", label: "ABOUT" },
  { to: "/contact", label: "CONTACT" },
];

const unauthedPages = [
  { to: "/", label: "HOME" },
  
];

const linkSx = {
  px: 1.25,
  py: 0.5,
  borderRadius: 2,
  color: "white",
  textTransform: "none",
  "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
  "&.active": { bgcolor: "rgba(255,255,255,0.18)", fontWeight: 700 },
};

export default function NavBar() {
  const { isAuthed, logout, user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = React.useState(false);

  const handleLogout = () => { logout(); navigate("/"); };
  const pages = isAuthed ? authedPages : unauthedPages;

  return (
    <ElevationScroll>
      <AppBar
        position="sticky"
        sx={{
          background: "linear-gradient(90deg, #0b6b61 0%, #0fa39e 100%)",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            px: { xs: 1.5, sm: 2, md: 3 },
            minHeight: { xs: 56, sm: 64 },
            gap: 1,
          }}
        >
          {/* Left: hamburger on mobile */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
            <IconButton
              color="inherit"
              edge="start"
              aria-label="open navigation"
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Center: brand (always visible, truncated if needed) */}
          <Box sx={{
            flexGrow: 1,
            textAlign: { xs: "center", md: "left" },
            overflow: "hidden",
          }}>
            <Typography
              variant="h6"
              noWrap
              sx={{ fontWeight: 800, letterSpacing: 0.5 }}
            >
              JobBest
            </Typography>
          </Box>

          {/* Desktop links */}
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {pages.map(p => (
              <Button key={p.to} component={NavLink} to={p.to} sx={linkSx}>
                {p.label}
              </Button>
            ))}
          </Stack>

          {/* Right: auth (text on md+, compact icon on xs/sm) */}
          <Box sx={{ ml: { md: 2 } }}>
            {isMdUp ? (
              isAuthed ? (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
                    {user?.email}
                  </Typography>
                  <Button
                    color="inherit"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{ textTransform: "none" }}
                  >
                    LOGOUT
                  </Button>
                </Stack>
              ) : (
                <Button
                  color="inherit"
                  startIcon={<LoginIcon />}
                  onClick={() => navigate("/login")}
                  sx={{ textTransform: "none" }}
                >
                  LOG IN
                </Button>
              )
            ) : (
              <IconButton
                color="inherit"
                aria-label={isAuthed ? "LOGOUT" : "LOG IN"}
                onClick={isAuthed ? handleLogout : () => navigate("/login")}
              >
                {isAuthed ? <LogoutIcon /> : <LoginIcon />}
              </IconButton>
            )}
          </Box>
        </Toolbar>

        {/* Mobile Drawer (all links + auth) */}
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          <Box sx={{ width: 260, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
              JobBest
            </Typography>
            <List sx={{ py: 0 }}>
              {pages.map(p => (
                <ListItemButton
                  key={p.to}
                  component={NavLink}
                  to={p.to}
                  onClick={() => setOpen(false)}
                  sx={{ "&.active": { bgcolor: "action.selected", fontWeight: 700 } }}
                >
                  {p.label}
                </ListItemButton>
              ))}
            </List>
            <Box sx={{ mt: 0 }}>
              {isAuthed ? (
                <ListItemButton onClick={() => { setOpen(false); handleLogout(); }}>
                  LOGOUT
                </ListItemButton>
              ) : (
                <ListItemButton onClick={() => { setOpen(false); navigate("/login"); }}>
                  LOG IN
                </ListItemButton>
              )}
            </Box>
          </Box>
        </Drawer>
      </AppBar>
    </ElevationScroll>
  );
}
