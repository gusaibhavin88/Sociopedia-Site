import React, { useEffect, useState } from "react";
import Image from "next/image";
import { logo } from "../../public/Images";
import styles from "../styles/auth.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logInUser, registerUser } from "@/redux/action/authaction";
import { useRouter } from "next/router";

const Auth = () => {
  const [isSignup, setisSignup] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const error = useSelector((state) => state.auth);

  const user = useSelector((state) => state.auth.user);

  // Sign UP
  const [ismatch, setismatch] = useState(false);
  const [signUpData, setsignUpData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    confirmpassword: "",
    email: "",
  });

  const SignHandleChange = (e) => {
    setsignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const signHandleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      if (signUpData.password === signUpData.confirmpassword) {
        setismatch(false);
        dispatch(registerUser(signUpData));
      } else {
        setismatch(true);
      }
    }
  };

  // Login

  const [logInData, setlogInData] = useState({
    password: "",
    email: "",
  });

  const logInHandleChange = (e) => {
    setlogInData({ ...logInData, [e.target.name]: e.target.value });
  };

  const logInHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(logInUser(logInData));
  };

  return (
    <div className={styles.auth}>
      <div className={styles.authleft}>
        <Image src={logo} className={styles.authleftimage} />
        <div className={styles.sitename}>
          <h1>Sociopedia</h1>
          <h3>Explore the ideas throughout the world</h3>
        </div>
      </div>
      <div className={styles.middleline}></div>
      {isSignup ? (
        <div className={styles.signup}>
          <h1>Sign Up</h1>
          <form onSubmit={signHandleSubmit} className={styles.form}>
            <div className={styles.forminput}>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                onChange={SignHandleChange}
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                onChange={SignHandleChange}
              />
            </div>
            <input
              type="email"
              name="email"
              id=""
              placeholder="Email"
              onChange={SignHandleChange}
            />
            <div className={styles.forminput}>
              <input
                onChange={SignHandleChange}
                type="password"
                name="password"
                placeholder="Password"
                pattern="^(?=.*[A-Z])(?=.*[!@#$&*])[A-Za-z\d!@#$&*]{8,}$"
                title="Your password must be at least 8 characters long and contain at least one uppercase letter and one unique character."
                required
              />
              <input
                onChange={SignHandleChange}
                type="password"
                id="confirmpassword"
                placeholder="Confirm Password"
                name="confirmpassword"
                pattern="(?=.*[A-Z])(?=.*[!@#$&*])[A-Za-z\d!@#$&*]{8,}"
                title="Your password must be at least 8 characters long and contain at least one uppercase letter and one unique character."
                required
              ></input>
            </div>
            <span
              style={{
                alignSelf: "flex-start",
                fontSize: "1.2rem",
                color: "red",
                display: ismatch ? "flex" : "none",
              }}
            >
              *Confirm password is not matching
            </span>

            <span onClick={() => setisSignup(false)}>
              Already have an account. Login!
            </span>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div className={styles.signup}>
          <h1>Log In</h1>
          <form action="" onSubmit={logInHandleSubmit} className={styles.form}>
            <input
              type="text"
              placeholder="Email"
              onChange={logInHandleChange}
              name="email"
              style={{ width: "394px" }}
            />
            <input
              type="text"
              placeholder="Password"
              name="password"
              onChange={logInHandleChange}
              style={{ width: "394px" }}
              pattern="^(?=.*[A-Z])(?=.*[!@#$&*])[A-Za-z\d!@#$&*]{8,}$"
              title="Your password must be at least 8 characters long and contain at least one uppercase letter and one unique character."
              required
            />
            <span onClick={() => setisSignup(true)}>
              Dont han an account? SigUp
            </span>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Auth;
