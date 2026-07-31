import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../services/authService";
import "./Signup.css";

import Logo from "../../components/Logo/Logo";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await registerUser({
        name,
        email,
        password,
      });

      alert("Account Created Successfully ✅");
      navigate("/");
    } catch (error: any) {
      console.log("Signup Error:", error);
      console.log("Response:", error.response);

      alert(
        error.response?.data?.message || "Signup Failed"
      );
    }
  };

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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          text="Create Account"
          onClick={handleSignup}
        />

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