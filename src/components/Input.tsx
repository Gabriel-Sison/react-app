import Button from "./Button";

interface Props {
  placeholder: string;
  color: number;
  onClick: () => void;
}

const Input = ({ placeholder, color, onClick }: Props) => {
  return (
    <>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        ></input>
        <Button
          color={color}
          onClick={() => {
            onClick();
          }}
        >
          Enter name
        </Button>
      </div>
    </>
  );
};

export default Input;
