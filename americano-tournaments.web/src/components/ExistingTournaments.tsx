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
                        <table className="table-auto m-auto">
                            <thead>
                            <tr>
                                <th className="md:px-4 sm:px-2 py-2">Name</th>
                                <th className="md:px-4 sm:px-2 py-2">Created</th>
                                <th className="md:px-4 sm:px-2 py-2">Edited</th>
                                <th className="md:px-4 sm:px-2 py-2">Players</th>
                                <th className="md:px-4 sm:px-2 py-2">Status</th>
                                <th className="md:px-4 sm:px-2 py-2">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            { tournament != undefined && tournament.map((tournament: tournamentState, index: number) => {
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
                                            <td className="border  border-palayellow-300">
                                                {tournament.PlayersCount}
                                            </td>
                                            <td className="border  border-palayellow-300">
                                                {tournament.Status}
                                            </td>
                                            <td className="border  border-palayellow-300">
                                                {/*poista nappula*/}
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