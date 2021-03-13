import {NewTournament} from "./new-tournament/NewTournament";
import {ExistingTournaments} from "./ExistingTournaments";
import React from "react";

interface Props {
    selectTournament: Function;
}

export function TournamentSelector({selectTournament}:Props) {
    return (
        <div>

            <NewTournament
            selectTournament={selectTournament}
            ></NewTournament>
            <ExistingTournaments
                selectTournament={selectTournament}
            ></ExistingTournaments>
        </div>
    )
}