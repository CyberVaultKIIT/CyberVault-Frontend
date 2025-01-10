import React from "react";
import styles from './styles/registrationForm.module.scss';

const getValidationRules = (field) => {
  const rules = {};

  if (field.validation?.minLength && field.type !== "email") {
    rules.minLength = {
      value: field.validation.minLength,
      message: `${field.label} must be at least ${field.validation.minLength} characters.`,
    };
  }

  if (field.validation?.maxLength) {
    rules.maxLength = {
      value: field.validation.maxLength,
      message: `${field.label} cannot exceed ${field.validation.maxLength} characters.`,
    };
  }

  if (field.validation?.pattern) {
    rules.pattern = {
      value: new RegExp(field.validation.pattern),
      message: field.validation.feedback || `Invalid ${field.label}`,
    };
  }

  return rules;
};

function TextField({ field, register, errors, onChange }) {
  return (
    <div className={styles.cyberformgroup}>
      <label htmlFor={field.fieldName} className="cyber-label">
        {field.label.toUpperCase()}
      </label>
      <input
        className={styles.cyberinput}
        type="text"
        id={field.fieldName}
        placeholder={field.placeholder}
        {...register(field.fieldName, {
          required: field.required && `${field.label} is required`,
          ...getValidationRules(field),
          onChange: (e) => {
            if (onChange) {
              onChange(e); 
            }
          },
        })}
      />
      {errors[field.fieldName] && (
        <p className={styles.cybererror}>
          {errors[field.fieldName]?.message}
        </p>
      )}
    </div>
  );
}


export default TextField;
