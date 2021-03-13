import React from "react";
import LocalStorageService from "../services/LocalStorageService";
import Match from "../models/tournament";
import tournamentState from "../services/tournamentState";

interface Props {
    selectTournament: Function;
}

export const ExistingTournaments = ({selectTournament}: Props) => {
    var localStorageServicetmp = new LocalStorageService();
    var tournament = localStorageServicetmp.GetTournaments();


    function createAndSelectTournament(tournament: tournamentState) {
        const tournamentinst = tournamentState.getInstance();
        tournamentinst.reloadOldTournament(tournament);
        selectTournament(tournamentinst);
    }

    return (
        <div className="bg-gray-700">
            <div className="m-auto">
                <div className="m-auto w-full flex flex-row flex-wrap justify-center items-start">
                    <div className=" m-auto bg-gray-800 text-gray-300 rounded-lg py-8 my-8 xl:w-6/12 md:w-8/12 w-10/12">
                        {tournament.map((tournament: tournamentState, index: number) => {
                            return (
                                <div onClick={() => createAndSelectTournament(tournament)}>
                                    {tournament.name}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
};