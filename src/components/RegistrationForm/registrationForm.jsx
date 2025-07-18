import React, { useState } from "react";
import { useForm } from "react-hook-form";
import formData from "../../data/test/form.json";
import TextField from "./TextField";
import SelectField from "./SelectField";
import CheckboxField from "./CheckboxField";
import FileUpload from "./FileUpload";
import IncrementDecrementField from "./Increment-Decrement";
import styles from "./styles/registrationForm.module.scss";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [currentStep, setCurrentStep] = useState(0);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    reset();
  };

  const currentSection = formData.sections[currentStep];
  const isRequiredSection = formData.requiredSection.includes(
    currentSection.sectionTitle
  );

  const watchSectionFields = currentSection.fields.map((field) =>
    watch(field.fieldName)
  );

  const isSectionFilled = watchSectionFields.some(
    (value) =>
      value &&
      (typeof value === "string" ? value.trim().length > 0 : value.length > 0)
  );

  const handleFieldChange = (fieldName, value) => {
    if (!isRequiredSection && !value?.trim()) {
      // console.log("Clearing errors for", fieldName);

      clearErrors();
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();

    const fieldsToValidate =
      isSectionFilled || isRequiredSection
        ? currentSection.fields.map((field) => field.fieldName)
        : [];

    if (!isRequiredSection && !isSectionFilled) {
      currentSection.fields.forEach((field) => {
        // console.log("Meow")
        clearErrors();
      });
      setCurrentStep((prev) => prev + 1);
      return;
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      if (currentStep < formData.sections.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleFormSubmit = (e) => {
    if (currentStep !== formData.sections.length - 1) {
      e.preventDefault();
      return;
    }
    handleSubmit(onSubmit)(e);
  };

  const triggerGrid = currentSection.fields.length > 7;

  return (
    <form className={styles.cybercontainer} onSubmit={handleFormSubmit}>
      <h1 className={styles.cybertitle}>{formData.infoObject.formTitle}</h1>
      <p className={styles.cybersubtitle}>{formData.infoObject.description}</p>

      <div>
        <h2 className={styles.cybertitle}>{currentSection.sectionTitle}</h2>
        <div className={triggerGrid ? styles.formContainer : ""}>
          {currentSection.fields.map((field) => {
            switch (field.type) {
              case "text":
                return (
                  <TextField
                    key={`${currentStep}-${field.fieldName}`}
                    field={field}
                    register={register}
                    errors={errors}
                    onChange={(e) =>
                      handleFieldChange(field.fieldName, e.target.value)
                    }
                  />
                );
              case "select":
                return (
                  <SelectField
                    key={`${currentStep}-${field.fieldName}`}
                    field={field}
                    register={register}
                    errors={errors}
                    onChange={(e) =>
                      handleFieldChange(field.fieldName, e.target.value)
                    }
                  />
                );
              case "fileUpload":
                return (
                  <FileUpload
                    key={`${currentStep}-${field.fieldName}`}
                    field={field}
                    register={register}
                    errors={errors}
                    onChange={(e) =>
                      handleFieldChange(field.fieldName, e.target.value)
                    }
                  />
                );
              case "checkbox":
                return (
                  <CheckboxField
                    key={`${currentStep}-${field.fieldName}`}
                    field={field}
                    register={register}
                    errors={errors}
                  />
                );
              case "increment-decrement":
                return (
                  <IncrementDecrementField
                    key={`${currentStep}-${field.fieldName}`}
                    field={field}
                    register={register}
                    errors={errors}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
      <div>
        {currentStep > 0 && (
          <button
            type="button"
            className={styles.cybersubmitbutton}
            onClick={handlePrevious}
          >
            Previous
          </button>
        )}
        {currentStep < formData.sections.length - 1 ? (
          <button
            type="button"
            className={styles.cybersubmitbutton}
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button type="submit" className={styles.cybersubmitbutton}>
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default RegistrationForm;
