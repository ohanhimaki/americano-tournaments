import React from "react";
import tournamentState from "./models/tournamentState";

interface Props {
    selectTournament: Function;
}
export function NewTournamentForm({selectTournament}:Props) {
    function stringSplit(stringSplit: string, splitWith: string = "\n") {
        const tmpArray: Array<string> = stringSplit.split(splitWith);
        return tmpArray;
    }
    let defaultName = new Date().toDateString() + ' ' + 'turnaus';
    let defaultScore = '16';
    let defaultDateTime = new Date().toDateString();

    let names = `test1
test2
test3
test4
test5
test6
test7
test8`;
    function handleSubmit(event: any) {
        event.preventDefault();
        let players = stringSplit(event.target.Names.value);
        let name = event.target.tournamentName.value;
        tournamentState.createMatches(name, players);
        selectTournament(tournamentState.getInstance());
        console.log(event.target)
    }
    return(
    <div className="m-auto w-full flex flex-row flex-wrap justify-center items-start">
            <div className=" m-auto bg-gray-800 text-gray-300 rounded-lg py-8 my-8 xl:w-6/12 md:w-8/12 w-10/12">
                <form
                    action=""
                    onSubmit={handleSubmit}
                    className="w-full max-w-md m-auto "
                >
                    <div className="md:flex pb-2">
                        <label className="md:w-1/3 md:text-right mr-3" htmlFor="">
                            Name:
                        </label>
                        <input
                            type="text"
                            name="tournamentName"
                            defaultValue={defaultName}
                            className="md:w-2/3 w-full bg-gray-800 border border-palayellow-300 p-1 text-gray-200 rounded-sm"
                        />
                    </div>
                    <div className="md:flex pb-2">
                        <div className="md:w-1/3 md:text-right mr-3">
                            <label htmlFor="">Names:</label>
                        </div>
                        <textarea
                            className="md:w-2/3 w-full bg-gray-800 border border-palayellow-300 p-1 text-gray-200 rounded-sm"
                            name="Names"
                            defaultValue={names}
                            rows={8}
                        />
                    </div>

                    <div className="md:flex pb-2">
                        <label className="md:w-1/3 md:text-right mr-3" htmlFor="">
                            Points:
                        </label>
                        <input
                            type="text"
                            name="points"
                            defaultValue={defaultScore}
                            className="md:w-2/3 w-full bg-gray-800 border border-palayellow-300 p-1 text-gray-200 rounded-sm"
                        />
                    </div>

                    <div className="md:flex pb-2">
                        <label className="md:w-1/3 md:text-right mr-3" htmlFor="">
                            StartTime:
                        </label>
                        <input
                            type="datetime-local"
                            name="startTime"
                            defaultValue={defaultDateTime}
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
        )}
    </div>
)}