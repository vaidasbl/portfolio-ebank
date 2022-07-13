import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { updateInfo } from "../../Reducers/user";

const AccountSettings = () => {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const [newInfo, setNewInfo] = useState({
    userid: user._id,
    newUsername: user.username,
    newEmail: user.email,
    password: "",
    passwordRepeat: "",
  });

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
        newInfo
      );
      console.log(result.data);
      dispatch(
        updateInfo({ username: result.data.username, email: result.data.email })
      );
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="titlecontainer container">
        <div className="row summarytitle">Account settings</div>

        <form>
          <div className="mt-4">
            <input
              name="newUsername"
              className="my-form"
              type="text"
              value={newInfo.newUsername}
              onChange={handleChange}
            />
          </div>
          <div className="underlinetext">username</div>

          <div className="mt-4">
            <input
              name="newEmail"
              className="my-form"
              type="text"
              value={newInfo.newEmail}
              onChange={handleChange}
            />
          </div>
          <div className="underlinetext">email</div>

          <div
            className="mt-4 setisopenbutton"
            onClick={() => setIsOpen(!isOpen)}
          >
            <button type="button" className="myBtn10">
              Change password
            </button>
          </div>
          <div className="passwordbox redborder">
            {isOpen && (
              <div>
                <div className="mt-4">
                  <input
                    name="password"
                    className="my-form"
                    type="text"
                    id="txtLoginPassword"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
                <div className="underlinetext">password</div>

                <div className="mt-4">
                  <input
                    name="passwordRepeat"
                    className="my-form"
                    type="text"
                    id="txtLoginPasswordRepeat"
                    placeholder="Repeat password"
                    onChange={handleChange}
                  />
                </div>
                <div className="underlinetext">repeat password</div>
              </div>
            )}
          </div>

          <div className="row buttonsrow">
            <div className="col-6">
              <button
                type="button"
                className="myBtn4"
                onClick={() => navigate(-1)}
              >
                Go back
              </button>
            </div>
            <div className="col-6">
              <button type="button" className="myBtn4" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
