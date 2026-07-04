import { Link } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import "./Login.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

function Login() {
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
        />

        <Input
          type="password"
          placeholder="Enter Password"
        />

        <Button text="Login" />

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