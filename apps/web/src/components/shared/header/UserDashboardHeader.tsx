const UserDashboardHeader = () => {
  return (
    <header className="border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex items-center">
        <div className="mr-8 flex items-center">
          <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-md bg-green-500 text-white">
            <span className="text-sm font-bold">P</span>
          </div>
          <span className="font-semibold text-gray-800">PetSync</span>
        </div>
        <span className="mr-auto text-gray-700">OverView</span>

        <div className="relative mx-2 max-w-md flex-1">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-full border border-gray-200 bg-gray-100 py-2 pl-10 pr-4 text-sm"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          <span className="absolute right-3 top-2.5 text-gray-400">K</span>
        </div>

        <div className="mx-2 flex items-center">
          <div className="mr-2 flex items-center rounded-md border border-gray-200 bg-white px-3 py-1.5">
            <span className="mr-2 text-sm text-gray-600">Feb</span>
            <span className="text-gray-400">▼</span>
          </div>
          <div className="flex items-center rounded-md border border-gray-200 bg-white px-3 py-1.5">
            <span className="mr-2 text-sm text-gray-600">Adoption</span>
            <span className="text-gray-400">▼</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export { UserDashboardHeader };
