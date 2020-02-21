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
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Kierros</th>
            <th className="px-4 py-2">Ottelu</th>
            <th className="px-4 py-2">Joukkue 1</th>
            {/* <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th> */}
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
                  <span className="text-left inline-block">
                    {match.team1.players[0].name}
                  </span>
                  <span>{match.team1.players[1].name}</span>
                </td>

                {/* <td className="border px-4 py-2">{match.scores[0].score}</td>
                <td className="border px-4 py-2">{match.scores?[1].score[0]}</td> */}

                {/* <td className="border px-4 py-2"></td> */}
                <td className="border px-4 py-2">
                  {match.team2.players[0].name}
                  {match.team2.players[1].name}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
