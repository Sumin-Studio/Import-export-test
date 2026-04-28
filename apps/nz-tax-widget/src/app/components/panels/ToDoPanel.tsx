"use client";

import { Search } from "@/app/components/ui/icons";
import { useNavigation } from "@/app/contexts/NavigationContext";

export default function ToDoPanel() {
  const { isScrolled } = useNavigation();

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center space-x-3">
        <Search className="h-5 w-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">To Do</h2>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search anything..."
          aria-label="Search to-do items"
          className="w-full"
        />

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Recent Searches</h3>
          <div className="space-y-1">
            {["Project Alpha", "User Management", "Analytics Dashboard"].map(
              (item, index) => (
                <div
                  key={index}
                  className="cursor-pointer rounded p-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>

        {isScrolled && (
          <div className="mt-4 rounded-lg bg-blue-50 p-3">
            <p className="text-sm text-blue-700">
              Scroll detected - showing compact view
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
