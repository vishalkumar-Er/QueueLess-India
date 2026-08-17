import "../styles/Home.css";
import Navbar from "../components/Navbar";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { useState } from "react";

function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Navbar />

      <div className="home-container">
        <h2>Welcome to QueueLess India 👋</h2>

        <p>This is our first custom React component.</p>

        <Input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <Button text="Get Started" />
      </div>
    </>
  );
}

export default Home;