import React, { useState } from "react";
import Match, { Player, Team } from "./models/tournament";
import generateMatches, { tarkista } from "./services/GenerateGroup";
import tournamentState from "./models/tournamentState";
import { Matches } from "./Matches";
export const NewGroup = () => {
  const [matches, setmatches] = useState<Match[]>([]);

  const [groupState, setgroupState] = useState<tournamentState>();

  const test = tournamentState.getInstance();

  function stringSplit(stringSplit: string, splitwith: string = "\n") {
    var players: Array<string> = stringSplit.split("\n");
    var tmpmatches = generateMatches(players);
    tournamentState.createMatches(tmpmatches);
    // setgroupState(new tournamentState(tmpmatches));
    console.log(groupState);

    setmatches(tmpmatches);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    stringSplit(event.target.Names.value);
  }

  function tarkistaOnClick() {
    tarkista(matches);
  }

  function tarkistaState() {
    console.log(test);
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
    <div>
      {test.matches.length === 0 && (
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
      <button onClick={tarkistaOnClick}>Testaaa</button>
      <button onClick={tarkistaState}>Testastate</button>
      <div>
        {matches?.map((match: Match, index: number) => {
          return (
            <div key={index}>
              {match.roundno}
              {match.matchno}
              {match.teams[0].players[0].name}
              {match.teams[0].players[1].name}
              {match.teams[1].players[0].name}
              {match.teams[1].players[1].name}
            </div>
          );
        })}
      </div>
      <Matches></Matches>
    </div>
  );
};
