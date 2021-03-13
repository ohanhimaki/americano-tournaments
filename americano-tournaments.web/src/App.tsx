import React, {useState} from "react";
import "./App.css";

import "./tailwindcss/tailwind.css";
import {TournamentSelector} from "./TournamentSelector";
import {Tournament} from "./Tournament";
import tournamentState from "./new-tournament/models/tournamentState";


function App() {
    const [selectedTournament, setSelectedTournament] = useState<tournamentState>();

    function selectTournament(tournament?:tournamentState) {
        setSelectedTournament(tournament);
    }
    return (
    <div className="m-auto page-container">
      <div className="w-screen flex m-auto justify-center">
        <h1 className="m-auto md:text-6xl text-3xl font-bold font-black mx-10 banner-title">
          Padel Tournament Generator
        </h1>
      </div>
        {selectedTournament === undefined && (
            <TournamentSelector
            selectTournament={selectTournament}></TournamentSelector>
            
        )}

        {selectedTournament  && (
            <Tournament></Tournament>
        )}
    </div>
  );
}

export default App;
