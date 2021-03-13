﻿import React, {useState} from "react";
import LocalStorageService from "../services/LocalStorageService";
import tournamentState from "../services/tournamentState";

interface Props {
    selectTournament: Function;
}

export const ExistingTournaments = ({selectTournament}: Props) => {

    var localStorageServicetmp = new LocalStorageService();
    const [tournaments, setTournaments] = useState<tournamentState[]>(localStorageServicetmp.GetTournaments());


    function createAndSelectTournament(tournament: tournamentState) {
        const tournamentinst = tournamentState.getInstance();
        tournamentinst.reloadOldTournament(tournament);
        selectTournament(tournamentinst);
    }

    function deleteTournament(tournament: tournamentState, e: React.MouseEvent<HTMLElement>) {
        e.stopPropagation();
        if(!window.confirm('Haluatko varmasti poistaa tämän turnauksen')) return;
        var localStorageServicetmp =new LocalStorageService();
        setTournaments(tournaments.filter(x => x !== tournament))
        localStorageServicetmp.DeleteTournament(tournament);
    }

    return (
        <div className="bg-gray-700">
            <div className="m-auto">
                <div className="m-auto w-full flex flex-row flex-wrap justify-center items-start">
                    <div className=" m-auto bg-gray-800 text-gray-300 rounded-lg py-8 my-8 xl:w-6/12 md:w-8/12 w-10/12">
                        <table className="table-auto m-auto">
                            <thead>
                            <tr>
                                <th className="md:px-4 sm:px-2 py-2">Name</th>
                                <th className="md:px-4 sm:px-2 py-2">Created</th>
                                <th className="md:px-4 sm:px-2 py-2">Edited</th>
                                <th className="md:px-4 sm:px-2 py-2">Players</th>
                                <th className="md:px-4 sm:px-2 py-2">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            { tournaments !== undefined && tournaments.map((tournament: tournamentState, index: number) => {
                                return (
                                    <>
                                        <tr key={index} onClick={() => createAndSelectTournament(tournament)}>
                                            <td className="border  border-palayellow-300 md:px-4 sm:px-2 py-2">
                                                {tournament.Name}
                                            </td>
                                            <td className="border  border-palayellow-300 md:px-4 sm:px-2 py-2">
                                                {tournament.Created}
                                            </td>
                                            <td className="border  border-palayellow-300">
                                                {tournament.Edited}
                                            </td>
                                            <td className="border  border-palayellow-300 text-right">
                                                {tournament.PlayersCount}
                                            </td>
                                            <td className="border  border-palayellow-300">
                                                <div className="md:flex pb-2">
                                                    <div className="md:w-1/3 mr-3"/>
                                                    <button
                                                        onClick={(e) => deleteTournament(tournament, e)}
                                                        className="bg-palayellow-300 text-gray-900 px-2 py-1 rounded-md"
                                                    >Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
};