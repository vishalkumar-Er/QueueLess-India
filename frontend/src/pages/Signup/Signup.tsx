import { Link } from "react-router-dom";
import "./Signup.css";

import Logo from "../../components/Logo/Logo";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

function Signup() {
  return (
    <div className="signup-container">

      <div className="signup-card">

        <Logo />

        <p className="tagline">
          Create Your QueueLess India Account
        </p>

        <Input
          type="text"
          placeholder="Full Name"
        />

        <Input
          type="email"
          placeholder="Email Address"
        />

        <Input
          type="password"
          placeholder="Password"
        />

        <Input
          type="password"
          placeholder="Confirm Password"
        />

        <Button text="Create Account" />

        <p className="signup">
  Already have an account?{" "}
  <Link to="/" className="link">
    Login
  </Link>
</p>

      </div>

    </div>
  );
}

export default Signup;