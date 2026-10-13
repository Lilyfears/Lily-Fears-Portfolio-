import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import TechPage from "./pages/TechPage";
import "./styles.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root not found");
}

// Static site, so routing is a simple path check. /tech is served by the
// rewrite in vercel.json; everything else renders the main portfolio.
const isTech = window.location.pathname.replace(/\/+$/, "") === "/tech";
if (isTech) document.documentElement.dataset.page = "tech";

createRoot(rootElement).render(<StrictMode>{isTech ? <TechPage /> : <App />}</StrictMode>);
