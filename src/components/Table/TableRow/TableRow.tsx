import ItemType from "../../../types/ItemType";
import TableCell from "./TableCell/TableCell";

interface TableRowProps extends ItemType {
  onClick: React.MouseEventHandler<HTMLTableRowElement>;
}

function TableRow({ id, name, year, color, onClick }: TableRowProps) {
  return (
    // using in-line styles here, because arbitrary values cannot be computed from dynamic values in Tailwind CSS
    <tr onClick={onClick} style={{ backgroundColor: `${color}` }} className="border-black border-b-2 cursor-pointer">
      <TableCell>{id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{year}</TableCell>
    </tr>
  );
}

export default TableRow;
