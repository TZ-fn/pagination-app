import { useQuery } from "@tanstack/react-query";
import queryLatestData from "./queryFunctions/queryData";
import Button from "./components/Button/Button";
import TableRow from "./components/Table/TableRow/TableRow";
import Table from "./components/Table/Table";
import ItemType from "./types/ItemType";
import IconArrowLeft from "./components/icons/IconArrowLeft";
import IconRight from "./components/icons/IconArrowRight";
import "./App.css";

function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ["items"],
    queryFn: queryLatestData,
  });

  const params = new URLSearchParams(location.search);

  if (isPending) return "Loading...";

  if (error) return `There was an error: ${error.message}`;

  return (
    <div className="max-w-2xl px-6 mx-auto flex flex-col align-middle justify-center">
      <label className="flex flex-col max-w-72 my-4 mb-2 text-sm font-medium text-gray-900" htmlFor="searchInput">
        Search by ID
        <input
          id="searchInput"
          className="bg-gray-50 border border-gray-300 text-base text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          placeholder="Enter the ID you're looking for..."
        />
      </label>
      <Table>
        {data.data.map(({ id, name, year, color }: ItemType) => (
          <TableRow key={id} id={id} name={name} year={year} color={color} />
        ))}
      </Table>
      <div className="flex align-middle justify-center gap-2 my-4">
        <Button isDisabled={params.get("page") === null}>
          <span className="sr-only">Previous 5 items</span>
          <IconArrowLeft />
        </Button>
        <Button>
          <span className="sr-only">Next 5 items</span>
          <IconRight />
        </Button>
      </div>
    </div>
  );
}

export default App;
