import React from "react";
import "./App.css";
import { Newtournament } from "./new-tournament/Newtournament";

import "./tailwindcss/tailwind.css";

function App() {
  return (
    <div className="m-auto page-container">
      <div className="w-screen flex m-auto justify-center">
        <h1 className="m-auto md:text-6xl text-3xl font-bold font-black mx-10 banner-title">
          Padel Tournament Generator
        </h1>
      </div>
      <Newtournament></Newtournament>
    </div>
  );
}

export default App;
