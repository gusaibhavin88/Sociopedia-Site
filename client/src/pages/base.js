import React, { useEffect } from "react";
import styles from "../styles/base.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "@/redux/action/useraction";

const Base = ({ Component, pageProps }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(getProfile());
  }, [isAuthenticated]);

  return (
    <div className={styles.base}>
      <div
        className={styles.backfade}
        style={{ top: "-18%", right: "0" }}
      ></div>
      <div
        className={styles.backfade}
        style={{ top: "36%", left: "-8rem" }}
      ></div>
      <Component {...pageProps} />
    </div>
  );
};

export default Base;
