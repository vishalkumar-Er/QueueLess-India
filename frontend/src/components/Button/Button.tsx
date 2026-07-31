import "./Button.css";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

function Button({
  text,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      className="primary-btn"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;