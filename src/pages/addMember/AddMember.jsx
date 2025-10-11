import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './AddMember.module.scss'
import defaultProfile from '../../../src/assets/images/profile.svg'
import dropdown from '../../../src/assets/images/polygon2.svg'
import TextField from '../../components/RegistrationForm/TextField'

import { FiGithub } from 'react-icons/fi'
import { FaLinkedinIn, FaXTwitter, FaPaperclip } from 'react-icons/fa6'

function AddMember() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [selectedImage, setSelectedImage] = useState(defaultProfile)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setSelectedImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = (data) => {
    console.log(data)
  }

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
  ]

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
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
              </label>
            </div>

            {/* DESKTOP: Role */}
            <button type="button" className={`${styles.sort} ${styles.desktopOnly}`}>
              <div className={styles.between}>
                SELECT ROLE <img src={dropdown} alt="dropdown" />
              </div>
            </button>
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

        {/* MOBILE: Role */}
        <div className={styles.mobileRoleButton}>
          <div className={styles.mobileOnly}>
            <p className={styles.mobileLabel}>• ROLE SELECTION:</p>
          </div>
          <button type="button" className={styles.sort}>
            <div className={styles.between}>SELECT ROLE<img src={dropdown} alt="dropdown" /></div>
            
          </button>
        </div>

        {/* Year, Batch, Website */}
        <div className={styles.second}>
          <button type="button" className={styles.sort}>
            <div className={styles.between}>SELECT YEAR <img src={dropdown} alt="dropdown" /></div>
          </button>
          <button type="button" className={styles.sort}>
            <div className={styles.between}>BATCH <img src={dropdown} alt="dropdown" /></div>
          </button>
          <div className={styles.sort} >
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
            <span className={`${styles.black} ${styles.right}`} >
              <FaPaperclip />
            </span>
          </div>
        </div>

        {/* MOBILE VIEW Year, Batch, Website */}
        <div className={styles.second2}>
          <div className={styles.mobileOnly}>
            <p className={styles.mobileLabel}>• YEAR SELECTION:</p>
          </div>
          <button type="button" className={styles.sort}>
            <div className={styles.between}>SELECT YEAR <img src={dropdown} alt="dropdown" /></div>
          </button>

          <div className={styles.mobileOnly}>
            <p className={styles.mobileLabel}>• BATCH SELECTION:</p>
          </div>
          <button type="button" className={styles.sort}>
            <div className={styles.between}>BATCH <img src={dropdown} alt="dropdown" /></div>
          </button>

          <div className={styles.mobileOnly}>
            <p className={styles.mobileLabel}>• PERSONAL WEBSITE</p>
          </div>
          <div className={styles.sort} >
  
  <input
    type="url"
    placeholder="Enter Personal Website"
    {...register('website')}
    className={styles.websiteInput}/>
  <span className={`${styles.black} ${styles.right}`} ><FaPaperclip /></span>
</div>

        </div>

            <div className={styles.mobileOnly1}>
            <p className={styles.mobileLabel}>• ATTACH LINKS TO THE SOCIALS:</p>
          </div>
        {/* SOCIAL INPUTS */}
        <div className={styles.third}>
            
          {socialFields.map(({ name, placeholder, icon, inputClass, color }, idx) => (
            <div key={idx} className={styles.sort1} >
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
          <button type="submit" className={styles.cybersubmitbutton}>
            Submit
          </button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default AddMember
