import React, { useState } from "react";
import tournamentState from "./models/tournamentState";

interface Props {
  updated: Date;
}

export const GroupLeaderboard = ({ updated }: Props) => {
  const tournamentInst = tournamentState.getInstance();
  const leaderboard = tournamentInst.getLeaderboard();

  return (
    <div className="m-auto max-w-2xl bg-gray-800 text-gray-300 rounded-lg py-8 my-8">
      <table className="table-auto m-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Games</th>
            <th className="px-4 py-2">Points</th>
            <th className="px-4 py-2">Wins</th>
          </tr>
        </thead>
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
    </div>
  );
};
