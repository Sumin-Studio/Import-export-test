export default function ExpensesPage() {
  return (
    <div className="min-h-screen bg-background-primary">
      {/* Page Header - similar to dashboard */}
      <div className="mb-6 overflow-hidden bg-white py-4 sm:py-5 2xl:py-7">
        <div className="container mx-auto max-w-full md:flex md:items-center md:justify-between 2xl:w-[1424px] 3xl:w-[1900px]">
          <div className="flex items-center gap-4">
            <div className="flex size-8 items-center justify-center overflow-hidden rounded-[3px] bg-[#9EEEFD] text-[13px]/[20px] font-bold text-[#154D58] md:size-10 md:text-[17px]/[28px]">
              FS
            </div>
            <h1 className="text-[21px]/[26px] font-bold sm:text-[24px]/[32px] 2xl:text-[32px]/[32px]">
              Expenses
            </h1>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="container mx-auto max-w-full 2xl:w-[1424px] 3xl:w-[1900px]">
        <div className="bg-white rounded-xl p-6">
          <p className="text-content-secondary">
            Expenses page content will go here.
          </p>
        </div>
      </div>
    </div>
  );
}

