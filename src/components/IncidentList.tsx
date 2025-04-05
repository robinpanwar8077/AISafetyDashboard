import { useContext, useEffect, useState } from "react";
import { Mycontext } from "../context/ContextData";
import { ChevronDown, ChevronUp } from "lucide-react";

const useFilterInfo = () => {
  const getFilterInfoFromStorage = () => {
    try {
      const storageData = sessionStorage.getItem("filterinfo");
      if (!storageData) return { filter: "All", sortOrder: "newest" };
      return JSON.parse(storageData);
    } catch (error) {
      console.error("Error parsing filter info from session storage:", error);
      return { filter: "All", sortOrder: "newest" };
    }
  };

  const [filterInfo, setFilterInfo] = useState(getFilterInfoFromStorage);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "filterinfo" && e.newValue) {
        try {
          setFilterInfo(JSON.parse(e.newValue));
        } catch (error) {
          console.error("Error parsing filter info from storage event:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    const intervalId = setInterval(() => {
      setFilterInfo(getFilterInfoFromStorage());
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  return filterInfo;
};

function IncidentList() {
  const incidents = useContext(Mycontext);
  const { filter, sortOrder } = useFilterInfo();
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low":
        return "bg-green-700 text-green-100";
      case "Medium":
        return "bg-yellow-700 text-yellow-100";
      case "High":
        return "bg-red-700 text-red-100";
      default:
        return "bg-gray-700 text-gray-100";
    }
  };

  const toggleDetails = (id: number) => {
    const newExpandedIds = new Set(expandedIds);
    if (expandedIds.has(id)) {
      newExpandedIds.delete(id);
    } else {
      newExpandedIds.add(id);
    }
    setExpandedIds(newExpandedIds);
  };

  const filteredIncidents = incidents.filter(
    (incident) => filter === "All" || incident.severity === filter
  );

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="border border-gray-700 rounded-md overflow-hidden text-white">
      <div className="bg-gray-800 p-3 flex font-medium text-gray-300">
        <div className="w-1/2">Title</div>
        <div className="w-1/4">Severity</div>
        <div className="w-1/4">Reported Date</div>
      </div>

      {sortedIncidents.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No incidents found matching your criteria
        </div>
      ) : (
        <div>
          {sortedIncidents.map((incident) => (
            <div key={incident.id}>
              <div className="border-t border-gray-700">
                <div
                  className="p-3 flex items-center hover:bg-gray-700 cursor-pointer"
                  onClick={() => toggleDetails(incident.id)}
                >
                  <div className="w-1/2 font-medium">{incident.title}</div>
                  <div className="w-1/4">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(
                        incident.severity
                      )}`}
                    >
                      {incident.severity}
                    </span>
                  </div>
                  <div className="w-1/4 text-sm text-gray-400">
                    {formatDate(incident.reported_at)}
                  </div>
                  <div className="ml-auto">
                    {expandedIds.has(incident.id) ? (
                      <ChevronUp size={16} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-400" />
                    )}
                  </div>
                </div>

                {expandedIds.has(incident.id) && (
                  <div className="p-4 bg-gray-900 border-t border-gray-700">
                    <h3 className="font-semibold mb-2 text-gray-300">
                      Description:
                    </h3>
                    <p className="text-gray-400">{incident.description}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default IncidentList;
