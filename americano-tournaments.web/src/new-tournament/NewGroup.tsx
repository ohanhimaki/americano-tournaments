import React, { useState } from "react";
import Match, { Player, Team } from "./models/tournament";

import generateMatches, { tarkista } from "./services/GenerateGroup";
import tournamentState from "./models/tournamentState";
import { Matches } from "./Matches";
import { GroupLeaderboard } from "./GroupLeaderboard";

export const NewGroup = () => {
  const [teststate, setteststate] = useState(new Date());
  const tournamentInst = tournamentState.getInstance();

  function stringSplit(stringSplit: string, splitwith: string = "\n") {
    var tmpArray: Array<string> = stringSplit.split("\n");
    return tmpArray;
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    let players = stringSplit(event.target.Names.value);
    tournamentState.createMatches(players);
    setteststate(new Date());
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
        <form action="" onSubmit={handleSubmit} className="flex-col flex m-8">
          <label htmlFor="">
            Names:
            <textarea name="Names" defaultValue={names} rows={8}></textarea>
          </label>
          <label htmlFor="">
            Points:
            <input type="text" name="points"></input>
          </label>
          <label htmlFor="">
            StartTime:
            <input type="datetime-local" name="startTime"></input>
          </label>
          <input type="submit" value="Submit"></input>
        </form>
      )}
      {tournamentInst.matches.length !== 0 && (
        <GroupLeaderboard></GroupLeaderboard>
      )}
      {tournamentInst.matches.length !== 0 && <Matches></Matches>}
    </div>
  );
};
