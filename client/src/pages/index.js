import Head from "next/head";
import Base from "./base";
import Auth from "./auth";
import Home from "./home";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const index = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  return <div>{user ? <Home /> : <Auth />}</div>;
};

export default index;
