import React, { useState } from 'react';
import './AddMember.module.scss'; // Assuming you have styles in this file
import { useForm } from 'react-hook-form';
import styles from './AddMember.module.scss';
import defaultProfile from '../../../src/assets/images/profile.svg';
import TextField from '../../components/RegistrationForm/TextField';
import axios from 'axios';

import { FiGithub } from 'react-icons/fi';
import { FaLinkedinIn, FaXTwitter, FaPaperclip } from 'react-icons/fa6';

function AddMember() {
  // React Hook Form initialization
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [selectedImage, setSelectedImage] = useState(defaultProfile);
  const [submitting, setSubmitting] = useState(false);

  // Handle image selection & preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submit
  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const payload = {
        ...data,
        profileImage: selectedImage, // include image as base64
      };
      await axios.post('/api/members', payload); // proxy will forward to backend
      alert('Member added successfully!');
      reset();
      setSelectedImage(defaultProfile);
    } catch (error) {
      console.error('Error adding member:', error);
      alert('Failed to add member');
    }
    setSubmitting(false);
  };

  // Social inputs configuration
  const socialFields = [
    {
      name: 'github',
      placeholder: 'Enter GitHub URL',
      icon: <FiGithub />,
      inputClass: styles.socialInput,
      color: 'white',
    },
    {
      name: 'linkedin',
      placeholder: 'Enter LinkedIn URL',
      icon: <FaLinkedinIn />,
      inputClass: styles.socialInput,
      color: 'white',
    },
    {
      name: 'twitter',
      placeholder: 'Enter Twitter URL',
      icon: <FaXTwitter />,
      inputClass: styles.socialInput,
      color: 'white',
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
              <option value="member">Member</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
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

        {/* Year & Batch */}
        <div className={styles.second}>
          <select {...register("year", { required: true })} className={styles.sort}>
            <option value="">SELECT YEAR</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
          {errors.year && <span className={styles.error}>Year is required</span>}
          <select {...register("batch", { required: true })} className={styles.sort}>
            <option value="">BATCH</option>
            <option value="A">1st Year</option>
            <option value="B">2nd Year</option>
            <option value="C">3rd Year</option>
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
          {socialFields.map(({ name, placeholder, icon, inputClass, color }, idx) => (
            <div key={idx} className={styles.sort1}>
              <span className={`${styles.black} ${styles.left}`}>
                {icon}
              </span>
              <input
                type="url"
                placeholder={placeholder}
                {...register(name)}
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
