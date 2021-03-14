import tournamentState from "../../services/tournamentState";
import React from "react";

interface Props {
    selectTournament: Function;
}
export function ImportTournamentForm({selectTournament}: Props) {
    function handleImportSubmit(event: any) {
        event.preventDefault();
        let importJson = event.target.importJson.value;
        console.log(importJson)
        var tournament = JSON.parse(importJson);
        const tournamentinst = tournamentState.getInstance();
        tournamentinst.reloadOldTournament(tournament);
        selectTournament(tournamentinst);
    }

    return (
        <div className="m-auto w-full flex flex-row flex-wrap justify-center items-start">
            <div className=" m-auto bg-gray-800 text-gray-300 rounded-lg py-8 my-8 xl:w-6/12 md:w-8/12 w-10/12">
                <form
                    action=""
                    onSubmit={handleImportSubmit}
                    className="w-full max-w-md m-auto "
                >
                    <div className="md:flex pb-2">
                        <label className="md:w-1/3 md:text-right mr-3" htmlFor="">
                            ImportJson:
                        </label>
                        <input
                            type="text"
                            name="importJson"
                            defaultValue={""}
                            className="md:w-2/3 w-full bg-gray-800 border border-palayellow-300 p-1 text-gray-200 rounded-sm"
                        />
                    </div>
                    <div className="md:flex pb-2">
                        <div className="md:w-1/3 mr-3"/>
                        <input
                            type="submit"
                            value="Submit"
                            className="bg-palayellow-300 text-gray-900 px-2 py-1 rounded-md"
                        />
                    </div>
                </form>
            </div>
        </div>)
}