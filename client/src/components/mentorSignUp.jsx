import React, { useState } from "react";
import "./Form.css";

export default function MentorSignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [phoneError, setPhoneError] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [linkedin, setLinkedin] = useState("");

  function validatePhone(phoneValue) {
    if (phoneValue.length !== 10) {
      setPhoneError("Invalid phone number, try again...");
    } else {
      setPhoneError("");
    }
  }

  function handleImage(e) {
    setImage(e.target.files[0]);
  }

  function handleForm() {
    // Handle form submission logic here
    console.log({
      firstName,
      lastName,
      phone,
      email,
      description,
      yearsOfExperience,
      technologies,
      linkedin,
      image,
    });
  }

  return (
    <>
      <div className="container">
        <div className="form-card">
          <form>
            <label htmlFor="firstName" className="label">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              className="input"
            />

            <label htmlFor="lastName" className="label">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className="input"
            />

            <label htmlFor="phone" className="label">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                validatePhone(e.target.value);
              }}
              placeholder="Enter your phone number"
              className="input"
            />
            {phoneError && <span className="error">{phoneError}</span>}

            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input"
            />

            <label htmlFor="description" className="label">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us something about yourself"
              rows={5}
              className="textarea"
            />

            <label htmlFor="yearsOfExperience" className="label">
              Years of experience
            </label>
            <input
              id="yearsOfExperience"
              type="text"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              placeholder="Enter years of experience"
              className="input"
            />

            <label htmlFor="technologies" className="label">
              Technologies
            </label>
            <input
              id="technologies"
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="Enter technologies"
              className="input"
            />

            <label htmlFor="linkedin" className="label">
              LinkedIn
            </label>
            <input
              id="linkedin"
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="LinkedIn profile URL"
              className="input"
            />

            <label htmlFor="image" className="label">
              Image
            </label>
            <input type="file" onChange={handleImage} />

            <button type="button" className="button" onClick={handleForm}>
              Confirm
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
