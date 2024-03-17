import { ReactNode } from "react";

interface ListProps {
  children: ReactNode;
}

function List({ children }: ListProps) {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-black-500 text-lg">
      <thead className="text-lg text-black-700 uppercase bg-gray-50">
        <tr>
          <th className="px-6 py-3">ID</th>
          <th className="px-6 py-3">Name</th>
          <th className="px-6 py-3">Year</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export default List;
