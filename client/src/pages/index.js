import Auth from "./auth";
import Home from "./home";
import { useSelector } from "react-redux";

const index = () => {
  const { user } = useSelector((state) => state.auth);
  return <div>{user ? <Home /> : <Auth />}</div>;
};

export default index;
