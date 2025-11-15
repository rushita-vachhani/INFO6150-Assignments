import * as React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Stack,
  Box,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../state/AuthContext.jsx";
import PrimaryButton from "../../components/PrimaryButton";
import heroImg from "../../assets/image2.jpg"; 
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const { api, login, isAuthed } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthed) {
      navigate("/home");
    }
  }, [isAuthed, navigate]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

     // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      setError("Password cannot be empty.");
      return;
    }

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
      navigate("/home");
    } catch (err) {
      setError(err?.response?.data?.error || "Login failed");
    }
  }

  return (
    <>
      {/* Page Title */}
      <Typography
        variant="h3"
        fontWeight={800}
        sx={{ textAlign: "center", mb: { xs: 6, md: 4 }, mt: { xs: 2, md: 4 } }}
        gutterBottom
      >
        LOGIN
      </Typography>

      <Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: 3,
            overflow: "hidden",
            width: "100%",
            maxWidth: "900px",
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          {/* Left Side: Image */}
          <Box
            component="img"
            src={heroImg}
            alt="Login illustration"
            sx={{
              width: { xs: "100%", md: "50%" },
              height: { xs: 240, md: "auto" },
              objectFit: "contain",
              bgcolor: "#fff",
              p: 2,
            }}
          />

          {/* Right Side: Form */}
          <CardContent
            sx={{
              flex: 1,
              p: { xs: 3, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              bgcolor: "#fafafa",
            }}
          >
            <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Sign in to your account to continue exploring opportunities and companies.
            </Typography>

            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                fullWidth
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {error && <Alert severity="error">{error}</Alert>}

              <PrimaryButton type="submit">LOG IN</PrimaryButton>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
