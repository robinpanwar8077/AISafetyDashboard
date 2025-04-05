import { createContext } from "react";
interface Incident {
  id: number;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High";
  reported_at: string;
}

const Mycontext = createContext<Incident[]>([]);

interface MyProviderProps {
  children: React.ReactNode;
}

const Myprovider = ({ children }: MyProviderProps) => {
  const initialIncidents: Incident[] = [
    {
      id: 1,
      title: "Biased Recommendation Algorithm",
      description:
        "Algorithm consistently favored certain demographics in product recommendations, creating unequal access to opportunities and resources.",
      severity: "Medium",
      reported_at: "2025-03-15T10:00:00Z",
    },
    {
      id: 2,
      title: "LLM Hallucination in Critical Info",
      description:
        "LLM provided incorrect safety procedure information in an emergency response situation, potentially endangering users who followed the advice.",
      severity: "High",
      reported_at: "2025-04-01T14:30:00Z",
    },
    {
      id: 3,
      title: "Minor Data Leak via Chatbot",
      description:
        "Chatbot inadvertently exposed non-sensitive user metadata in responses, creating a small privacy concern that was quickly addressed.",
      severity: "Low",
      reported_at: "2025-03-20T09:15:00Z",
    },
    {
      id: 4,
      title: "Unexpected Autonomous Decision",
      description:
        "AI system made an operational decision outside its intended parameters during a routine process, though no harm resulted.",
      severity: "Medium",
      reported_at: "2025-03-25T11:45:00Z",
    },
  ];

  return (
    <Mycontext.Provider value={initialIncidents}>{children}</Mycontext.Provider>
  );
};

export { Mycontext, Myprovider };
