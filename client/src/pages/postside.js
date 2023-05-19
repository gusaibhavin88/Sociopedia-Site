import Posts from "@/components/posts";
import Sharepost from "@/components/sharepost";
import React from "react";
import styles from "../styles/postside.module.css";

const Postside = () => {
  return (
    <div className={styles.postside}>
      <Sharepost />
      <Posts />
    </div>
  );
};

export default Postside;
