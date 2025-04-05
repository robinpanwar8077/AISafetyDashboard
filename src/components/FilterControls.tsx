import { useState, useEffect } from "react";
import ReportForm from "./ReportForm";

function FilterControls() {
  const [filter, setFilter] = useState<"All" | "Low" | "Medium" | "High">(
    "All"
  );
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("filterinfo", JSON.stringify({ sortOrder, filter }));
  }, [filter, sortOrder]);

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFormSubmitSuccess = () => {
    setShowForm(false);
  };

  return (
    <div className="relative text-white">
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4">
          <div>
            <label
              htmlFor="filterSeverity"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Filter by Severity
            </label>
            <select
              id="filterSeverity"
              className="w-full border border-gray-700 rounded-md p-2 bg-gray-800 text-white focus:ring-indigo-500 focus:border-indigo-500"
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as "All" | "Low" | "Medium" | "High")
              }
            >
              <option value="All">All Severities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="sortOrder"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Sort by Date
            </label>
            <select
              id="sortOrder"
              className="w-full border border-gray-700 rounded-md p-2 bg-gray-800 text-white focus:ring-indigo-500 focus:border-indigo-500"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as "newest" | "oldest")
              }
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        <div>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel Report" : "Report New Incident"}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-2xl w-full mx-4">
            <ReportForm
              onClose={handleCloseForm}
              onSubmitSuccess={handleFormSubmitSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterControls;
