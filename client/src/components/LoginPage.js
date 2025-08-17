import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { Login, Email, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: `Welcome back! Logged in as ${data.user.userType}`,
        });

        if (data.user.userType === "mentor") {
          setTimeout(() => navigate("/profile/edit"), 1500);
        } else {
          setMessage({
            type: "info",
            text: "Logged in as mentee. Only mentors can edit profiles.",
          });
        }
      } else {
        setMessage({ type: "error", text: data.error || "Login failed" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={6} mb={4}>
          <Typography variant="h3" component="div" fontSize="3rem">
            👑
          </Typography>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sign in to continue your mentorship journey
          </Typography>
        </Box>

        {message.text && (
          <Alert
            severity={
              message.type === "success"
                ? "success"
                : message.type === "info"
                ? "info"
                : "error"
            }
            onClose={() => setMessage({ type: "", text: "" })}
            sx={{ mb: 3 }}
          >
            {message.text}
          </Alert>
        )}

        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={loginData.email}
            onChange={handleLoginChange}
            required
            InputProps={{
              startAdornment: <Email sx={{ mr: 1, color: "action.active" }} />,
            }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={loginData.password}
            onChange={handleLoginChange}
            required
            InputProps={{
              startAdornment: <Lock sx={{ mr: 1, color: "action.active" }} />,
            }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleLogin}
            disabled={loading || !loginData.email || !loginData.password}
            startIcon={
              loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <Login />
              )
            }
            sx={{ py: 1.5, fontSize: "1.1rem", mt: 1 }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </Box>

        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            New here?{" "}
            <MuiLink
              component="button"
              variant="body2"
              onClick={() => navigate("/register")}
              sx={{ fontWeight: "bold" }}
            >
              Create an account
            </MuiLink>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
