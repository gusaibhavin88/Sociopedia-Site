import React, { useEffect } from "react";
import Post from "./post";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getPostUrl } from "@/redux/action/postaction";

const Posts = ({ location }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const post = useSelector((state) => state.auth.post);
  const posturl = useSelector((state) => state.auth.posturl);

  const getImageUrl = (imageName) => {
    const matchingUrl =
      posturl && posturl.find((url) => url.includes(imageName));
    return matchingUrl || null;
  };

  useEffect(() => {
    dispatch(getAllPosts(user._id));
    dispatch(getPostUrl());
  }, []);

  const dayscount = (createdAt) => {
    // Convert the "createdAt" string to a Date object
    const createdDate = new Date(createdAt);
    // Get the current date
    const currentDate = new Date();
    // Calculate the time difference in milliseconds
    const timeDiff = currentDate - createdDate;
    // Convert milliseconds to days
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    // Generate the output string
    return `${daysDiff} day${daysDiff !== 1 ? "s" : ""} ago`;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {location ? (
        <>
          {post ? (
            post
              .filter((posturl) => posturl.userId === user._id)
              .map((post) => {
                const imageUrl = getImageUrl(post.imageName);
                return (
                  <>{imageUrl && <Post post={post} imageUrl={imageUrl} />}</>
                );
              })
          ) : (
            <span style={{ color: "red" }}>No Posts</span>
          )}
        </>
      ) : (
        <>
          {post &&
            post.map((post) => {
              const imageUrl = getImageUrl(post.imageName);
              const days = dayscount(post.createdAt);

              return (
                <>
                  {imageUrl && days && (
                    <Post post={post} imageUrl={imageUrl} days={days} />
                  )}
                </>
              );
            })}
        </>
      )}
    </div>
  );
};

export default Posts;
