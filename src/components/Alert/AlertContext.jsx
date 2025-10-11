import React, { createContext, useContext, useState, useCallback } from "react";
import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiInfo } from "react-icons/fi";
import styles from "./Alert.module.scss";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback((message, type = "info", duration = 3000) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, duration);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && <Alert message={alert.message} type={alert.type} />}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);

const Alert = ({ message, type }) => {
  const getIcon = () => {
    switch (type) {
      case "success": return <FiCheckCircle className={styles.icon} />;
      case "error": return <FiXCircle className={styles.icon} />;
      case "warning": return <FiAlertTriangle className={styles.icon} />;
      case "info":
      default: return <FiInfo className={styles.icon} />;
    }
  };

  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      {getIcon()}
      <span>{message}</span>
    </div>
  );
};
