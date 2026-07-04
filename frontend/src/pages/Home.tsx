import "../styles/Home.css";
import Navbar from "../components/Navbar";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

function Home() {
  return (
    <>
      <Navbar />

      <div className="home-container">
        <h2>Welcome to QueueLess India 👋</h2>

        <p>This is our first custom React component.</p>

        <Input
          type="text"
          placeholder="Enter Your Name"
        />

        <Input
          type="email"
          placeholder="Enter Email"
        />

        <Input
          type="password"
          placeholder="Enter Password"
        />

        <Button text="Get Started" />
      </div>
    </>
  );
}

export default Home;