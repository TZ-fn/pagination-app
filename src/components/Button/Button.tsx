import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
}

function Button({ children, onClick, isDisabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

export default Button;
