import { ReactNode } from "react";

function TableCell({ children }: { children: ReactNode }) {
  return <td className="px-6 py-3">{children}</td>;
}

export default TableCell;
