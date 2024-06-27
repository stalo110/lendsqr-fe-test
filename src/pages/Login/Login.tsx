import React, { useState, useEffect } from "react";
import "./Login.scss";
import Lendlogo from "../../assets/images/logo2.svg";
import Vector from "../../assets/images/vector.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../request/axiosInstance";
import BeatLoader from "react-spinners/BeatLoader";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (validationErrors) {
      toast.error(validationErrors, {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }, [validationErrors]);

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await axiosInstance.post("login", formData);
      console.log("login ", response);

      if (response.status !== 200) {
        throw new Error("Error logging in");
      }

      console.log(response);
      const { token, firstName: username } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      toast.success("Successfully logged in");
      setFormData({ email: "", password: "" });
      setValidationErrors("");
      navigate("/dashboard/main");
    } catch (error: any) {
      setValidationErrors(
        error.response.data.Error ||
          JSON.parse(error.response.request.response)?.message ||
          "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container">
      <div className="L-container">
        <div className="logo">
          <img src={Lendlogo} alt="" />
        </div>
        <div className="vector">
          <img src={Vector} alt="" />
        </div>
      </div>

      <div className="R-container">
        <div className="logo">
          <img src={Lendlogo} alt="" />
        </div>

        <form>
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>
          <div className="L-form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="L-form-group">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />

            <span
              style={{
                position: "absolute",
                top: "60%",
                right: "5px",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={togglePasswordVisibility}
            >
              <h1>{passwordVisible ? "HIDE" : "SHOW"}</h1>
            </span>
          </div>
          <div className="forgot">
            <Link
              to=""
              style={{ color: "#39CDCC", textDecoration: "none" }}
              onClick={togglePasswordVisibility}
            >
              FORGOT PASSWORD?{" "}
            </Link>
          </div>
          <button type="submit" onClick={handleSubmit}>
            <BeatLoader
              color="#fff"
              loading={isLoading}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            {!isLoading ? "LOG IN" : ""}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
