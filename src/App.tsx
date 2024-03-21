import Alert from "./components/Alert";
import Button from "./components/Button";
import Input from "./components/Input.js";
import { useState } from "react";

import "./basic.css";
import useFetch from "./useFetch.js";
import ChangingList from "./components/ChangingList";

function App() {
  const [pressed, setPressed] = useState(false);
  const [name, setName] = useState(" ");
  const [foodSort, setFoodSort] = useState("");

  var calories = 2000;
  var goalCal = 2000;
  var goal = "Lose";
  if (pressed) {
    goalCal = 2000 - 500;
    goal = "Maintain";
  }

  // npx json-server --watch data/db.json --port 8000
  const {
    data: list,
    setData,
    isPending,
    error,
  } = useFetch("http://localhost:8000/ingredients" + foodSort);

  async function handleDelete(
    id: string,
    item: {
      name: any;
      serving: any;
      type: any;
      fats: any;
      carbs: any;
      proteins: any;
      id: any;
    }
  ) {
    await fetch("http://localhost:8000/ingredients/" + id, {
      method: "DELETE",
    });

    await fetch("http://localhost:8000/ingredients", {
      method: "POST",
      body: JSON.stringify({
        name: item.name,
        serving: item.serving,
        type: item.type,
        fats: item.fats,
        carbs: item.carbs,
        proteins: item.proteins,
        id: item.id,
        show: false,
      }),
    });

    await fetch("http://localhost:8000/ingredients")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }

  async function restartFoods() {
    for (let curr in list) {
      const item = list[curr];
      if (!item.show) {
        console.log("we are adding " + item.name);
        await fetch("http://localhost:8000/ingredients/" + item.id, {
          method: "DELETE",
        });
        await fetch("http://localhost:8000/ingredients", {
          method: "POST",
          body: JSON.stringify({
            name: item.name,
            serving: item.serving,
            type: item.type,
            fats: item.fats,
            carbs: item.carbs,
            proteins: item.proteins,
            id: item.id,
            show: true,
          }),
        });
      }
    }

    await fetch("http://localhost:8000/ingredients")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }

  const btn1 = document.getElementById('nameInputBtn'); 
  function but1Function() {
    const txt1 = document.getElementById('nameInput'); 
    setName(txt1?.value)
  }

  return (
    <>
      <Alert color={2} name={"Begin"}>
        Welcome to macrotracker.com! Just trust the process.
      </Alert>
      <Button
        color={0}
        onClick={() => {
          setPressed(!pressed);
        }}
      >
        {pressed ? "Lose Weight" : "Maintain Weight"}
      </Button>

      <Input
        placeholder={"Enter Name"}
        color={3}
        id="nameInput"
        onClick={() => btn1?.addEventListener('click', but1Function)}
      >
        Enter Name
      </Input>

      <h1>Hello {name}</h1>
      <p>
        You have a default {calories} calories. You need to eat {goalCal}{" "}
        calories if you want to {goal.toLowerCase()} weight.
      </p>

      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {list && (
        <ChangingList
          heading={"Foods"}
          list={list}
          handleDelete={handleDelete}
        ></ChangingList>
      )}
      <Button color={4} onClick={() => restartFoods()}>
        Restart
      </Button>

      <h2>Sort by</h2>
      <Button
        color={8}
        onClick={() => {
          setFoodSort("?_sort=fats");
        }}
      >
        Fats
      </Button>
      <Button
        color={8}
        onClick={() => {
          setFoodSort("?_sort=proteins");
        }}
      >
        Proteins
      </Button>
      <Button
        color={8}
        onClick={() => {
          setFoodSort("?_sort=carbs");
        }}
      >
        Carbs
      </Button>
    </>
  );
}

export default App;
