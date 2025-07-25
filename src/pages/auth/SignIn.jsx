import React from "react";
import styles from "../styles/SignIn.module.scss";
import { useForm } from "react-hook-form";
import robotImage from "../../assets/images/robotNew.png";
import google from "../../assets/images/google.png";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { useAlert } from "../../components/Alert/AlertContext";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/api/auth/login", data);

      localStorage.setItem("userData", JSON.stringify(response.data.data));
      localStorage.setItem("token", response.data.token);

      showAlert("Login successful! Redirecting...", "success");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      const message =
        error.response?.data?.message || "An error occurred. Please try again.";
      showAlert(message, "error");
    }
  };

  const handleSignup = () => navigate("/signup");

  return (
    <div className={styles.signinContainer}>
      <div className={styles.signinImage}>
        <img src={robotImage} alt="CyberVault Robot" width={550} />
      </div>

      <div className={styles.signinFormContainer}>
        <h2 className={styles.cyberTitle}>WELCOME BACK</h2>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.cyberForm}>
          <div className={styles.cyberFormGroup}>
            <label htmlFor="emailField" className="cyber-label">EMAIL</label>
            <input
              type="email"
              id="emailField"
              className={styles.cyberInput}
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className={styles.cyberError}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.cyberFormGroup}>
            <label htmlFor="passwordField" className="cyber-label">PASSWORD</label>
            <input
              type="password"
              id="passwordField"
              className={styles.cyberInput}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className={styles.cyberError}>{errors.password.message}</p>
            )}
          </div>
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
