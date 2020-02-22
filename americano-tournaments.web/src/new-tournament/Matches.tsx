import React, { useState } from "react";
import tournamentState from "./models/tournamentState";
import Match, { Team } from "./models/tournament";

export const Matches = () => {
  const [updated, setupdated] = useState(new Date());
  const tournamentinst = tournamentState.getInstance();

  function addScore(match: Match, team: Team, sumToAdd: number) {
    tournamentinst.updateMatchScore(match, team, sumToAdd);
    setupdated(new Date());
  }

  function changeStatus(match: Match) {
    tournamentinst.updateMatchStatus(match);

    setupdated(new Date());
  }
  return (
    <div className="">
      <table className="table-auto m-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Round</th>
            <th className="px-4 py-2">Match</th>
            <th className="px-4 py-2">Team 1</th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">Team 2</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {tournamentinst.matches.map((match: Match, index: number) => {
            return (
              <tr key={index}>
                <td className="border px-4 py-2">{match.matchno}</td>
                <td className="border px-4 py-2">
                  <div>{match.team1.players[0].name}</div>
                  <div>{match.team1.players[1].name}</div>
                </td>
                <td
                  className="border px-4 py-2"
                  onClick={() => addScore(match, match.team1, 1)}
                >
                  {match.score1}
                </td>
                <td
                  className="border px-4 py-2"
                  onClick={() => addScore(match, match.team2, 1)}
                >
                  {match.score2}
                </td>
                <td className="border px-4 py-2">
                  <div>{match.team2.players[0].name}</div>
                  <div>{match.team2.players[1].name}</div>
                </td>
                <td
                  className="border px-4 py-2"
                  onClick={() => changeStatus(match)}
                >
                  {match.status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
