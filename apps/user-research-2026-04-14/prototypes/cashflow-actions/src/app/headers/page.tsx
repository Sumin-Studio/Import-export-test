import { headers } from "next/headers";

export default async function Page() {
  const headersList = await headers();

  // Convert headers to an object for easier display
  const allHeaders = Object.fromEntries(headersList.entries());

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Available Headers</h1>
      <div className="space-y-2">
        {Object.entries(allHeaders).map(([key, value]) => (
          <div key={key} className="border-b pb-2">
            <strong className="text-blue-600">{key}:</strong>{" "}
            <span className="break-all">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 text-sm text-gray-600">
        Total headers: {Object.keys(allHeaders).length}
      </div>
    </div>
  );
}
