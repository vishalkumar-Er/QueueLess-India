import "./Button.css";

type ButtonProps = {
  text: string;
};

function Button({ text }: ButtonProps) {
  return (
    <button className="primary-btn">
      {text}
    </button>
  );
}

export default Button;