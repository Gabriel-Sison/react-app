import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

interface Props {
  list: Object;
  heading: string;
  handleDelete: (id: string, list) => void;
}

const ChangingList = ({ list, heading, handleDelete }: Props) => {
  const [x, setX] = useState(0);

  function getInput(name: String, go: boolean) {
    if (go) {
      // const input = 0;
      const input = document.getElementById(name).value;
      return Number(input);
    } else {
      return 0;
    }
  }

  return (
    <>
      <h1>{heading}</h1>
      <div className="container text-left">
        {list.map((list) => {
          if (list.show) {
            return (
              <div className="row" key={list.id} draggable>
                <div className="col">
                  <Input placeholder={"Portion"} color={4} id={list.name} onClick={() => this.forceUpdate()}>
                    {" "}
                    Enter
                  </Input>
                </div>
                <p className="col">{list.type} of {list.name}</p>
                <div className="col">
                  <p>{Math.round(100 * (getInput(list.name, list.show) / list.serving * list.fats)) / 100} F</p>
                </div>
                <div className="col">
                  <p>{Math.round(100 * (getInput(list.name, list.show) / list.serving * list.proteins)) / 100} P</p>
                </div>
                <div className="col">
                  <p>{Math.round(100 * (getInput(list.name, list.show) / list.serving * list.carbs)) / 100} C</p>
                </div>

                <div className="col delete">
                  <Button color={5} onClick={() => handleDelete(list.id, list)}>
                    Delete
                  </Button>
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default ChangingList;
