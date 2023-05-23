import React, { useEffect } from "react";
import styles from "../styles/home.module.css";
import Profileside from "./profileside";
import Postside from "./postside";
import Rightside from "./rightside";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className={styles.home}>
      <Profileside />
      <Postside />
      <Rightside />
    </div>
  );
};

export default Home;
