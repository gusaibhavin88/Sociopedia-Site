import Auth from "./auth";
import Home from "./home";
import { useSelector } from "react-redux";

const index = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return <div>{isAuthenticated ? <Home /> : <Auth />}</div>;
};

export default index;
