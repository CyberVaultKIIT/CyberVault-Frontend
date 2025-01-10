import styles from './styles/registrationForm.module.scss'

const SelectField = ({ field, register, errors }) => (
  <div className={styles.cyberformgroup}>
    <label htmlFor={field.fieldName}>{field.label.toUpperCase()}</label>
    <select
      className={styles.cyberselect}
      id={field.fieldName}
      {...register(field.fieldName, {
        required: field.required && `${field.label} is required`,
      })}
    >
      {field.options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
    {errors[field.fieldName] && (
      <p className={styles.cybererror}>{errors[field.fieldName]?.message}</p>
    )}
  </div>
)

export default SelectField
