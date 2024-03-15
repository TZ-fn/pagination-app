import ItemType from "../../../types/ItemType";
import TableCell from "./TableCell/TableCell";

function TableRow({ id, name, year, color }: Omit<ItemType, "pantone_value">) {
  return (
    // using in-line styles here, because arbitrary values cannot be computed from dynamic values in Tailwind CSS
    <tr key={id} style={{ backgroundColor: `${color}` }} className="border-black border-b-2">
      <TableCell>{id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{year}</TableCell>
    </tr>
  );
}

export default TableRow;
