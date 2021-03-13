﻿import {GroupLeaderboard} from "./GroupLeaderboard";
import {Matches} from "./Matches";
import React, {useState} from "react";
import tournamentState from "../../services/tournamentState";

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
<button
    onClick={() => selectTournament(undefined)}
>test</button>
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