import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Myprovider } from "./context/ContextData.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Myprovider>
      {" "}
      <App />{" "}
    </Myprovider>
  </StrictMode>
);
