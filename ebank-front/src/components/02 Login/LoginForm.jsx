import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import apiEndpoint from "../../endpoint";
import { login } from "../../Reducers/user";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });
  const empty = Object.values(user).some((v) => v === "" || v === undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${apiEndpoint}/api/bank/users/login`,
        user
      );
      if (result.data.success) {
        dispatch(
          login({
            _id: result.data.user._id,
            username: result.data.user.username,
            email: result.data.user.email,
            wallet: result.data.user.wallet,
          })
        );
        navigate("/");
      } else {
        alert("Login denied");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setUser((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <div>
      <h6 className="title">Login</h6>

      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <input
            name="username"
            className="my-form"
            type="text"
            id="txtLoginUsername"
            placeholder="Username"
            onChange={handleChange}
          />
        </div>

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
        <div className="mt-40">
          <div className="row ">
            <div className="col-6">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="myBtn4"
              >
                Back
              </button>
            </div>
            <div className="col-6">
              <button disabled={empty} type="submit" className="myBtn4">
                Proceed
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
