// client/src/components/mentorSignUp.jsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Input
} from '@mui/material';
import PasswordRequirementsBubble from './PasswordRequirementsBubble'; // Import your existing component

export default function MentorSignUp() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [linkedin, setLinkedin] = useState("");

  function validatePhone(phoneValue) {
    if (phoneValue.length !== 10) {
      setPhoneError("Invalid phone number, try again...");
      return false;
    } else {
      setPhoneError("");
      return true;
    }
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

  function handleImage(e) {
    setImage(e.target.files[0]);
  }

  function handleForm() {
    // Validate all fields before submission
    const isPhoneValid = validatePhone(phone);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (!isPhoneValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    // Check if all required fields are filled
    if (!firstName || !lastName || !email || !password || !yearsOfExperience || !technologies) {
      alert("Please fill in all required fields");
      return;
    }

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('phoneNumber', phone);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('generalDescription', description);
    formData.append('yearsOfExperience', yearsOfExperience);
    formData.append('technologies', technologies);
    formData.append('domains', technologies); // Assuming technologies includes domains
    formData.append('programmingLanguages', technologies); // Assuming technologies includes languages
    if (linkedin) formData.append('linkedinUrl', linkedin);
    if (image) formData.append('profilePhoto', image);

    fetch("http://localhost:5000/api/auth/register-mentor", {
      method: "POST",
      credentials: "include",
      body: formData, // Use FormData for file upload
    })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) {
          const msg =
            data?.error ||
            data?.message ||
            data?.errors?.[0]?.msg ||
            "Registration failed";
          throw new Error(msg);
        }
        return data;
      })
      .then((data) => {
        console.log("Mentor registered:", data);
        alert("Mentor registered successfully!");
      })
      .catch((err) => {
        console.error("Registration error:", err);
        alert(err.message);
      });
  }

  const isFormValid = !passwordError && !confirmPasswordError && !phoneError && 
                     firstName && lastName && email && password && confirmPassword && 
                     phone && yearsOfExperience && technologies;

  return (
    <Paper sx={{ 
      p: 4, 
      maxWidth: 400, 
      width: '100%', 
      borderRadius: 3,
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      margin: '2rem auto',
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
        />

        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          fullWidth
          variant="outlined"
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
        />

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          variant="outlined"
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
        />

        {/* Use your existing MUI Password Requirements Component */}
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
        />

        <TextField
          label="Years of Experience"
          type="number"
          value={yearsOfExperience}
          onChange={(e) => setYearsOfExperience(e.target.value)}
          required
          fullWidth
          variant="outlined"
          placeholder="Enter years of experience"
        />

        <TextField
          label="Technologies & Programming Languages"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          required
          fullWidth
          variant="outlined"
          placeholder="e.g., React, Node.js, Python, JavaScript"
          helperText="Separate multiple technologies with commas"
        />

        <TextField
          label="LinkedIn Profile URL"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          fullWidth
          variant="outlined"
          placeholder="https://linkedin.com/in/yourprofile"
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          placeholder="Tell us about your experience and expertise"
        />

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: '#475569', fontWeight: 600 }}>
            Profile Photo *
          </Typography>
          <Input
            type="file"
            onChange={handleImage}
            inputProps={{ accept: "image/*" }}
            fullWidth
          />
          {image && (
            <Typography variant="caption" sx={{ color: '#16a34a', mt: 1, display: 'block' }}>
              ✓ {image.name} selected
            </Typography>
          )}
        </Box>

        <Button
          onClick={handleForm}
          disabled={!isFormValid}
          fullWidth
          variant="contained"
          size="large"
          sx={{
            mt: 2,
            py: 1.5,
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            '&:hover': {
              background: 'linear-gradient(45deg, #5a6fd8, #6a4190)',
            },
            '&:disabled': {
              background: '#e0e0e0',
              color: '#9e9e9e'
            }
          }}
        >
          Create Mentor Account
        </Button>
      </Box>
    </Paper>
  );
}