import axios from "axios";

import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { updateInfo } from "../../Reducers/user";

const AccountSettings = () => {
  const user = useSelector((state) => state.user.value);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newInfo, setNewInfo] = useState({
    username: user.username,
    newUsername: "123",
    email: "aaa",
  });

  console.log(user._id);
  const handleChange = (e) => {
    setNewInfo((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSave = async () => {
    try {
      const result = await axios.put(
        "http://localhost:3002/api/bank/users/updateinfo",
        {
          username: "1",
          newUsername: "2",
        }
      );

      dispatch(updateInfo({ username: result.data.username }));
      console.log(result);
      alert("Successfully changed info");
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="dashboard-container">
      {user.username}
      <div className="titlecontainer container">
        <div className="row summarytitle">Account settings</div>

        <form>
          <div className="mt-4">
            <input
              name="newUsername"
              className="my-form"
              type="text"
              placeholder={user.username}
              value={newInfo.newUsername}
              onChange={handleChange}
            />
          </div>

          <div className="mt-4">
            <input
              name="email"
              className="my-form"
              type="text"
              placeholder={newInfo.email}
              onChange={handleChange}
            />
          </div>

          <div className=" mt-4">
            <button type="button" onClick={handleSave} className="myBtn4">
              Save
            </button>
          </div>

          <div className="mt-4">
            <input
              name="password"
              className="my-form"
              type="text"
              id="txtLoginPassword"
              placeholder="Password"
            />
          </div>

          <div className="mt-4">
            <input
              name="passwordRepeat"
              className="my-form"
              type="text"
              id="txtLoginPasswordRepeat"
              placeholder="Repeat password"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
