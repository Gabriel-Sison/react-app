import { useState } from "react";

interface Props {
  children: string;
  color: number;
  onClick: () => void;
}

const colors: string[] = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
  "link",
];

const Button = ({
  children,
  onClick = () => {
    let x = 1;
  },
  color = 0,
}: Props) => {
  const [colIdx, setColor] = useState(color);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onClick();
          setColor(color);
        }}
        className={"btn btn-" + colors[colIdx % 9]}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
