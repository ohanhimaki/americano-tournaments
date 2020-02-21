import React from "react";
import tournamentState from "./models/tournamentState";
import Match from "./models/tournament";

export const Matches = () => {
  const tournamentinst = tournamentState.getInstance();

  function testaa() {
    console.log(tournamentinst);
  }
  return (
    <div>
      <button onClick={testaa}>testaa childista</button>
      {tournamentinst.matches.map((match: Match, index: number) => {
        return (
          <div key={index}>
            <div>
              {match.roundno}
              {match.matchno}
            </div>
            <div>
              {match.teams[0].players[0].name}
              {match.teams[0].players[1].name}
            </div>
            <div>
              {match.teams[1].players[0].name}
              {match.teams[1].players[1].name}
            </div>{" "}
          </div>
        );
      })}
    </div>
  );
};
