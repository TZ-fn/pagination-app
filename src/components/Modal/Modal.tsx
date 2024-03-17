import ItemType from "../../types/ItemType";

interface ModalProps extends ItemType {
  closingFunction: () => void;
}

function Modal({ id, name, year, color, pantone_value, closingFunction }: ModalProps) {
  return (
    <div className="fixed z-10 overflow-y-auto top-0 w-full left-0">
      <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-900 opacity-85" />
        </div>
        <div
          className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal"
        >
          <div className="bg-white px-8 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div></div>
            <p className="px-2 py-1">ID: {id}</p>
            <p className="px-2 py-1">Name: {name}</p>
            <p className="px-2 py-1">Year: {year}</p>
            <p className="px-2 py-1" style={{ backgroundColor: `${color}` }}>
              Color: {color}
            </p>
            <p className="px-2 py-1">Pantone value: {pantone_value}</p>
            <button
              className="absolute top-5 right-5 px-2 py-1 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm text-center inline-flex items-center me-2"
              onClick={closingFunction}
            >
              X<span className="sr-only">Close this modal.</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
