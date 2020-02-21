import React from "react";
import tournamentState from "./models/tournamentState";
import Match from "./models/tournament";

export const Matches = () => {
  const tournamentinst = tournamentState.getInstance();

  return (
    <div className="">
      <table className="table-auto m-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Kierros</th>
            <th className="px-4 py-2">Ottelu</th>
            <th className="px-4 py-2">Joukkue 1</th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">Joukkue 2</th>
          </tr>
        </thead>
        <tbody>
          {tournamentinst.matches.map((match: Match, index: number) => {
            return (
              <tr key={index}>
                <td className="border px-4 py-2">{match.roundno}</td>
                <td className="border px-4 py-2">{match.matchno}</td>
                <td className="border px-4 py-2">
                  <div>{match.team1.players[0].name}</div>
                  <div>{match.team1.players[1].name}</div>
                </td>
                <td className="border px-4 py-2">{match.score1}</td>
                <td className="border px-4 py-2">{match.score2}</td>
                <td className="border px-4 py-2">
                  <div>{match.team2.players[0].name}</div>
                  <div>{match.team2.players[1].name}</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
