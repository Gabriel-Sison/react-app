import Button from "./Button";

interface Props {
  placeholder: string;
  color: number;
  onClick: () => void;
  children: string;
  id?: string;
}

const Input = ({ placeholder, color, onClick, children, id }: Props) => {
  return (
    <>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          id={id}
        ></input>
        <Button color={color} onClick={() => onClick()} id={id + "Btn"}>
          {children}
        </Button>
      </div>
    </>
  );
};

export default Input;
