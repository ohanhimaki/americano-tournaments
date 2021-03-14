import React, {useState} from "react";
import "./App.css";

import "./tailwindcss/tailwind.css";
import {TournamentSelector} from "./components/TournamentSelector";
import {Tournament} from "./components/tournament/Tournament";
import tournamentState from "./services/tournamentState";


function App() {
    const [selectedTournament, setSelectedTournament] = useState<tournamentState>();


    function selectTournament(tournament?: tournamentState) {
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
                                selectTournament={selectTournament}/>

                        )}

                        {selectedTournament && (
                            <Tournament
                                selectTournament={selectTournament}
                            />
                        )}
                    </div>
    );
}

export default App;
