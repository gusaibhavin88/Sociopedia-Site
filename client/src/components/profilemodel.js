import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group } from "@mantine/core";
import styles from "../styles/profilemodel.module.css";
import { useState } from "react";
import { updateUser } from "@/redux/API/userrequest";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "@/redux/action/useraction";

function ProfileModel(props) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  console.log(user);
  const router = useRouter();
  const { id } = router.query;
  const [modeldata, setmodeldata] = useState({
    _id: user._id,
  });

  const handleChange = (e) => {
    setmodeldata({ ...modeldata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(id, modeldata);
    dispatch(getProfile(user._id));
    console.log(user);
    props.setprofileform();
  };
  return (
    <>
      <Modal
        opened={props.profileform}
        onClose={() => props.setprofileform()}
        size="55%"
      >
        <div className={styles.signup}>
          <h1>Profile Info</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.forminput}>
              <input
                type="status"
                name="relationship"
                placeholder="Relationship Status"
                onChange={handleChange}
              />
              <input
                type="livesin"
                name="livesin"
                placeholder="Lives At"
                onChange={handleChange}
              />
            </div>
            <div className={styles.forminput}>
              <input
                type="workat"
                name="worksAt"
                id=""
                placeholder="Work At"
                onChange={handleChange}
              />
              <input
                type="country"
                name="country"
                id=""
                placeholder="Country"
                onChange={handleChange}
              ></input>
            </div>
            <div className={styles.forminputfile}>
              <span>
                {" "}
                Cover <br />
                Image
              </span>
              <input type="file" placeholder="Cover Image" />
              <span>
                {" "}
                Profile <br /> Image
              </span>

              <input type="file" />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default ProfileModel;
