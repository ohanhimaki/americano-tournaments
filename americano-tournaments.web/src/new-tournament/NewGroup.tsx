import React, { useState } from "react";
import Match, { Player, Team } from "./models/tournament";
import generateMatches, { tarkista } from "./services/GenerateGroup";

export const NewGroup = () => {
  const [matches, setmatches] = useState<Match[]>([]);

  function stringSplit(stringSplit: string, splitwith: string = "\n") {
    var players: Array<string> = stringSplit.split("\n");
    setmatches(generateMatches(players));
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    stringSplit(event.target.Names.value);
  }

  function tarkistaOnClick() {
    tarkista(matches);
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
      <form action="" onSubmit={handleSubmit} className="flex-col flex m-8">
        <label htmlFor="">
          Names:
          <textarea name="Names" defaultValue={names} rows={8}></textarea>
        </label>
        <label htmlFor="">
          Rounds:
          <input type="text" name="name"></input>
        </label>
        <label htmlFor="">
          :<input type="text" name="name"></input>
        </label>
        <label htmlFor="">
          Names:
          <input type="text" name="name"></input>
        </label>
        <label htmlFor="">
          Names:
          <input type="text" name="name"></input>
        </label>
        <input type="submit" value="Submit"></input>
      </form>
      <button onClick={tarkistaOnClick}>Testaaa</button>
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
    </div>
  );
};
