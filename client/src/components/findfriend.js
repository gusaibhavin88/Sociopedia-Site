import React, { useEffect, useState } from "react";
import styles from "../styles/findfriend.module.css";
import Image from "next/image";
import { profile } from "../../public/Images";
import { getUsers } from "@/redux/API/authrequest";
import { useDispatch, useSelector } from "react-redux";
import { followUpdate } from "@/redux/API/userrequest";
import { getProfile } from "@/redux/action/useraction";
import { getAllPosts, getPostUrl } from "@/redux/action/postaction";

const Findfriend = () => {
  const [users, setusers] = useState("");
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const dispatch = useDispatch();

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

  const handleSubmit = (friendId) => async (e) => {
    e.preventDefault();
    const ids = {
      profileId: user._id,
      friendId: friendId,
    };
    await followUpdate(ids);
    dispatch(getProfile());
    setTimeout(() => {
      dispatch(getAllPosts(user._id));
      dispatch(getPostUrl());
    }, 5000);
  };

  return (
    <div className={styles.findfriend}>
      <h3>People you may know</h3>
      {users &&
        users.map((data) => {
          return (
            <div className={styles.friendinfo} key={data._id}>
              <div className={styles.flexseting}>
                <Image
                  src={data.profileUrl ? data.profileUrl : profile}
                  alt="Image not found"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  width={100}
                  height={100}
                ></Image>
                <div className={styles.nameinfo}>
                  <h4>
                    {data.firstname} {data.lastname}
                  </h4>
                  <h4>{data.email}</h4>
                </div>
              </div>

              <button
                onClick={handleSubmit(data._id)}
                style={
                  user.following.includes(data._id)
                    ? { background: "green" }
                    : { background: " var(--buttonBg)" }
                }
              >
                {user.following.includes(data._id) ? "Following" : "Follow"}
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default Findfriend;
