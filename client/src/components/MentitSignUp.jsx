import React, { useState } from "react";
import "./Form.css";

export default function MentitSignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [phoneError, setPhoneError] = useState(" ");

  function validatePhone(phone) {
    if (phone.length < 10 || phone.length > 10) {
      setPhoneError("Invalid phone number, try again...");
    }
    setPhoneError("");
  }

  function handleForm() {
    //
  }

  return (
    <div className="container">
      <div className="form-card">
        <form>
          <h2 className="title">Registration</h2>
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

          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
          <button
            type="button"
            className="button"
            onClick={handleForm}>
            Confirm
            </button>
        </form>
      </div>
    </div>
  );
}
