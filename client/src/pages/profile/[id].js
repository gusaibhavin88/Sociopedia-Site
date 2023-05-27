import React, { useEffect } from "react";
import styles from "../../styles/profile.module.css";
import Profileleft from "@/components/profileleft";
import Postprofile from "@/components/postprofile";
import Rightside from "../rightside";
const Profile = () => {
  return (
    <div className={styles.profile}>
      <Profileleft />
      <Postprofile />
      <Rightside />
    </div>
  );
};

export default Profile;
