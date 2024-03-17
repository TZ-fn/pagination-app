import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import queryData from "./queryFunctions/queryData";
import querySearchData from "./queryFunctions/querySearchData";
import Button from "./components/Button/Button";
import TableRow from "./components/Table/TableRow/TableRow";
import Table from "./components/Table/Table";
import ItemType from "./types/ItemType";
import IconArrowLeft from "./components/icons/IconArrowLeft";
import IconRight from "./components/icons/IconArrowRight";
import "./App.css";
import Modal from "./components/Modal/Modal";

function App() {
  // set the default page number when the app loads and there is no page already set
  const url = new URL(location.toString());
  if (!url.searchParams.has("page")) {
    url.searchParams.set("page", "1");
    history.pushState({}, "", url);
  }

  const pageNumber = Number(new URLSearchParams(location.search).get("page")) ?? 1;
  const currentSearch = new URLSearchParams(location.search).get("id") ?? "";

  const [currentPage, setCurrentPage] = useState(pageNumber);

  const [searchID, setSearchID] = useState(currentSearch);
  const debouncedSearchTerm = useDebounce(searchID, 500);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<null | ItemType>(null);

  const viewItemIndexes = {
    page1: [0, 1, 2, 3, 4],
    page2: [5, 6, 7, 8, 9],
    page3: [4, 5],
  };

  function handleSearchIDChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputData = e.target.value;
    setSearchID(inputData);
    const url = new URL(location.toString());
    if (inputData) {
      url.searchParams.set("id", e.target.value);
    } else {
      url.searchParams.delete("id");
    }
    history.pushState({}, "", url);
  }

  function handlePageChange(direction: "backwards" | "forwards") {
    const url = new URL(location.toString());
    const directionModifier = direction === "backwards" ? -1 : 1;
    setCurrentPage((pageNumber) => pageNumber + directionModifier);
    url.searchParams.set("page", `${pageNumber + directionModifier}`);
    history.pushState({}, "", url);
  }

  function handleModalOpening(e: React.MouseEvent<HTMLTableRowElement>) {
    if (isModalOpen) return;
    setIsModalOpen(true);
    // if there is valid search use it in modal
    if (dataSearch.data) {
      setModalData(dataSearch.data);
      // else find an item with matching id from the page's data
    } else {
      setModalData(results.filter((item) => item.id.toString() === e.currentTarget.firstChild?.textContent)[0]);
    }
  }

  function handleModalClosing() {
    setIsModalOpen(false);
  }

  const { isPending, isFetching, isError, error, data } = useQuery({
    queryKey: ["items", currentPage],
    queryFn: () => queryData(currentPage),
    placeholderData: keepPreviousData,
  });

  const {
    isPending: isPendingSearch,
    isFetching: isFetchingSearch,
    isError: isErrorSearch,
    error: errorSearch,
    data: dataSearch,
  } = useQuery({
    queryKey: ["search", Number(debouncedSearchTerm)],
    queryFn: () => querySearchData(Number(debouncedSearchTerm)),
    placeholderData: keepPreviousData,
    staleTime: 500,
    retry: false,
  });

  if (isPending || isFetching || isFetchingSearch || isPendingSearch) return "Loading...";

  if (isError) return `There was an error: ${error.message}`;
  if (isErrorSearch) return `There was an error: ${errorSearch.message}`;

  const numberOfPages = Math.ceil(data.page1.total % 5);

  const results: ItemType[] = [];

  if (data.page1.data && data.page2.data) {
    viewItemIndexes[`page${pageNumber}` as keyof typeof viewItemIndexes].map((index: number) => {
      return results.push([...data.page1.data, ...data.page2.data][index]);
    });
  }

  return (
    <div className="max-w-2xl px-6 mx-auto flex flex-col align-middle justify-center">
      {isModalOpen && (
        <Modal
          id={modalData!.id}
          name={modalData!.name}
          color={modalData!.color}
          year={modalData!.year}
          pantone_value={modalData!.pantone_value}
          closingFunction={handleModalClosing}
        />
      )}
      <label className="flex flex-col max-w-72 my-4 mb-2 text-sm font-medium text-gray-900" htmlFor="searchInput">
        Search by ID
        <input
          id="searchInput"
          value={searchID}
          onChange={(e) => handleSearchIDChange(e)}
          className="bg-gray-50 border border-gray-300 text-base text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          placeholder="Enter the ID you're looking for..."
        />
      </label>
      <Table>
        {dataSearch.data && <TableRow onClick={(e) => handleModalOpening(e)} {...dataSearch.data} />}
        {!dataSearch.data &&
          results.map((item: ItemType) => {
            return <TableRow key={item.id} onClick={(e) => handleModalOpening(e)} {...item} />;
          })}
      </Table>
      <div className="flex align-middle justify-center gap-2 my-4">
        <Button onClick={() => handlePageChange("backwards")} isDisabled={currentPage === 1 || isFetching || isPending}>
          <span className="sr-only">Previous 5 items</span>
          <IconArrowLeft />
        </Button>
        <Button
          onClick={() => handlePageChange("forwards")}
          isDisabled={(currentPage !== null && currentPage > numberOfPages) || isFetching || isPending}
        >
          <span className="sr-only">Next 5 items</span>
          <IconRight />
        </Button>
      </div>
    </div>
  );
}

export default App;
