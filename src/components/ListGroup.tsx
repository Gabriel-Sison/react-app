import { useState } from "react";

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string, index: number) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  const [selectedItem, setSelectedItem] = useState(-1);

  const getFoodList = () => {
    if (items.length == 0) {
      return (
        <>
          <p>No Item Found</p>
        </>
      );
    } else {
      return (
        <>
          <ul className="list-group">
            {items.map((items, index) => (
              <li
                key={items}
                className={
                  selectedItem == index
                    ? "list-group-item active"
                    : "list-group-item"
                }
                onClick={() => {
                  setSelectedItem(index);
                  onSelectItem(items, index);
                }}
              >
                {items}
              </li>
            ))}
          </ul>
        </>
      );
    }
  };

  return (
    <>
      <h1>{heading}</h1>
      {getFoodList()}
    </>
  );
}

export default ListGroup;
