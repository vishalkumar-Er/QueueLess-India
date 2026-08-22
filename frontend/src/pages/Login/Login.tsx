import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Logo from "../../components/Logo/Logo";
import "./Login.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { loginUser } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ================= Login =================
  const handleLogin = async () => {
    try {
      const data = await loginUser({
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      toast.success("Login Successful ✅");

      if (data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  // ================= Forgot Password =================
  const handleForgotPassword = () => {
    toast.info(
      "Please contact the administrator to reset your password."
    );
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <Logo />

        <p className="tagline">
          Login to Your QueueLess India Account
        </p>

        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <Button
          text="Login"
          onClick={handleLogin}
        />

        <p
          className="forgot"
          onClick={handleForgotPassword}
          style={{
            cursor: "pointer",
          }}
        >
          Forgot Password?
        </p>

        <p className="signup">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="link"
          >
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;