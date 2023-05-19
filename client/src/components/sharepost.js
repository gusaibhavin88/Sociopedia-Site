import React from "react";
import styles from "../styles/sharepost.module.css";
import Image from "next/image";
import { profile } from "../../public/Images";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";

const Sharepost = () => {
  return (
    <div className={styles.sharepost}>
      <div className={styles.inputbar}>
        <Image
          src={profile}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            marginRight: "1rem",
          }}
        ></Image>{" "}
        <input type="text" placeholder="What's happening" />
      </div>
      <div className={styles.sharebtns}>
        <div
          className={styles.option}
          style={{ color: "var(--photo)", alignItems: "center" }}
          onClick={() => imageref.current.click()}
        >
          <UilScenery />
          Image
        </div>
        <div className={styles.option} style={{ color: "var(--video)" }}>
          <UilPlayCircle />
          Video
        </div>
        <div className={styles.option} style={{ color: "var(--location)" }}>
          <UilLocationPoint />
          Location
        </div>
        <div className={styles.option} style={{ color: "var(--schedule)" }}>
          <UilSchedule />
          Schedule
        </div>
        <button>Share</button>
      </div>
    </div>
  );
};

export default Sharepost;
