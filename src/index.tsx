import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Importing from a single file (as `mycount` and `App` are in the same file)
import Test from "./Test";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App /> {/* Corrected to properly render the `mycount` component */}
  </React.StrictMode>
);
