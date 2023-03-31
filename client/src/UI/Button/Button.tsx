import React from "react";

interface IButton {
  text: string;
  onClick: () => void;
  styles?: string;
}
const Button = ({ text, onClick, styles }: IButton) => {
  return (
    <button
      onClick={onClick}
      className={`${styles} p-3  bg-black text-[white] rounded-2xl `}
    >
      {text}
    </button>
  );
};

export default Button;
