import React, { useEffect, useState } from "react";
import styles from "../styles/findfriend.module.css";
import Image from "next/image";
import { profile } from "../../public/Images";
import { getUsers } from "@/redux/API/authrequest";
import { useSelector } from "react-redux";

const Findfriend = () => {
  const [users, setusers] = useState("");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await getUsers();
      const filterData = () => {
        return setusers(
          response.data.user.filter((item) => item._id !== user._id)
        );
      };
      filterData();
    };
    getAllUsers();
  }, []);

  return (
    <div className={styles.findfriend}>
      <h3>People you may know</h3>
      {users &&
        users.map((data) => {
          return (
            <div className={styles.friendinfo}>
              <div className={styles.flexseting}>
                <Image
                  src={profile}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                ></Image>
                <div className={styles.nameinfo}>
                  <h4>
                    {data.firstname} {data.lastname}
                  </h4>
                  <h4>{data.email}</h4>
                </div>
              </div>

              <button>Follow</button>
            </div>
          );
        })}
    </div>
  );
};

export default Findfriend;
