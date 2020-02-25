import React from "react";
import "./App.css";
import { Newtournament } from "./new-tournament/Newtournament";

import "./tailwindcss/tailwind.css";

function App() {
  return (
    <div className="m-auto page-container">
      <Newtournament></Newtournament>
    </div>
  );
}

export default App;
