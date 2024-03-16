import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import queryData from "./queryFunctions/queryData";
import Button from "./components/Button/Button";
import TableRow from "./components/Table/TableRow/TableRow";
import Table from "./components/Table/Table";
import ItemType from "./types/ItemType";
import IconArrowLeft from "./components/icons/IconArrowLeft";
import IconRight from "./components/icons/IconArrowRight";
import "./App.css";

function App() {
  // set the default page number when the app loads and there is no page already set
  const url = new URL(location.toString());
  if (!url.searchParams.has("page")) {
    url.searchParams.set("page", "1");
    history.pushState({}, "", url);
  }

  const pageNumber = Number(new URLSearchParams(location.search).get("page")) ?? 1;

  const [currentPage, setCurrentPage] = useState(pageNumber);

  const viewItemIndexes = {
    1: [0, 1, 2, 3, 4],
    2: [5, 6, 7, 8, 9],
    3: [4, 5],
  };

  function handlePageChange(direction: "backwards" | "forwards") {
    const url = new URL(location.toString());
    const directionModifier = direction === "backwards" ? -1 : 1;
    setCurrentPage((pageNumber) => pageNumber + directionModifier);
    url.searchParams.set("page", `${pageNumber + directionModifier}`);
    history.pushState({}, "", url);
  }

  const { isPending, error, data } = useQuery({
    queryKey: ["items", currentPage],
    queryFn: () => queryData(pageNumber),
    placeholderData: keepPreviousData,
  });

  if (isPending) return "Loading...";

  if (error) return `There was an error: ${error.message}`;

  const numberOfPages = Math.ceil(data.page1.total % 5);

  const results: ItemType[] = [];

  if (data.page1.data && data.page2.data) {
    viewItemIndexes[currentPage].map((index: number) => {
      return results.push([...data.page1.data, ...data.page2.data][index]);
    });
  }

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
      {console.log(results)}
      <Table>
        {results &&
          results.length > 1 &&
          results.map(({ id, name, year, color }: ItemType) => {
            return <TableRow key={id} id={id} name={name} year={year} color={color} />;
          })}
      </Table>
      <div className="flex align-middle justify-center gap-2 my-4">
        <Button onClick={() => handlePageChange("backwards")} isDisabled={currentPage === 1}>
          <span className="sr-only">Previous 5 items</span>
          <IconArrowLeft />
        </Button>
        <Button
          onClick={() => handlePageChange("forwards")}
          isDisabled={currentPage !== null && currentPage > numberOfPages}
        >
          <span className="sr-only">Next 5 items</span>
          <IconRight />
        </Button>
      </div>
    </div>
  );
}

export default App;
