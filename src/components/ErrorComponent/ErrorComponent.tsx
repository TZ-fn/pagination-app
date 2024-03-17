function TableCell({ errorMessage }: { errorMessage: string }) {
  return (
    <div className="max-w-2xl px-6 py-6 mx-auto flex flex-col align-middle justify-center">
      <div className="flex justify-center align-middle">
        <p className="text-center">There was an error: {errorMessage}</p>
        <a className="underline" href="/">
          Go back to the main page.
        </a>
      </div>
      <svg className=" h-10 w-10 m-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88">
        <title>cross</title>
        <path
          className="fill-red-600"
          d="M6,6H6a20.53,20.53,0,0,1,29,0l26.5,26.49L87.93,6a20.54,20.54,0,0,1,29,0h0a20.53,20.53,0,0,1,0,29L90.41,61.44,116.9,87.93a20.54,20.54,0,0,1,0,29h0a20.54,20.54,0,0,1-29,0L61.44,90.41,35,116.9a20.54,20.54,0,0,1-29,0H6a20.54,20.54,0,0,1,0-29L32.47,61.44,6,34.94A20.53,20.53,0,0,1,6,6Z"
        />
      </svg>
    </div>
  );
}

export default TableCell;
