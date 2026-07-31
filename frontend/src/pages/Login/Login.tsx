import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import "./Login.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { loginUser } from "../../services/authService";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      alert("Login Successful ✅");

      navigate("/dashboard");

    } catch (error: any) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <Logo />

        <p className="tagline">
          Skip the Queue, Save Your Time
        </p>

        <h2>Welcome Back 👋</h2>

        <Input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          text="Login"
          onClick={handleLogin}
        />

        <p className="forgot">
          Forgot Password?
        </p>

        <p className="signup">
          Don't have an account?{" "}
          <Link to="/signup" className="link">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;