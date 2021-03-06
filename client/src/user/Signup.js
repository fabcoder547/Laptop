import React, { useState } from "react";
import Base from "../core/Base";
import "../css/form.css";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",

    lastname: "",
    role: 0,
    email: "",
    password: "",
    userinfo: "",
    error: "",
    success: false,
  });

  const {
    name,
    email,
    password,
    error,
    success,
    lastname,
    userinfo,
    role,
  } = values;

  const handelChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const onsubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });

    signup({ name, email, password, userinfo, lastname, role })
      .then((data) => {
        if (data.err) {
          
          setValues({
            ...values,
            error: "Error !please try again!",
            success: false,
          });
        } else if (data.errors) {
          setValues({
            ...values,
            error: data.errors.errors[0].msg,
            success: false,
          });
        } else {
       
          setValues({
            ...values,
            name: "",
            password: "",
            userinfo: "",
            error: "",
            success: true,
            email: "",
            lastname: "",
          });
        }
      })
      .catch((err) => {
        setValues({
          ...values,
          error: err.message,
        });
      });
  };

  const successMessege = () => {
    return (
      <div className="row" style={{ width: "100%" }}>
        <div className="col-md-12" style={{ width: "100%" }}>
          <div
            className="alert alert-success"
            style={{
              display: success ? "" : "none",
              width: "100%",
            }}
          >
            <p>
              Email Sent successfully!check Your Email.
            </p>
          </div>
        </div>
      </div>
    );
  };
  const errorMessege = () => {
    return (
      <div className="row" style={{ width: "100%" }}>
        <div className="col-md-12" style={{ width: "100%" }}>
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none", width: "100%" }}
          >
            <p>{error} here</p>
          </div>
        </div>
      </div>
    );
  };
  const signUpForm = () => {
    return (
      <div className="row">
        {successMessege()}
        {errorMessege()}
        <form>
          <div className="row">
            <div className="col-md-6 text-center">
              <div className="form-group">
                <input
                  required
                  type="text"
                  value={name}
                  onChange={handelChange("name")}
                  placeholder="first Name"
                />
              </div>
              <div className="form-group">
                <input
                  onChange={handelChange("lastname")}
                  type="text"
                  value={lastname}
                  placeholder="last Name"
                />
              </div>
             
            </div>
            <div className="col-md-6">
             <div className="form-group">
                <input
                  required
                  value={email}
                  onChange={handelChange("email")}
                  type="email"
                  placeholder="Enter an email"
                />
              </div>
              <div className="form-group">
                <input
                  required
                  value={password}
                  onChange={handelChange("password")}
                  type="password"
                  placeholder="Enter password"
                />
              </div>
              
             
              
            </div>
           <div className="col-md-12">
              <button
                onClick={onsubmit}
                className="btn btn-outline-info w-90 btn-md signupbtn"
              >
                Signup
              </button>
           </div>
          </div>
        </form>
      </div>
    );
  };

  return <Base title="Signup page">{signUpForm()}</Base>;
};

export default Signup;
