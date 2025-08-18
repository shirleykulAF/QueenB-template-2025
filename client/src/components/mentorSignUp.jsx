// client/src/components/mentorSignUp.jsx
import React, { useState } from "react";
import "./Form.css";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";

export default function MentorSignUp() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Added missing password state
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [phoneError, setPhoneError] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState(""); // Added missing state
  const [linkedin, setLinkedin] = useState(""); // Added missing state
  
  // Added missing state for autocomplete arrays
  const [programmingLanguages, setProgrammingLanguages] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [domains, setDomains] = useState([]);

  const programmingLanguageSuggestions = [
    "JavaScript","Python","Java","C++","C#","TypeScript","Go","Rust","SQL","Swift","Kotlin","Scala","Ruby"
  ];
  const technologySuggestions = [
    "React","Node.js","Express","MongoDB","PostgreSQL","MySQL","Docker","Kubernetes","AWS","Azure","GCP","Redux","Next.js"
  ];
  const domainSuggestions = [
    "Web","Mobile","Data Science","Machine Learning","DevOps","Cloud","Cybersecurity","Backend","Frontend","Full Stack","E-commerce","EdTech"
  ];

  function validatePhone(value) {
    const ok = /^\d{10}$/.test(value);
    setPhoneError(ok ? "" : "Invalid phone number, use 10 digits.");
    return ok;
  }

  function handleImage(e) {
    setImage(e.target.files[0]);
  }

  // normalize LinkedIn so express-validator isURL passes (adds protocol if missing)
  function normalizeLinkedin(url) { 
    const v = (url || "").trim();
    if (!v) return "";
    return v.startsWith("http://") || v.startsWith("https://") ? v : `https://${v}`;
  }

  function handleForm() {
    // Client-side checks to match your server validators
    if (!firstName || !lastName || !email || !password || !phone) {
      alert("Please fill first name, last name, email, password, and phone.");
      return;
    }
    if (!validatePhone(phone)) return;
    if (!image) {
      alert("Please upload a profile photo.");
      return;
    }

    // ensure non-empty description because server requires it
    if (!String(description || "").trim()) { 
      alert("Please add a short general description."); 
      return; 
    }

    // ensure each list has at least one item (server requires non-empty)
    if (
      programmingLanguages.length === 0 ||  
      technologies.length === 0 ||           
      domains.length === 0                   
    ) {
      alert("Please add at least one Programming Language, Technology, and Domain.");
      return;  
    }

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

    // Join arrays as CSV strings (backend will split)
    fd.append("programmingLanguages", programmingLanguages.join(","));
    fd.append("technologies", technologies.join(","));
    fd.append("domains", domains.join(","));

    // File field name MUST match multer.single('profilePhoto') on server
    fd.append("profilePhoto", image);

    fetch("/api/auth/register-mentor", {
      method: "POST",
      body: fd,
      credentials: "include",
    })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) {
          const list = Array.isArray(data?.errors)
            ? data.errors.map((e) => `${e.param}: ${e.msg}`).join("\n")  
            : data?.error || data?.message || "Registration failed";
          throw new Error(list);
        }
        return data;
      })
      .then((data) => {
        console.log("Mentor registered:", data);
        alert("Mentor registered!");
        navigate("/profile/edit");  
      })
      .catch((err) => alert(err.message));
  }

  return (
    <div className="container">
      <div className="form-card">
        <form>
          <h2 className="title">Registration</h2>

          <label htmlFor="firstName" className="label">First Name</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input"
            placeholder="Enter your first name"
          />

          <label htmlFor="lastName" className="label">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input"
            placeholder="Enter your last name"
          />

          <label htmlFor="phone" className="label">Phone</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => { setPhone(e.target.value); validatePhone(e.target.value); }}
            className="input"
            placeholder="Enter your phone number"
          />
          {phoneError && <p className="error">{phoneError}</p>}

          <label htmlFor="email" className="label">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="Enter your email"
          />

          <label htmlFor="password" className="label">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Choose password"
          />

          <label htmlFor="description" className="label">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="textarea"
            placeholder="Tell us something about yourself"
          />

          <label htmlFor="yearsOfExperience" className="label">Years of Experience</label>
          <input
            id="yearsOfExperience"
            type="number"
            min="0"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            className="input"
            placeholder="Enter years of experience"
          />

          <label id="progLangs-label" className="label">Programming Languages</label>
          <Autocomplete
            multiple
            freeSolo
            options={programmingLanguageSuggestions}
            value={programmingLanguages}
            onChange={(e, newValue) => setProgrammingLanguages(newValue)}
            renderTags={(value) =>
              value.map((option, index) => (
                <Chip
                  label={option}
                  key={`${option}-${index}`}
                  onDelete={() => {
                    const updated = [...programmingLanguages];
                    updated.splice(index, 1);
                    setProgrammingLanguages(updated);
                  }}
                />
              ))
            }
            renderInput={(params) => (
              <div ref={params.InputProps.ref} className="autocomplete">
                {params.InputProps.startAdornment}
                <input
                  {...params.inputProps}
                  type="text"
                  className="autocomplete-input"
                  placeholder="Type and press Enter"
                  aria-labelledby="progLangs-label"
                />
              </div>
            )}
          />

          <label id="technologies-label" className="label">Technologies</label>
          <Autocomplete
            multiple
            freeSolo
            options={technologySuggestions}
            value={technologies}
            onChange={(e, newValue) => setTechnologies(newValue)}
            renderTags={(value) =>
              value.map((option, index) => (
                <Chip
                  label={option}
                  key={`${option}-${index}`}
                  onDelete={() => {
                    const updated = [...technologies];
                    updated.splice(index, 1);
                    setTechnologies(updated);
                  }}
                />
              ))
            }
            renderInput={(params) => (
              <div ref={params.InputProps.ref} className="autocomplete">
                {params.InputProps.startAdornment}
                <input
                  {...params.inputProps}
                  type="text"
                  className="autocomplete-input"
                  placeholder="e.g. React, Node.js, Docker"
                  aria-labelledby="technologies-label"
                />
              </div>
            )}
          />

          <label id="domains-label" className="label">Domains</label>
          <Autocomplete
            multiple
            freeSolo
            options={domainSuggestions}
            value={domains}
            onChange={(e, newValue) => setDomains(newValue)}
            renderTags={(value) =>
              value.map((option, index) => (
                <Chip
                  label={option}
                  key={`${option}-${index}`}
                  onDelete={() => {
                    const updated = [...domains];
                    updated.splice(index, 1);
                    setDomains(updated);
                  }}
                />
              ))
            }
            renderInput={(params) => (
              <div ref={params.InputProps.ref} className="autocomplete">
                {params.InputProps.startAdornment}
                <input
                  {...params.inputProps}
                  type="text"
                  className="autocomplete-input"
                  placeholder="e.g. Web, ML, DevOps"
                  aria-labelledby="domains-label"
                />
              </div>
            )}
          />

          <label htmlFor="linkedin" className="label">LinkedIn</label>
          <input
            id="linkedin"
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="input"
            placeholder="https://www.linkedin.com/in/username"
          />

          <label htmlFor="image" className="label">Image</label>
          <input 
            id="image" 
            type="file" 
            onChange={handleImage} 
            accept="image/*" 
          />

          <button type="button" className="button" onClick={handleForm}>
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}