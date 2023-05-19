import React from "react";
import Post from "./post";

const Posts = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Post />
      <Post />
    </div>
  );
};

export default Posts;
