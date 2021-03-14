import React, {useEffect, useState} from "react";
import "./App.css";

import "./tailwindcss/tailwind.css";
import {TournamentSelector} from "./components/TournamentSelector";
import {Tournament} from "./components/tournament/Tournament";
import tournamentState from "./services/tournamentState";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";
const createHistory = require("history").createBrowserHistory;

interface Props {
    selectTournament: Function;
    imported: boolean;
}
function Importer({selectTournament, imported}:Props) {
    var tournamentinst:any = undefined;
    let { importBase64 } = useParams();
    useEffect(() => {
        if (tournamentinst !== undefined) {
        selectTournament(tournamentinst);
            
        }
    });
    if(imported){
        return (<></>)
    } else {
    let jsonString = atob(importBase64);

    var tournament = JSON.parse(jsonString);
     tournamentinst = tournamentState.getInstance();
    tournamentinst.reloadOldTournament(tournament);
    let history = createHistory();
    // window.location.href="/";
    history.push("/");
    return <></>;
        
    }
}

function App() {
    const [selectedTournament, setSelectedTournament] = useState<tournamentState>();
    const [imported, setImported] = useState<boolean>(false);


    function selectTournament(tournament?: tournamentState) {
        setSelectedTournament(tournament);
    }
    function selectTournamentFromImport(tournament?: tournamentState) {
        setImported(true);
        setSelectedTournament(tournament);
    }

    return (
        <Router>
            <Switch>
                <Route path="/import/:importBase64">
                    <Importer
                        selectTournament={selectTournamentFromImport}
                        imported={imported}
                        
                    />
                </Route>
            </Switch>

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
        </Router>
    );
}

export default App;
