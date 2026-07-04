import "./Input.css";

type InputProps = {
  type: string;
  placeholder: string;
};

function Input({ type, placeholder }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="input-field"
    />
  );
}

export default Input;