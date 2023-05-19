import React, { useEffect, useState } from "react";
import styles from "../styles/profileinfo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "@/redux/action/authaction";
import Profilemodel from "./profilemodel";
import { getProfile } from "@/redux/action/useraction";

const Profileinfo = () => {
  const dispatch = useDispatch();
  const [profileform, setprofileform] = useState(false);
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  //Logutt
  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logOutUser());
  };
  return (
    <div className={styles.profileinfo}>
      <div className={styles.info}>
        <h1>Profile Info</h1>
        <FontAwesomeIcon
          icon={faPenToSquare}
          size="2x"
          onClick={() => setprofileform(true)}
        />
        <Profilemodel
          profileform={profileform}
          setprofileform={setprofileform}
        />
      </div>
      <div className={styles.infodata}>
        <h2>
          Status &nbsp; &nbsp; :{" "}
          <span style={{ fontWeight: "100" }}>{user.relationship}</span>{" "}
        </h2>
        <h2>
          Living at : <span style={{ fontWeight: "100" }}>{user.livesin}</span>{" "}
        </h2>
        <h2>
          Work at &nbsp; :{" "}
          <span style={{ fontWeight: "100" }}>{user.worksAt}</span>{" "}
        </h2>
        <h2>
          Country &nbsp;:{" "}
          <span style={{ fontWeight: "100" }}> {user.country}</span>
        </h2>
      </div>
      <button onClick={logoutUser}>Logout</button>
      {profileform && <Profilemodel />}
    </div>
  );
};

export default Profileinfo;
