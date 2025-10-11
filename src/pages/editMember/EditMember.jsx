import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './EditMember.module.scss';
import defaultProfile from '../../../src/assets/images/profile.svg';
import TextField from '../../components/RegistrationForm/TextField';
import { FiGithub } from 'react-icons/fi';
import { FaLinkedinIn, FaXTwitter, FaPaperclip } from 'react-icons/fa6';
import { useAlert } from '../../components/Alert/AlertContext';

function EditMember() {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [selectedImage, setSelectedImage] = useState(defaultProfile);
  const [base64Image, setBase64Image] = useState(null);

  const { showAlert } = useAlert();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const roleOptions = [
    'admin',
    'web',
    'leadWeb',
    'eventManagement',
    'leadEventManagement',
    'coreCyber',
    'leadCoreCyber',
    'contentCreation',
    'leadContentCreation',
    'marketing',
    'leadMarketing',
    'broadcasting',
    'leadBroadcasting',
    'designing',
    'leadDesigning',
  ];

  const yearOptions = ['2022', '2023', '2024', '2025'];
  const branchOptions = ['CSE', 'CSCE', 'CSEE', 'IT'];

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

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showAlert('You are not logged in. Please log in to update your profile.', 'warning');
        return;
      }

      const socialLinks = [
        data.github && { type: 'GitHub', url: data.github },
        data.linkedin && { type: 'LinkedIn', url: data.linkedin },
        data.twitter && { type: 'Twitter', url: data.twitter },
      ].filter(Boolean);

      const payload = {
        ...data,
        profileImage: base64Image,
        socialLinks,
      };

      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_URL}api/admin/update-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        showAlert('Profile updated successfully!', 'success');
        console.log(result);
      } else {
        showAlert(result.message || 'Something went wrong', 'error');
      }
    } catch (error) {
      if (error.response) {
        console.error('Update error:', error.response.data);
        showAlert(error.response.data.message || 'Server error while updating profile.', 'error');
      } else {
        console.error('Update error:', error);
        showAlert('Server error while updating profile.', 'error');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading1}>EDIT YOUR PROFILE</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.first}>
          <div className={styles.firstLeft}>
            <div className={styles.imageWrapper}>
              <img src={selectedImage} alt="Profile" className={styles.profileImage} />
              <label className={styles.imageButton}>
                UPLOAD PHOTO
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
              </label>
            </div>
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
                fieldName: 'phoneNumber',
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

        {/* Year, Branch, Website, Role */}
        <div className={styles.second}>
          <div className={styles.sort}>
            <select {...register('year', { required: true })} className={styles.dropdownSelect} defaultValue="">
              <option value="" disabled hidden>Select Year</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className={styles.sort}>
            <select {...register('branch', { required: true })} className={styles.dropdownSelect} defaultValue="">
              <option value="" disabled hidden>Select Branch</option>
              {branchOptions.map((branch) => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>

          <div className={styles.sort}>
            <select {...register('role', { required: true })} className={styles.dropdownSelect} defaultValue="">
              <option value="" disabled hidden>Select Role</option>
              {roleOptions.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div className={styles.sort}>
            <input
              type="url"
              placeholder="Enter Personal Website"
              {...register('website')}
              className={styles.websiteInput}
             
            />
            <span className={`${styles.black} ${styles.right}`}>
              <FaPaperclip />
            </span>
          </div>
        </div>

        <div className={styles.mobileOnly1}>
          <p className={styles.mobileLabel}>• ATTACH LINKS TO THE SOCIALS:</p>
        </div>

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
                
              />
            </div>
          ))}
        </div>

        <div className={styles.full}>
          <div className={styles.four}>
            <button type="submit" className={styles.cybersubmitbutton}>
              UPDATE
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditMember;
