import Alert from "./components/Alert";
import Button from "./components/Button";
import FoodInput from "./components/FoodInput";
import Input from "./components/Input.js";
import { useState, useEffect } from "react";

import "./basic.css";
import useFetch from "./useFetch.js";
import ChangingList from "./components/ChangingList";

function App() {
  const [pressed, setPressed] = useState(false);
  const [name, setName] = useState(" ");
  const [foodSort, setFoodSort] = useState("");
  const db = "http://localhost:8000/ingredients";

  var calories = 2000;
  var goalCal = 2000;
  var goal = "Lose";
  if (pressed) {
    goalCal = 2000 - 500;
    goal = "Maintain";
  }

  // npx json-server --watch data/db.json --port 8000
  const { data: list, setData, isPending, error } = useFetch(db + foodSort);

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
    await fetch(db + "/" + id, {
      method: "DELETE",
    });
    await fetch(db, {
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

    await fetch(db)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }

  async function restartFoods() {
    for (let curr in list) {
      const item = list[curr];
      if (!item.show) {
        console.log("we are adding " + item.name);
        await fetch(db + "/" + item.id, {
          method: "DELETE",
        });
        await fetch(db, {
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

    await fetch(db)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }

  useEffect(() => {
    const nameInputBtn = document.getElementById("nameInputBtn");
    nameInputBtn?.addEventListener("click", nameInputFunction);
  }, []);
  function nameInputFunction() {
    const currName = document.getElementById("nameInput");
    setName(currName?.value);
  }

  useEffect(() => {
    const foodInputBtn = document.getElementById("foodInputBtn");
    foodInputBtn?.addEventListener("click", foodInputFunction);
  }, []);

  async function foodInputFunction() {
    const name = document.getElementById("foodInputName");
    const serving = document.getElementById("foodInputPortion");
    const type = document.getElementById("foodInputType");
    const fats = document.getElementById("foodInputFats");
    const carbs = document.getElementById("foodInputCarbs");
    const proteins = document.getElementById("foodInputProteins");

    await fetch(db, {
      method: "POST",
      body: JSON.stringify({
        name: name?.value,
        serving: Number(serving?.value),
        type: type?.value,
        fats: Number(fats?.value),
        carbs: Number(carbs?.value),
        proteins: Number(proteins?.value),
        show: true,
      }),
    });

    await fetch(db)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
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
        onClick={() => nameInputBtn?.onclick}
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

      <FoodInput
        db={db}
        color={3}
        id="foodInput"
        onClick={() => foodInputBtn.onclick}
      >
        Enter
      </FoodInput>

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
