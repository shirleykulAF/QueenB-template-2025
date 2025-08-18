import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import {
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import PasswordRequirementsBubble from './PasswordRequirementsBubble'; // Import your existing component

export default function MenteeSignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Added confirm password
  const [description, setDescription] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validatePhone(phone) {
    if (phone.length < 10 || phone.length > 10) {
      setPhoneError("Invalid phone number, try again...");
      return false;
    }
    setPhoneError("");
    return true;
  }

  // Strong password validation
  function validatePassword(password) {
    const requirements = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    if (!requirements.minLength) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }
    if (!requirements.hasUpperCase) {
      setPasswordError("Password must contain at least one uppercase letter");
      return false;
    }
    if (!requirements.hasLowerCase) {
      setPasswordError("Password must contain at least one lowercase letter");
      return false;
    }
    if (!requirements.hasNumber) {
      setPasswordError("Password must contain at least one number");
      return false;
    }
    if (!requirements.hasSpecialChar) {
      setPasswordError("Password must contain at least one special character");
      return false;
    }

    setPasswordError("");
    return true;
  }

  // Validate password confirmation
  function validateConfirmPassword(confirmPass) {
    if (confirmPass !== password) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  }

  async function handleForm() {
    // Validate all fields before submission
    const isPhoneValid = validatePhone(phone);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (!isPhoneValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    // Check if all required fields are filled
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber: phone,
      generalDescription: description || "",
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/register-mentee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        const msg =
          data?.error ||
          data?.message ||
          data?.errors?.[0]?.msg ||
          "Registration failed";
        throw new Error(msg);
      }

      console.log("Mentee registered:", data);
      
      // Show success message
      setShowSuccess(true);
      
      // Navigate to home after 2 seconds
      setTimeout(() => {
        navigate("/mentors");
      }, 2000);

    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const isFormValid = !passwordError && !confirmPasswordError && !phoneError && 
                     firstName && lastName && email && password && confirmPassword && phone;

  return (
    <>
      <Paper sx={{ 
        p: 4, 
        maxWidth: 500, 
        width: '100%', 
        borderRadius: 3,
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        margin: '0 auto', // Centers horizontally
        mt: 4, // Margin top for spacing from top
        backgroundColor: '#ffffff'
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            fullWidth
            variant="outlined"
            disabled={isSubmitting}
          />

          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            fullWidth
            variant="outlined"
            disabled={isSubmitting}
          />

          <TextField
            label="Phone"
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              validatePhone(e.target.value);
            }}
            required
            fullWidth
            variant="outlined"
            error={!!phoneError}
            helperText={phoneError}
            disabled={isSubmitting}
          />

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            variant="outlined"
            disabled={isSubmitting}
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            required
            fullWidth
            variant="outlined"
            error={!!passwordError}
            helperText={passwordError}
            disabled={isSubmitting}
          />

          <PasswordRequirementsBubble password={password} />

          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validateConfirmPassword(e.target.value);
            }}
            required
            fullWidth
            variant="outlined"
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
            disabled={isSubmitting}
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            placeholder="Tell us something about yourself"
            disabled={isSubmitting}
          />

          <Button
            onClick={handleForm}
            disabled={!isFormValid || isSubmitting}
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              py: 1.5,
              background: 'linear-gradient(45deg, #f43f5e, #f1a8b5ff)',
              '&:hover': {
                background: 'linear-gradient(45deg, #f43f5e, #f1a8b5ff)',
              },
              '&:disabled': {
                background: '#e0e0e0',
                color: '#9e9e9e'
              }
            }}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
        </Box>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success" 
          variant="filled"
          icon={<CheckCircleIcon />}
          sx={{ width: '100%' }}
        >
          Welcome to QueenB! Account created successfully! Redirecting to home...
        </Alert>
      </Snackbar>
    </>
  );
}