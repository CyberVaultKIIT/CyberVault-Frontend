import React, { useEffect, useState } from 'react'
import styles from './Team.module.scss' // Import the styles as a module
import img1 from "../../../src/assets/images/Component 9.svg"
import img2 from "../../../src/assets/images/Component 11.svg"
import core from "../../../src/assets/images/core.svg"
import tech from '../../../src/assets/images/tech.svg'
import hr from '../../../src/assets/images/hr.svg'
import dropdown from '../../../src/assets/images/polygon 2.svg'

const Team = () => {
  // eslint-disable-next-line react/prop-types
  const TeamMember = ({ heading, members }) => {
    return (
      <>
        <p className={styles.title}>{heading}</p>
        <div className={styles.six}>
        <div className={styles.five}>
          {members.map((member, index) => (
            <div key={index} className={styles.member}>
             
              <img src={member.imgURL} alt={member.name}className={styles.memberImage} />
            
              <p className={styles.name}>{member.name}</p>
            </div>
          ))}
        </div>
        </div>
      </>
    )
  }

  const TeamNames = ({img, teamName}) => {
    return (
      <div className={styles.teamName}>
        <img src={img} alt={teamName}  />
        <p className={styles.text1}>{teamName}</p>
      </div>
    )
  }

  const response = {
    title: "CORE MEMBERS",
    members: [
      {
        name: "Shivam Kumar",
        imgURL: img1
      },
      {
        name: "Shivam Kumar",
        imgURL: img2
      },
      {
        name: "Vikram Kumar Sahu",
        imgURL: img1
      },
      {
        name: "Shivam Kumar",
        imgURL: img2
      }
    ],
    status: "success"
  }

  const response1 = {
    title: "TEAM LEAD",
    members: [
      {
        name: "XYZ",
        imgURL: img1
      },
      {
        name: "XYZ",
        imgURL: img2
      },
      {
        name: "XYZ",
        imgURL: img1
      },
      {
        name: "XYZ",
        imgURL: img2
      }
    ],
    status: "success"
  }

  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);
  const [loading, setLoading] = useState(true);

  const simulateAPI = async () => {
    // Simulate an API request
    setData(response);
    setData1(response1);
    setLoading(false);
  }

  useEffect(() => {
    simulateAPI();
  }, []);

  return (
    <div className={styles.container}> {/* Use the global container class */}
      <div className={styles.first}>
        <h1 className={styles.heading1}>MEET OUR TEAM</h1>
        <h3 className={styles.heading2}>EXPLORE OUR DYNAMIC MEMBERS ACROSS VARIOUS ROLES</h3>
      </div>
      <div className={styles.second}>
       <TeamNames img={core} teamName="CORE MEMBERS" />
        <TeamNames img={tech} teamName="TEAM LEAD" />
        <TeamNames img={hr} teamName="TEAM LEAD" />
      </div>
      <div className={styles.third}>
        <button className={styles.sort}>SORT BY YEAR <img src={dropdown}></img></button>
      </div>
      <div className={styles.fourth}>
        {loading && <p>Loading...</p>}
        {!loading && (
          <>
            <TeamMember heading={data.title} members={data.members} />
            <TeamMember heading={data1.title} members={data1.members} />
          </>
        )}
      </div>
      <div>
      </div>
    </div>
  )
}

export default Team