import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import "./RegistrationForm.scss";
import { BACKEND_URL } from "../config";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    rollNumber: "",
    kiitEmail: "",
    personalEmail: "",
    gender: "",
    mobileNumber: "",
    whatsappNumber: "",
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/submit-registration`, formData);

      console.log("API Response:", response.data);
      setSubmissionResponse(response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className={`cyber-container flex justify-center  ${isLoaded ? "loaded" : ""}`}>
        <main className="cyber-main">
          <h1 className="cyber-title">REGISTRATION FORM</h1>
          <p className="cyber-subtitle">Securing the future, One Byte at a time.</p>
          <form onSubmit={handleSubmit} className="cyber-form">
            <div className="cyber-form-group">
              <label htmlFor="rollNumber">ROLL NUMBER</label>
              <input
                type="text"
                id="rollNumber"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                placeholder="Enter your roll number"
                required
                className="cyber-input"
              />
            </div>

            <div className="cyber-form-group">
              <label htmlFor="kiitEmail">KIIT EMAIL ID</label>
              <input
                type="email"
                id="kiitEmail"
                name="kiitEmail"
                value={formData.kiitEmail}
                onChange={handleChange}
                placeholder="Enter your KIIT email"
                required
                className="cyber-input"
              />
            </div>

            <div className="cyber-form-group">
              <label htmlFor="personalEmail">PERSONAL EMAIL ID</label>
              <input
                type="email"
                id="personalEmail"
                name="personalEmail"
                value={formData.personalEmail}
                onChange={handleChange}
                placeholder="Enter your personal email"
                required
                className="cyber-input"
              />
            </div>

            <div className="cyber-form-group">
              <label htmlFor="gender">GENDER</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="cyber-select"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="cyber-form-group">
              <label htmlFor="mobileNumber">MOBILE NUMBER</label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                required
                className="cyber-input"
              />
            </div>

            <div className="cyber-form-group">
              <label htmlFor="whatsappNumber">WHATSAPP NUMBER</label>
              <input
                type="tel"
                id="whatsappNumber"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="Enter your WhatsApp number"
                required
                className="cyber-input"
              />
            </div>
            <button type="submit" className="cyber-submit-button">
              <span className="cyber-button-text">SUBMIT</span>
              <span className="cyber-button-glitch"></span>
            </button>
          </form>
        </main>
    </div>

  );
};

export default RegistrationForm;