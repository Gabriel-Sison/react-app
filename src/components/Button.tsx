interface Props {
  children: string;
  color: number;
  onClick: () => void;
  id?: string;
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

const Button = ({ children, onClick, color, id}: Props) => {
  return (
    <>
      <button
        type="button"
        onClick={() => {
          onClick();
        }}
        className={"btn btn-" + colors[color % 9]}
        id = {id}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
