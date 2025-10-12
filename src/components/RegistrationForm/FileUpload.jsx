// import React, { useState } from "react";
// import styles from './styles/registrationForm.module.scss'

// const FileUpload = ({ field,register,error }) => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//     // if (onFileChange) {
//     //   onFileChange(file);
//     // }
//   };

//     return (
//         <div className={styles.cyberformgroup}>
//         <label htmlFor={field.fieldName} className="cyber-label">
//           {field.label.toUpperCase()}
//         </label>
//     <div className={styles.fileUploadContainer}>
//       <label htmlFor={field.fieldName} className={styles.fileLabel}>
//         {selectedFile ? selectedFile.name : "Choose a file"}
//       </label>
//       <input
//         type="file"
//         className={styles.fileInput}
//         id={field.fieldName}
//         onChange={handleFileChange}
//       />
//             </div>
//             </div>
//   );
// };

// export default FileUpload;

import React, { useState,useRef } from "react";
import styles from "./styles/FileUpload.module.scss";
import FileUploadIcon from "../../assets/images/fileUpload.png";

const FileUpload = ({ field, register, error }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      simulateUpload();
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 300);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={styles.cyberformgroup}>
      <label htmlFor={field.fieldName} className={styles.gradientText}>
        {field.label.toUpperCase()}
      </label>
      <div className={styles.uploadContainer}>
        <div
          className={styles.dropArea}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className={styles.icon}>
            <img src={FileUploadIcon} alt="FileUploadIcon" />
          </div>
          <p>
            Drag and drop file here or <span>Choose file</span>
          </p>
          <input
            type="file"
            name="image"
            className={styles.fileInput}
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </div>

        {file && (
          <div className={styles.fileDetails}>
            <div className={styles.fileName}>{file.name}</div>
            <div className={styles.progressBar}>
              <div
                className={styles.progress}
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <button className={styles.removeButton} onClick={handleRemoveFile}>
              ✕
            </button>
          </div>
        )}

        <button
          className={styles.cybersubmitbutton}
          disabled={!file || uploadProgress < 100}
          // onClick={handleFileChange}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
