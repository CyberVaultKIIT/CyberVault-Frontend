import React, { useState } from 'react';
import './AddMember.module.scss'; // Assuming you have styles in this file
import { useForm } from 'react-hook-form';
import styles from './AddMember.module.scss';
import defaultProfile from '../../../src/assets/images/profile.svg';
import TextField from '../../components/RegistrationForm/TextField';
import { memberService } from '../../services/memberService';

import { FiGithub } from 'react-icons/fi';
import { FaLinkedinIn, FaXTwitter, FaPaperclip } from 'react-icons/fa6';

function AddMember() {
  // React Hook Form initialization
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [selectedImage, setSelectedImage] = useState(defaultProfile);
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Handle image selection & preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }
      
      // Store the file for upload
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submit
  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      // Additional validation for social media URLs
      const socialValidation = validateSocialUrls(data);
      if (!socialValidation.isValid) {
        alert(socialValidation.message);
        setSubmitting(false);
        return;
      }

      let result;
      
      if (imageFile) {
        // Use file upload method
        result = await memberService.createMember(data, imageFile);
      } else if (selectedImage !== defaultProfile) {
        // Use base64 method (for compatibility)
        const payload = {
          ...data,
          profileImage: selectedImage,
        };
        result = await memberService.createMemberWithBase64(payload);
      } else {
        // No image
        result = await memberService.createMember(data);
      }
      
      if (result.success) {
        alert(result.message);
        reset();
        setSelectedImage(defaultProfile);
        setImageFile(null);
      } else {
        // Handle specific error cases
        const errorMsg = result.error.message;
        if (result.error.status === 409) {
          alert('A member with this email already exists. Please use a different email.');
        } else if (result.error.status === 400) {
          alert(`Validation Error: ${errorMsg}`);
        } else if (result.error.status === 'NETWORK_ERROR') {
          alert('Network Error: Unable to connect to server. Please check your internet connection.');
        } else {
          alert(`Error: ${errorMsg}`);
        }
        console.error('Error details:', result.error);
      }
    } catch (error) {
      console.error('Unexpected error adding member:', error);
      alert('An unexpected error occurred. Please try again.');
    }
    setSubmitting(false);
  };

  // Helper function to validate social media URLs
  const validateSocialUrls = (data) => {
    const { github, linkedin, twitter } = data;
    
    if (!github || !linkedin || !twitter) {
      return {
        isValid: false,
        message: 'All social media URLs (GitHub, LinkedIn, Twitter) are required!'
      };
    }

    // Validate GitHub URL
    if (!github.match(/^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/)) {
      return {
        isValid: false,
        message: 'Please enter a valid GitHub URL (e.g., https://github.com/username)'
      };
    }

    // Validate LinkedIn URL
    if (!linkedin.match(/^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/)) {
      return {
        isValid: false,
        message: 'Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/username)'
      };
    }

    // Validate Twitter URL
    if (!twitter.match(/^https:\/\/(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/?$/)) {
      return {
        isValid: false,
        message: 'Please enter a valid Twitter/X URL (e.g., https://twitter.com/username)'
      };
    }

    return { isValid: true };
  };

  // Social inputs configuration with validation
  const socialFields = [
    {
      name: 'github',
      placeholder: 'Enter GitHub URL (e.g., https://github.com/username)',
      icon: <FiGithub />,
      inputClass: styles.socialInput,
      color: 'white',
      validation: {
        required: 'GitHub URL is required',
        pattern: {
          value: /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/,
          message: 'Please enter a valid GitHub URL (https://github.com/username)'
        }
      }
    },
    {
      name: 'linkedin',
      placeholder: 'Enter LinkedIn URL (e.g., https://linkedin.com/in/username)',
      icon: <FaLinkedinIn />,
      inputClass: styles.socialInput,
      color: 'white',
      validation: {
        required: 'LinkedIn URL is required',
        pattern: {
          value: /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
          message: 'Please enter a valid LinkedIn URL (https://linkedin.com/in/username)'
        }
      }
    },
    {
      name: 'twitter',
      placeholder: 'Enter Twitter URL (e.g., https://twitter.com/username)',
      icon: <FaXTwitter />,
      inputClass: styles.socialInput,
      color: 'white',
      validation: {
        required: 'Twitter URL is required',
        pattern: {
          value: /^https:\/\/(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/?$/,
          message: 'Please enter a valid Twitter/X URL (https://twitter.com/username or https://x.com/username)'
        }
      }
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.heading1}>ADD A MEMBER</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.first}>
          <div className={styles.firstLeft}>
            <div className={styles.imageWrapper}>
              <img src={selectedImage} alt="Profile" className={styles.profileImage} />
              <label className={styles.imageButton}>
                UPLOAD PHOTO
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <select {...register("role", { required: true })} className={styles.sort}>
              <option value="">SELECT ROLE</option>
              <option value="CYBER CORE">CYBER CORE</option>
              <option value="WEB DEVELOPMENT">WEB DEVELOPMENT</option>
              <option value="UI/UX DESIGNER">UI/UX DESIGNER</option>
              <option value="MARKETING">MARKETING</option>
              <option value="GRAPHIC DESIGNING">GRAPHIC DESIGNING</option>
              <option value="EVENT MANAGEMENT">EVENT MANAGEMENT</option>
              <option value="CONTENT CREATION">CONTENT CREATION</option>
              <option value="VIDEOGRAPHY/PHOTOGRAPHY">VIDEOGRAPHY/PHOTOGRAPHY</option>
            </select>
            {errors.role && <span className={styles.error}>Role is required</span>}
          </div>
          <div className={styles.firstRight}>
            <TextField
              field={{
                fieldName: 'name',
                label: 'Full Name',
                placeholder: 'Enter full name',
                required: true,
                validation: { minLength: 3, maxLength: 30 },
              }}
              register={register}
              errors={errors}
            />
            <TextField
              field={{
                fieldName: 'number',
                label: 'Phone Number',
                placeholder: 'Enter Your Mobile Number',
                required: true,
                validation: {
                  pattern: '^[0-9]{10}$',
                  feedback: 'Phone number must be 10 digits',
                },
              }}
              register={register}
              errors={errors}
            />
            <TextField
              field={{
                fieldName: 'email',
                label: 'Enter KIIT Email Address',
                placeholder: 'Enter KIIT email',
                required: true,
                validation: {
                  pattern: '^[a-zA-Z0-9._%+-]+@kiit\\.ac\\.in$',
                  feedback: 'Enter a valid KIIT email',
                },
              }}
              register={register}
              errors={errors}
            />
          </div>
        </div>

        {/* Mobile version of Year, Batch & Website - shown only on mobile */}
        <div className={styles.second2}>
          <select {...register("year", { required: true })} className={styles.sort}>
            <option value="">SELECT YEAR</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
          {errors.year && <span className={styles.error}>Year is required</span>}
          
          <select {...register("batch", { required: true })} className={styles.sort}>
            <option value="">SELECT BATCH</option>
            <option value="1st year">1st year</option>
            <option value="2nd year">2nd year</option>
            <option value="3rd year">3rd year</option>
            <option value="4th year">4th year</option>
          </select>
          {errors.batch && <span className={styles.error}>Batch is required</span>}
          
          <div className={styles.sort}>
            <input
              type="url"
              placeholder="Enter Personal Website"
              {...register('website')}
              className={styles.websiteInput}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#000',
                fontWeight: 600,
                fontSize: '1.4rem',
                width: '100%',
                outline: 'none'
              }}
            />
            <span className={`${styles.black} ${styles.right}`}>
              <FaPaperclip />
            </span>
          </div>
        </div>

        {/* Desktop version - Year & Batch & Website - hidden on mobile */}
        <div className={styles.second}>
          <select {...register("year", { required: true })} className={styles.sort}>
            <option value="">SELECT YEAR</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
          {errors.year && <span className={styles.error}>Year is required</span>}
          <select {...register("batch", { required: true })} className={styles.sort}>
            <option value="">BATCH</option>
            <option value="1st year">1st year</option>
            <option value="2nd year">2nd year</option>
            <option value="3rd year">3rd year</option>
            <option value="4th year">4th year</option>
          </select>
          {errors.batch && <span className={styles.error}>Batch is required</span>}
          <div className={styles.sort}>
            <input
              type="url"
              placeholder="Enter Personal Website"
              {...register('website')}
              className={styles.websiteInput}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#000',
                fontWeight: 600,
                fontSize: '1.7rem',
                width: '100%',
                outline: 'none'
              }}
            />
            <span className={`${styles.black} ${styles.right}`}>
              <FaPaperclip />
            </span>
          </div>
        </div>

        {/* SOCIAL INPUTS */}
        <div className={styles.third}>
          {socialFields.map(({ name, placeholder, icon, inputClass, color, validation }, idx) => (
            <div key={idx} className={styles.socialFieldWrapper}>
              <div className={styles.sort1}>
                <span className={`${styles.black} ${styles.left}`}>
                  {icon}
                </span>
                <input
                  type="url"
                  placeholder={placeholder}
                  {...register(name, validation)}
                  className={inputClass}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color,
                    fontWeight: 600,
                    fontSize: '1.7rem',
                    width: '100%',
                    outline: 'none'
                  }}
                />
              </div>
              {errors[name] && (
                <span className={styles.error}>
                  {errors[name].message}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className={styles.full}>
          <div className={styles.four}>
            <button type="submit" className={styles.cybersubmitbutton} disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddMember;
