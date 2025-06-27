import "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

// biome-ignore lint/style/noNonNullAssertion: "TODO"
const root = createRoot(document.getElementById("root")!);
root.render(<App />);
