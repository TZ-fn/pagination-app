import { ReactNode, useState } from "react";

interface ListProps {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function List({ children }: ListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
