import FilterControls from "./FilterControls";
import IncidentList from "./IncidentList";

function AISafetyDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 py-8 text-white">
      <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md shadow-gray-700">
        <header className="mb-8 border-b border-gray-700 pb-4">
          <h1 className="text-3xl font-bold text-gray-100">
            AI Safety Incident Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Track and manage potential AI safety incidents
          </p>
        </header>

        <div className="mb-8 bg-gray-700 p-4 rounded-md">
          <FilterControls />
        </div>

        <div>
          <IncidentList />
        </div>
      </div>
    </div>
  );
}

export default AISafetyDashboard;
