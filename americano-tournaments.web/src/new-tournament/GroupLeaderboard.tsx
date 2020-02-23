import React, { useState } from "react";
import tournamentState from "./models/tournamentState";

export const GroupLeaderboard = () => {
  const [updated, setupdated] = useState(new Date());
  const tournamentInst = tournamentState.getInstance();

  const leaderboard = tournamentInst.getLeaderboard();

  function testaa() {
    setupdated(new Date());
    console.log(leaderboard);
    console.log(tournamentInst.getLeaderboard());
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Games</th>
            <th className="px-4 py-2">Points</th>
            <th className="px-4 py-2">Wins</th>
          </tr>
        </thead>
        {/* <tbody>
          {tournamentInst.players.map((player: Player, index: number) => {
            return (
              <tr key={index}>
                <td className="border px-4 py-2">{player.name}</td>
                <td className="border px-4 py-2">{player.games}</td>
              </tr>
            );
          })}
        </tbody> */}
        <tbody>
          {leaderboard.map((row, index) => {
            return (
              <tr key={index}>
                <td className="border px-4 py-2">{row.name}</td>
                <td className="border px-4 py-2">{row.playedGames}</td>
                <td className="border px-4 py-2">{row.points}</td>
                <td className="border px-4 py-2">{row.wins}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={testaa}>testaa</button>
    </div>
  );
};
