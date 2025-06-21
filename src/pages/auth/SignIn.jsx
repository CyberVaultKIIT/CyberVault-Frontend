import { useState } from "react";
import styles from "../styles/SignIn.module.scss";
import { useForm } from "react-hook-form";
import robotImage from "../../assets/images/robotNew.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../services/api";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setServerError("");
    setSuccessMessage("");
    try {
      const response = await api.post("/api/auth/login", data);
      // Save user data and token in localStorage
      localStorage.setItem("userData", JSON.stringify(response.data.data));
      localStorage.setItem("token", response.data.token);
      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setServerError(error.response.data.message);
      } else {
        setServerError("An error occurred. Please try again.");
      }
    }
  };

  const handleSignup = () => navigate("/signup");

  return (
    <div className={styles.signinContainer}>
      <div className={styles.signinImage}>
        <img src={robotImage} alt="CyerVault Robot Image" width={550} />
      </div>
      <div className={styles.signinFormContainer}>
        <h2 className={styles.cyberTitle}>WELCOME BACK</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.cyberForm}>
          <div className={styles.cyberFormGroup}>
            <label htmlFor="emailField" className="cyber-label">
              EMAIL
            </label>
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
            {errors.email && (
              <p className={styles.cyberError}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.cyberFormGroup}>
            <label htmlFor="passwordField" className="cyber-label">
              PASSWORD
            </label>
            <input
              type="password"
              id="passwordField"
              className={styles.cyberInput}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className={styles.cyberError}>{errors.password.message}</p>
            )}
          </div>
          {serverError && (
            <p className={styles.cyberError}>{serverError}</p>
          )}
          {successMessage && (
            <p className={styles.cyberSuccess}>{successMessage}</p>
          )}
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.cyberSubmitButton}>
              LOG IN
            </button>

            <button
              type="button"
              className={styles.cyberSignupButton}
              onClick={handleSignup}
            >
              REGISTER
            </button>
          </div>
        </form>
        <p className={styles.registerText}>Not signed up yet?</p>

        <Link className={styles.registerLink} to="/signup"> 
          Join us!
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
