import React from "react";
import tournamentState from "./models/tournamentState";
import { Player } from "./models/tournament";

export const GroupLeaderboard = () => {
  const tournamentInst = tournamentState.getInstance();
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Games</th>
          </tr>
        </thead>
        <tbody>
          {tournamentInst.players.map((player: Player, index: number) => {
            return (
              <tr key={index}>
                <td className="border px-4 py-2">{player.name}</td>
                <td className="border px-4 py-2">{player.games}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
