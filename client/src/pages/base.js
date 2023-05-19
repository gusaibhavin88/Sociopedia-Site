import React, { useEffect } from "react";
import styles from "../styles/base.module.css";
import Home from "./home";
import Auth from "./auth";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Base = ({ Component, pageProps }) => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (user) {
      // If the user is authenticated, navigate to the home page
      router.replace("/home");
    } else {
      // If the user is not authenticated, navigate to the auth page
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
