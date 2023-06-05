import { useEffect } from "react";
import Auth from "./auth";
import Home from "./home";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const index = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return <div>{isAuthenticated ? <Home /> : <Auth />}</div>;
};

export default index;
