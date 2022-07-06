import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
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
        "http://localhost:3002/api/bank/users/login",
        user
      );
      if (result.data.success) {
        dispatch(login({ username: result.data.user.username }));
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
            className="form-control"
            type="text"
            id="txtLoginUsername"
            placeholder="Username"
            onChange={handleChange}
          />
        </div>

        <div className="">
          <input
            name="password"
            className="form-control"
            type="text"
            id="txtLoginPassword"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <div className="row mt-4">
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
      </form>
    </div>
  );
};

export default LoginForm;
