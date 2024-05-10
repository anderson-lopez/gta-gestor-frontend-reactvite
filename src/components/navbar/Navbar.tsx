


export const Navbar = ({setSearchTerm, searchTerm}:{setSearchTerm: (value:string) => void, searchTerm: string}) => {

  return (
    <div className="w-full h-[3.5rem] flex  items-center justify-end px-8">
      <form className="flex">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-[17rem]">
          <input
            type="text"
            placeholder="Search employee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-500 text-gray-900 text-sm rounded-lg block w-[17rem] p-2.5 dark:bg-[#0c0c0c] dark:border-gray-800 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>
    </div>
  );
};
