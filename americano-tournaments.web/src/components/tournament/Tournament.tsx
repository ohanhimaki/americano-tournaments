import {GroupLeaderboard} from "./GroupLeaderboard";
import {Matches} from "./Matches";
import React, {useState} from "react";

interface Props {
    selectTournament: Function;
}


export function Tournament({selectTournament}:Props) {

    const [highlightedPlayer, sethighlightedPlayer] = useState("");
    const [updated, setupdated] = useState(new Date());
    
    
    function highlightPlayer(playername: string) {
        if (!playername) {
            return;
        } else if (playername === highlightedPlayer) {
            sethighlightedPlayer("");
            return;
        }

        sethighlightedPlayer(playername);
    }
    function pageupdated() {
        setupdated(new Date());
    }

    return(
        
    <div className="m-auto w-full flex flex-row flex-wrap justify-center items-start">
        <div className="md:flex pb-2">
            <div className="md:w-1/3 mr-3"/>
            <button
                onClick={() => selectTournament(undefined)}
                className="bg-palayellow-300 text-gray-900 px-2 py-1 rounded-md"
            >Back
            </button>
        </div>
        <div className="xl:w-4/12 w-full xl:order-2 px-8 flex-initial">
            <GroupLeaderboard
                updated={updated}
                highlightPlayer={highlightPlayer}
                highlightedPlayer={highlightedPlayer}
            />
        </div>
            <div className="xl:w-5/12 w-full xl:order-1 px-8">
                <Matches
                    updated={updated}
                    pageupdated={pageupdated}
                    highlightedPlayer={highlightedPlayer}
                    highlightPlayer={highlightPlayer}
                />
            </div>
    </div>
        )

}