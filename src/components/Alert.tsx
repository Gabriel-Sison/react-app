import { ReactNode, useState } from "react";
import Button from "./Button";

interface Props {
  children: ReactNode;
  name: string;
  color: number;
}

const Alert = ({ children, color, name }: Props) => {
  const [alertVisible, setAlertVisible] = useState(false);

  return (
    <>
      {alertVisible && (
        <div
          className="alert alert-primary alert-dismissible"
          onClick={() => setAlertVisible(false)}
        >
          {children}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      <Button
        color={color}
        onClick={() => {
          setAlertVisible(true);
        }}
      >
        {name}
      </Button>
    </>
  );
};

export default Alert;
