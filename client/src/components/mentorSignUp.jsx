// client/src/components/mentorSignUp.jsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Input,
  Snackbar,
  Alert
} from '@mui/material';
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import PasswordRequirementsBubble from './PasswordRequirementsBubble';

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
  const [linkedin, setLinkedin] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for MUI autocomplete arrays (from HEAD)
  const [programmingLanguages, setProgrammingLanguages] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [domains, setDomains] = useState([]);

  // Suggestions arrays (from HEAD)
  const programmingLanguageSuggestions = [
    "JavaScript","Python","Java","C++","C#","TypeScript","Go","Rust","SQL","Swift","Kotlin","Scala","Ruby"
  ];
  const technologySuggestions = [
    "React","Node.js","Express","MongoDB","PostgreSQL","MySQL","Docker","Kubernetes","AWS","Azure","GCP","Redux","Next.js"
  ];
  const domainSuggestions = [
    "Web","Mobile","Data Science","Machine Learning","DevOps","Cloud","Cybersecurity","Backend","Frontend","Full Stack","E-commerce","EdTech"
  ];

  // Phone validation (improved from admin-strongPassword)
  function validatePhone(phoneValue) {
    const ok = /^\d{10}$/.test(phoneValue);
    setPhoneError(ok ? "" : "Invalid phone number, use 10 digits.");
    return ok;
  }

  // Strong password validation (from admin-strongPassword)
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

  // Validate password confirmation (from admin-strongPassword)
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

  // normalize LinkedIn (from HEAD)
  function normalizeLinkedin(url) { 
    const v = (url || "").trim();
    if (!v) return "";
    return v.startsWith("http://") || v.startsWith("https://") ? v : `https://${v}`;
  }

  async function handleForm() {
    // Validate all fields before submission
    const isPhoneValid = validatePhone(phone);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (!isPhoneValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    // Client-side checks (from HEAD with improvements)
    if (!firstName || !lastName || !email || !password || !phone) {
      alert("Please fill first name, last name, email, password, and phone.");
      return;
    }

    if (!image) {
      alert("Please upload a profile photo.");
      return;
    }

    // ensure non-empty description
    if (!String(description || "").trim()) { 
      alert("Please add a short general description."); 
      return; 
    }

    // ensure each list has at least one item (from HEAD)
    if (
      programmingLanguages.length === 0 ||  
      technologies.length === 0 ||           
      domains.length === 0                   
    ) {
      alert("Please add at least one Programming Language, Technology, and Domain.");
      return;  
    }

    setIsSubmitting(true);

    // yearsOfExperience must be an integer string
    const yoe = String(parseInt(yearsOfExperience || "0", 10));

    const fd = new FormData();
    fd.append("email", email.trim());
    fd.append("password", password);
    fd.append("firstName", firstName.trim());
    fd.append("lastName", lastName.trim());
    fd.append("phoneNumber", phone.trim());
    fd.append("yearsOfExperience", yoe);
    fd.append("generalDescription", String(description).trim());

    // only append linkedinUrl if provided; add protocol if missing
    const linked = normalizeLinkedin(linkedin);
    if (linked) fd.append("linkedinUrl", linked);

    // Join arrays as CSV strings (from HEAD)
    fd.append("programmingLanguages", programmingLanguages.join(","));
    fd.append("technologies", technologies.join(","));
    fd.append("domains", domains.join(","));

    // File field name MUST match multer.single('profilePhoto') on server
    fd.append("profilePhoto", image);

    try {
      const response = await fetch("/api/auth/register-mentor", {
        method: "POST",
        body: fd,
        credentials: "include",
      });

      const data = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        const list = Array.isArray(data?.errors)
          ? data.errors.map((e) => `${e.param}: ${e.msg}`).join("\n")  
          : data?.error || data?.message || "Registration failed";
        throw new Error(list);
      }

      console.log("Mentor registered:", data);
      
      // Show success message (from admin-strongPassword approach)
      setShowSuccess(true);
      
      // Navigate after success (from HEAD)
      setTimeout(() => {
        navigate("/profile/edit");
      }, 2000);

    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Enhanced form validation
  const isFormValid = !passwordError && !confirmPasswordError && !phoneError && 
                     firstName && lastName && email && password && confirmPassword && 
                     phone && yearsOfExperience && programmingLanguages.length > 0 &&
                     technologies.length > 0 && domains.length > 0 && image;

  return (
    <>
      <Paper sx={{ 
        p: 4, 
        maxWidth: 500, // Increased width for better autocomplete display
        width: '100%', 
        borderRadius: 3,
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        margin: '2rem auto',
        backgroundColor: '#ffffff'
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 2, fontWeight: 'bold' }}>
            Mentor Registration
          </Typography>

          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            fullWidth
            variant="outlined"
            disabled={isSubmitting}
            placeholder="Enter your first name"
          />

          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            fullWidth
            variant="outlined"
            disabled={isSubmitting}
            placeholder="Enter your last name"
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
            placeholder="Enter your phone number"
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
            placeholder="Enter your email"
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
            placeholder="Choose a strong password"
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
            placeholder="Confirm your password"
          />

          <TextField
            label="Years of Experience"
            type="number"
            min="0"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            required
            fullWidth
            variant="outlined"
            disabled={isSubmitting}
            placeholder="Enter years of experience"
          />

          {/* Programming Languages Autocomplete (from HEAD) */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, color: '#475569', fontWeight: 600 }}>
              Programming Languages *
            </Typography>
            <Autocomplete
              multiple
              freeSolo
              options={programmingLanguageSuggestions}
              value={programmingLanguages}
              onChange={(e, newValue) => setProgrammingLanguages(newValue)}
              disabled={isSubmitting}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="filled"
                    color="primary"
                    label={option}
                    {...getTagProps({ index })}
                    key={index}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="e.g., JavaScript, Python, Go..."
                  helperText="Type and press Enter to add custom languages"
                />
              )}
            />
          </Box>

          {/* Technologies Autocomplete (from HEAD) */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, color: '#475569', fontWeight: 600 }}>
              Technologies *
            </Typography>
            <Autocomplete
              multiple
              freeSolo
              options={technologySuggestions}
              value={technologies}
              onChange={(e, newValue) => setTechnologies(newValue)}
              disabled={isSubmitting}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="filled"
                    color="warning"
                    label={option}
                    {...getTagProps({ index })}
                    key={index}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="e.g. React, Node.js, Docker..."
                  helperText="Type and press Enter to add custom technologies"
                />
              )}
            />
          </Box>

          {/* Domains Autocomplete (from HEAD) */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, color: '#475569', fontWeight: 600 }}>
              Domains *
            </Typography>
            <Autocomplete
              multiple
              freeSolo
              options={domainSuggestions}
              value={domains}
              onChange={(e, newValue) => setDomains(newValue)}
              disabled={isSubmitting}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="filled"
                    color="info"
                    label={option}
                    {...getTagProps({ index })}
                    key={index}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="e.g. Web Development, Machine Learning..."
                  helperText="Type and press Enter to add custom domains"
                />
              )}
            />
          </Box>

          <TextField
            label="LinkedIn Profile URL"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            fullWidth
            variant="outlined"
            disabled={isSubmitting}
            placeholder="https://www.linkedin.com/in/username"
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            disabled={isSubmitting}
            placeholder="Tell us about your experience and expertise"
            required
          />

          {/* File Upload (improved from admin-strongPassword) */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, color: '#475569', fontWeight: 600 }}>
              Profile Photo *
            </Typography>
            <Input
              type="file"
              onChange={handleImage}
              inputProps={{ accept: "image/*" }}
              fullWidth
              disabled={isSubmitting}
            />
            {image && (
              <Typography variant="caption" sx={{ color: '#16a34a', mt: 1, display: 'block' }}>
                ✓ {image.name} selected
              </Typography>
            )}
          </Box>

          <Button
            onClick={handleForm}
            disabled={!isFormValid || isSubmitting}
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
            {isSubmitting ? 'Creating Mentor Account...' : 'Create Mentor Account'}
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
          Welcome to QueenB Mentors! Account created successfully! Redirecting to profile...
        </Alert>
      </Snackbar>
    </>
  );
}