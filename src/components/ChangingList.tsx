import Button from "./Button";

interface Props {
  list: Object;
  heading: string;
  handleDelete: (id: string, list) => void;
}

const ChangingList = ({ list, heading, handleDelete }: Props) => {
  return (
    <>
      <h1>{heading}</h1>
      <div className="container text-left">
        {list.map((list) => {
          if (list.show) {
            return (
              <div className="row" key={list.id} draggable>
                <div className="col">
                  <p>{list.name}:</p>
                </div>
                <div className="col">
                  <p>
                    {list.serving} {list.type}
                  </p>
                </div>
                <div className="col">
                  <p>{list.fats}F</p>
                </div>
                <div className="col">
                  <p>{list.proteins}P</p>
                </div>
                <div className="col">
                  <p>{list.carbs}C</p>
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
