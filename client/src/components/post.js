import React from "react";
import styles from "../styles/post.module.css";
import Image from "next/image";
import { postpicture } from "../../public/Images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faShare } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
library.add(faHeart);

const Post = () => {
  return (
    <div className={styles.post}>
      <Image src={postpicture} className={styles.postpic}></Image>
      <div className={styles.postbtn}>
        <FontAwesomeIcon icon={faHeart} size="2x" color="var(--location)" />
        <FontAwesomeIcon icon={faMessage} size="2x" color="var(--location)" />
        <FontAwesomeIcon icon={faShare} size="2x" color="var(--location)" />
      </div>
      <div
        className={styles.likecount}
        style={{ display: "flex", gap: "1rem", fontSize: "14px" }}
      >
        <span>0</span>
        <span>Likes</span>
      </div>
    </div>
  );
};

export default Post;
