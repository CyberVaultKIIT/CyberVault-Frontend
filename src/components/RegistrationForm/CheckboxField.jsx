import styles from './styles/registrationForm.module.scss'

const CheckboxField = ({ field, register }) => (
  <div className={styles.cyberformgroup}>
    <label>{field.label.toUpperCase()}</label>
    {field.options.map((option, index) => (
      <div key={index} className={styles.cybercheckboxgroup}>
        <label htmlFor={`${field.fieldName}-${index}`}>
          <input
            className={styles.cyberinput}
            type="checkbox"
            id={`${field.fieldName}-${index}`}
            {...register(`${field.fieldName}[${index}]`)}
            value={option}
          />
          {option}
        </label>
      </div>
    ))}
  </div>
)

export default CheckboxField
