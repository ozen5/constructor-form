import React from "react";

import { H2 } from "@blueprintjs/core";
import FormConstructor from "./components/FormConstructor";

const App: React.FC = () => {
  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
      <H2>Конструктор</H2>
      <FormConstructor />
    </div>
  );
};

export default App;