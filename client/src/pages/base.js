import React, { useEffect } from "react";
import styles from "../styles/base.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Base = ({ Component, pageProps }) => {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/home");
    } else {
      router.replace("/auth");
    }
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
