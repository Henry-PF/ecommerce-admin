import React, { useState } from "react";
import "../../Login/login.css";
import { Link } from "react-router-dom";
import authLayout from "../../Login/authLayout";

function ResetPassword(props) {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = emailRegex.test(emailValue);
    setEmail(emailValue);
    setIsEmailValid(isValid);
  };

  return (
    <>
      <div className="reset-password-section text-center">
        <h3>
          <i className="fa fa-lock fa-4x"></i>
        </h3>
        <h2 className="text-center">Forgot Password?</h2>
        <p>You can reset your password here.</p>
        <div className="panel-body">
          <form
            id="register-form"
            autoComplete="off"
            className="form"
            method="post"
          >
            <div className="form-group">
              <span className="input-group-addon">
                <i className="glyphicon glyphicon-envelope color-blue"></i>
              </span>
              <input
                id="email"
                name="email"
                placeholder="email address"
                className={`form-control form-control-lg ${
                  isEmailValid ? "" : "is-invalid"
                }`}
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
              {isEmailValid ? null : (
                <div className="invalid-feedback">Invalid email format</div>
              )}
            </div>
            <div className="form-group mt-2">
              <button type="button" className="btn btn-primary btn-lg">
                Reset Password
              </button>
              <p className="small fw-bold mt-2 pt-1 mb-0">
                Remember your password ?{" "}
                <Link to="/login" className="link-danger">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default authLayout(ResetPassword);
