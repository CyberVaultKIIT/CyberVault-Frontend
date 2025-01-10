import React, { useState } from 'react';
import styles from './styles/registrationForm.module.scss';

const IncrementDecrementField = ({ field, register, errors }) => {
  const [value, setValue] = useState(field.validation?.min || 0);

  const handleIncrement = () => {
    if (value < field.validation?.max) {
      setValue(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (value > field.validation?.min) {
      setValue(prev => prev - 1);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = parseInt(e.target.value, 10);
    if (!isNaN(inputValue)) {
      setValue(inputValue);
    }
  };

  return (
    <div className={styles.cyberformgroup}>
      <label htmlFor={field.fieldName}>{field.label.toUpperCase()}</label>
      <div className={styles.incrementDecrementWrapper}>
        <button
          type="button"
          onClick={handleDecrement}
          className={styles.decrementButton}
          disabled={value <= field.validation?.min}
        >
          -
        </button>
        <input
          className={styles.cyberIncrementDecrementInput}
          type="number"
          id={field.fieldName}
          value={value}
          onChange={handleInputChange}
          {...register(field.fieldName, {
            required: field.required && `${field.label} is required`,
            min: {
              value: field.validation?.min,
              message: `Minimum value is ${field.validation?.min}`,
            },
            max: {
              value: field.validation?.max,
              message: `Maximum value is ${field.validation?.max}`,
            },
          })}
        />
        <button
          type="button"
          onClick={handleIncrement}
          className={styles.incrementButton}
          disabled={value >= field.validation?.max}
        >
          +
        </button>
      </div>
      {errors[field.fieldName] && (
        <p className={styles.cybererror}>{errors[field.fieldName]?.message}</p>
      )}
    </div>
  );
};

export default IncrementDecrementField;
