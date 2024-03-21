import Button from "./Button";

interface Props {
  color: number;
  onClick: () => void;
  children: string;
  db: string;
  id?: string;
}

const Input = ({color, onClick, children, id }: Props) => {
  return (
    <>
      <div className="input-group mb-3">
        <input
          type="text"
          placeholder="Name"
          className="form-control"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          id={id + "Name"}
        ></input>
        <input
          type="text"
          placeholder="Portion"
          className="form-control"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          id={id + "Portion"}
        ></input>
        <input
          type="text"
          placeholder="Type"
          className="form-control"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          id={id + "Type"}
        ></input>
        <input
          type="text"
          placeholder="Fats"
          className="form-control"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          id={id + "Fats"}
        ></input>
        <input
          type="text"
          placeholder="Proteins"
          className="form-control"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          id={id + "Proteins"}
        ></input>
        <input
          type="text"
          placeholder="Carbs"
          className="form-control"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          id={id + "Carbs"}
        ></input>
        <Button color={color} onClick={() => onClick()} id={id + "Btn"}>
          {children}
        </Button>
      </div>
    </>
  );
};

export default Input;
