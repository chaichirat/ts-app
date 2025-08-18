import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n/i18";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(<App />);
