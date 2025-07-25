import React from "react";
import styles from "../styles/SignUp.module.scss";
import { useForm } from "react-hook-form";
import robotImage from "../../assets/images/robotNew.png";
import google from "../../assets/images/google.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useAlert } from "../../components/Alert/AlertContext";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm();

  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const password = watch("password");

  const validateConfirmPassword = (value) => {
    if (value !== password) {
      showAlert("Passwords do not match", "warning");
      return false;
    }
    return true;
  };

  const handleValidation = async () => {
    const isValid = await trigger();
    if (!isValid) {
      if (errors.name) showAlert(errors.name.message, "warning");
      else if (errors.email) showAlert(errors.email.message, "warning");
      else if (errors.phoneNumber) showAlert(errors.phoneNumber.message, "warning");
      else if (errors.password) showAlert(errors.password.message, "warning");
      else if (errors.confirmPassword) showAlert("Passwords do not match", "warning");
    }
  };

  const onSubmit = async (formData) => {
    const email = formData.email;
    const roll = email.split("@")[0];

    const userPayload = {
      ...formData,
      roll,
      userId: `${Date.now()}_${roll}`,
      branch: "",
      batch: "",
    };

    try {
      const res = await api.post("/api/auth/register", userPayload);

      if (res.data.token) {
        localStorage.setItem("userData", JSON.stringify(res.data.data));
        localStorage.setItem("token", res.data.token);
      }

      showAlert("User registered successfully! Redirecting to login...", "success");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      showAlert(
        error.response?.data?.message || "Registration failed. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signinImage}>
        <img src={robotImage} alt="CyberVault Robot" width={550} />
      </div>

      <div className={styles.signinFormContainer}>
        <h2 className={styles.cyberTitle}>GET STARTED</h2>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.cyberForm}>
          <div className={styles.cyberFormGroup}>
            <label htmlFor="nameField" className="cyber-label">FULL NAME</label>
            <input
              type="text"
              id="nameField"
              className={styles.cyberInput}
              placeholder="Enter your full name"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
              })}
            />
          </div>

          <div className={styles.cyberFormGroup}>
            <label htmlFor="emailField" className="cyber-label">EMAIL</label>
            <input
              type="email"
              id="emailField"
              className={styles.cyberInput}
              placeholder="Enter your KIIT email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@(kiit\.ac\.in|gmail\.com)$/,
                  message: "Only KIIT or Gmail emails allowed",
                },
              })}
            />
          </div>

          <div className={styles.cyberFormGroup}>
            <label htmlFor="phoneField" className="cyber-label">PHONE NUMBER</label>
            <input
              type="tel"
              id="phoneField"
              className={styles.cyberInput}
              placeholder="Enter your phone number"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              })}
            />
          </div>

          <div className={styles.cyberFormGroup}>
            <label htmlFor="passwordField" className="cyber-label">CREATE PASSWORD</label>
            <input
              type="password"
              id="passwordField"
              className={styles.cyberInput}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
                maxLength: { value: 15, message: "Max 15 characters" },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/,
                  message: "Include letter, number & special character",
                },
              })}
            />
          </div>

          <div className={styles.cyberFormGroup}>
            <label htmlFor="confirmPasswordField" className="cyber-label">CONFIRM PASSWORD</label>
            <input
              type="password"
              id="confirmPasswordField"
              className={styles.cyberInput}
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: validateConfirmPassword,
              })}
            />
          </div>

          <span className={styles.googleButtonContainer}>
            <button
              type="button"
              className={styles.googleButton}
              onClick={() => { }}
            >
              SIGN UP WITH 
              <img src={google} alt="google" height={25} width={25} />
            </button>
          </span>

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.cyberSubmitButton} onClick={handleValidation}>
              SIGN UP
            </button>
            <button type="button" className={styles.cyberSignupButton} onClick={() => navigate("/")}>
              LOGIN
            </button>
          </div>
        </form>

        <p className={styles.registerText}>Already registered?</p>
        <Link className={styles.registerLink} to="/signup">Join us!</Link>
      </div>
    </div>
  );
};

export default SignUp;
