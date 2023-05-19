import React, { useEffect } from "react";
import styles from "../styles/home.module.css";
import Profileside from "./profileside";
import Postside from "./postside";
import Rightside from "./rightside";

const Home = () => {
  return (
    <div className={styles.home}>
      <Profileside />
      <Postside />
      <Rightside />
    </div>
  );
};

export default Home;
