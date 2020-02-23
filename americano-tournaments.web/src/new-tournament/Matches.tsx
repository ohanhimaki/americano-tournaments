import React, { useState } from "react";
import tournamentState from "./models/tournamentState";
import Match, { Team, Player } from "./models/tournament";

export const Matches = () => {
  const [updated, setupdated] = useState(new Date());
  const [highlightedPlayer, sethighlightedPlayer] = useState("");

  const tournamentinst = tournamentState.getInstance();

  function addScore(match: Match, team: Team, sumToAdd: number) {
    tournamentinst.updateMatchScore(match, team, sumToAdd);
    setupdated(new Date());
  }

  function changeStatus(match: Match) {
    tournamentinst.updateMatchStatus(match);

    setupdated(new Date());
  }

  function highlightPlayer(player?: Player) {
    if (!player) {
      return;
    }
    sethighlightedPlayer(player.name);
  }

  function getPlayer(player?: Player) {
    let classstring = "bg-blue-300";
    if (!player) {
      return;
    }

    if (player.name === highlightedPlayer) {
      classstring = "bg-red-300";
    }
    classstring += " py-2 px-4";
    return (
      <div className={classstring}>
        <button onClick={() => highlightPlayer(player)}>{player.name}</button>
      </div>
    );
  }

  function getMatchStateString(state?: number) {
    if (state === 0) {
      return "upcoming";
    } else if (state === 1) {
      return "ongoing";
    } else if (state === 2) {
      return "finished";
    }
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
                <td className="border px-4 py-2">{match.roundno}</td>
                <td className="border px-4 py-2">{match.matchno}</td>
                <td className="border">
                  {getPlayer(match.team1.players[0])}
                  {getPlayer(match.team1.players[1])}
                </td>
                <td
                  className="border px-4 py-2"
                  onClick={() => addScore(match, match.team1, 1)}
                >
                  <button>{match.score1}</button>
                </td>
                <td
                  className="border px-4 py-2"
                  onClick={() => addScore(match, match.team2, 1)}
                >
                  <button>{match.score2}</button>
                </td>
                <td className="border px-4 py-2">
                  {getPlayer(match.team2.players[0])}
                  {getPlayer(match.team2.players[1])}
                </td>
                <td
                  className="border px-4 py-2"
                  onClick={() => changeStatus(match)}
                >
                  <button>{getMatchStateString(match.status)}</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
