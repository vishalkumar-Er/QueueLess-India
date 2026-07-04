import { useState } from "react";
import "./Input.css";

type InputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input({
  type,
  placeholder,
  value,
  onChange,
}: InputProps) {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-container">

      <input
        type={
          type === "password" && showPassword
            ? "text"
            : type
        }
        placeholder={placeholder}
        className="input-field"
        value={value}
        onChange={onChange}
      />

      {type === "password" && (
        <span
          className="eye-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "🙈" : "👁"}
        </span>
      )}

    </div>
  );
}

export default Input;