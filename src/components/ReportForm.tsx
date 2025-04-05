import { useContext, useState, ChangeEvent, FormEvent } from "react";
import { Mycontext } from "../context/ContextData";

interface Incident {
  id: number;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High";
  reported_at: string;
}

interface ReportFormProps {
  onClose?: () => void;
  onSubmitSuccess?: () => void;
}

function ReportForm({ onClose, onSubmitSuccess }: ReportFormProps) {
  const db = useContext(Mycontext);

  const [formData, setFormData] = useState<
    Omit<Incident, "id" | "reported_at">
  >({
    title: "",
    description: "",
    severity: "Medium",
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = { ...formErrors };

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      hasErrors = true;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      hasErrors = true;
    }

    setFormErrors(newErrors);

    if (!hasErrors) {
      const newIncidentData: Incident = {
        id: db.length + 1,
        title: formData.title,
        description: formData.description,
        severity: formData.severity,
        reported_at: new Date().toISOString(),
      };

      db.push(newIncidentData);

      setFormData({
        title: "",
        description: "",
        severity: "Medium",
      });

      if (onSubmitSuccess) {
        onSubmitSuccess();
      } else if (onClose) {
        onClose();
      }
    }
  };

  return (
    <div className="p-6 rounded-md bg-gray-800 text-white shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-300">
          Report New Incident
        </h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-400 focus:outline-none"
          >
            ✕
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className={`w-full border rounded-md p-3 bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 ${
              formErrors.title ? "border-red-500" : "border-gray-600"
            }`}
            value={formData.title}
            onChange={handleInputChange}
          />
          {formErrors.title && (
            <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className={`w-full border rounded-md p-3 bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 ${
              formErrors.description ? "border-red-500" : "border-gray-600"
            }`}
            value={formData.description}
            onChange={handleInputChange}
          />
          {formErrors.description && (
            <p className="mt-1 text-sm text-red-500">
              {formErrors.description}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="severity"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Severity
          </label>
          <select
            id="severity"
            name="severity"
            className="w-full border border-gray-600 rounded-md p-3 bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.severity}
            onChange={handleInputChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReportForm;
