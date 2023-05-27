import React from "react";
import styles from "../styles/post.module.css";
import Image from "next/image";
import { profile } from "../../public/Images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faShare } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
library.add(faHeart);

const Post = ({ post, imageUrl, days }) => {
  return (
    <div className={styles.post} key={post._id}>
      <div className={styles.flexseting}>
        <Image
          src={post.profileUrl ? post.profileUrl : profile}
          alt="Image not found"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          width={100}
          height={100}
        ></Image>
        <div className={styles.nameinfo}>
          <h2>
            {post.firstname} {post.lastname}
          </h2>
          <h2 style={{ color: "var(--gray )" }}>{days}</h2>
        </div>
      </div>
      <Image
        src={imageUrl}
        className={styles.postpic}
        width={1000}
        height={100}
      ></Image>
      <div className={styles.postbtn}>
        <FontAwesomeIcon icon={faHeart} size="2x" color="var(--location)" />
        <FontAwesomeIcon icon={faMessage} size="2x" color="var(--location)" />
        <FontAwesomeIcon icon={faShare} size="2x" color="var(--location)" />
      </div>
      <div
        className={styles.likecount}
        style={{ display: "flex", gap: "1rem", fontSize: "14px" }}
      >
        <span>{post.likes.length}</span>
        <span>Likes</span>
      </div>
    </div>
  );
};

export default Post;
