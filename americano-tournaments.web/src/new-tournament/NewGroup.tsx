import React, { useState } from "react";

import tournamentState from "./models/tournamentState";
import { Matches } from "./Matches";
import { GroupLeaderboard } from "./GroupLeaderboard";
import { Player } from "./models/tournament";

export const NewGroup = () => {
  const [updated, setupdated] = useState(new Date());
  const tournamentInst = tournamentState.getInstance();
  const [highlightedPlayer, sethighlightedPlayer] = useState("");

  function stringSplit(stringSplit: string, splitwith: string = "\n") {
    var tmpArray: Array<string> = stringSplit.split("\n");
    return tmpArray;
  }

  function highlightPlayer(playername: string) {
    if (!playername) {
      return;
    } else if (playername === highlightedPlayer) {
      sethighlightedPlayer("");
      return;
    }

    sethighlightedPlayer(playername);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    let players = stringSplit(event.target.Names.value);
    tournamentState.createMatches(players);
    setupdated(new Date());
  }

  function pageupdated() {
    setupdated(new Date());
  }

  let names = `test1
test2
test3
test4
test5
test6
test7
test8`;
  return (
    <div className=" m-auto items-center">
      {tournamentInst.matches.length === 0 && (
        <div className=" m-auto max-w-2xl bg-gray-800 text-gray-300 rounded-lg py-8 my-8">
          <form
            action=""
            onSubmit={handleSubmit}
            className="w-full max-w-md m-auto "
          >
            <div className="md:flex pb-2">
              <div className="md:w-1/3 text-right mr-3">
                <label htmlFor="">Names:</label>
              </div>
              <textarea
                className="md:w-2/3 bg-gray-800 border border-palayellow-300 p-1 text-gray-200 rounded-sm"
                name="Names"
                defaultValue={names}
                rows={8}
              ></textarea>
            </div>

            <div className="md:flex pb-2">
              <label className="md:w-1/3 text-right mr-3" htmlFor="">
                Points:
              </label>
              <input
                type="text"
                name="points"
                className="md:w-2/3 bg-gray-800 border border-palayellow-300 p-1 text-gray-200 rounded-sm"
              ></input>
            </div>

            <div className="md:flex pb-2">
              <label className="md:w-1/3 text-right mr-3" htmlFor="">
                StartTime:
              </label>
              <input
                type="datetime-local"
                name="startTime"
                className="md:w-2/3 bg-gray-800 border border-palayellow-300 p-1 text-gray-200 rounded-sm"
              ></input>
            </div>
            <div className="md:flex pb-2">
              <div className="md:w-1/3 mr-3"></div>
              <input
                type="submit"
                value="Submit"
                className="bg-palayellow-300 text-gray-900 px-2 py-1 rounded-md"
              ></input>
            </div>
          </form>
        </div>
      )}
      {tournamentInst.matches.length !== 0 && (
        <GroupLeaderboard
          updated={updated}
          highlightPlayer={highlightPlayer}
          highlightedPlayer={highlightedPlayer}
        ></GroupLeaderboard>
      )}
      {tournamentInst.matches.length !== 0 && (
        <Matches
          updated={updated}
          pageupdated={pageupdated}
          highlightedPlayer={highlightedPlayer}
          highlightPlayer={highlightPlayer}
        ></Matches>
      )}
    </div>
  );
};
