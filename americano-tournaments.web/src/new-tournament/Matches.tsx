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
    let classstring = "";
    if (!player) {
      return;
    }

    if (player.name === highlightedPlayer) {
      classstring = "bg-blue-300";
    }
    classstring += " py-2 px-4";
    return (
      <div className={classstring}>
        <button onClick={() => highlightPlayer(player)}>{player.name}</button>
      </div>
    );
  }

  function getMatchState(match?: Match) {
    if (!match) {
      console.log(match);

      return;
    }

    const state = match?.status;
    let statestring = "";

    if (state === 0) {
      statestring = "upcoming";
    } else if (state === 1) {
      statestring = "ongoing";
    } else if (state === 2) {
      statestring = "finished";
    }

    return (
      <td className="border px-4 py-2" onClick={() => changeStatus(match)}>
        <button>{statestring}</button>
      </td>
    );
  }

  function scoreButtons(match: Match, team: Team) {
    if (match.status != 1) {
      return;
    }
    return (
      <div className="flex-initial self-auto">
        <button
          className="border-black bg-gray-700 rounded-t-md "
          onClick={() => addScore(match, team, 1)}
        >
          1
        </button>
        <button
          className="border-black bg-gray-700 rounded-t-md "
          onClick={() => addScore(match, team, 2)}
        >
          2
        </button>
        <button
          className="border-black bg-gray-700 rounded-t-md "
          onClick={() => addScore(match, team, 3)}
        >
          3
        </button>
        <button
          className="border-black bg-gray-700 rounded-t-md "
          onClick={() => addScore(match, team, 4)}
        >
          4
        </button>
        <button
          className="border-black bg-gray-700 rounded-t-md "
          onClick={() => addScore(match, team, -1)}
        >
          {" "}
          -
        </button>
      </div>
    );
  }

  function getScores(match: Match) {
    let team1class =
      " align-middle flex flex-col justify-between  items-stretch";
    let team2class = team1class;
    if (match.status === 2) {
      if (match.score1 > match.score2) {
        team1class += " bg-green-500";
        team2class += " bg-red-500";
      } else if (match.score2 > match.score1) {
        team2class += " bg-green-500";
        team1class += " bg-red-500";
      } else {
        team1class += " bg-yellow-500";
        team2class += " bg-yellow-500";
      }
    }
    return (
      <>
        <td className="border">
          <div className={team1class}>
            <div className="text-center flex-auto ">{match.score1}</div>
            {scoreButtons(match, match.team1)}
          </div>
        </td>
        <td className="border">
          <div className={team1class}>
            <div className="text-center">{match.score2}</div>
            {scoreButtons(match, match.team2)}
          </div>
        </td>
      </>
    );
  }
  function rowStatusClass(match: Match) {
    let rowClass = "";
    if (match.status === 1) {
      rowClass = "bg-green-600";
    } else if (match.status === 2) {
      rowClass = "";
    }
    return rowClass;
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
              <tr key={index} className={rowStatusClass(match)}>
                <td className="border px-4 py-2">{match.roundno}</td>
                <td className="border px-4 py-2">{match.matchno}</td>
                <td className="border">
                  {getPlayer(match.team1.players[0])}
                  {getPlayer(match.team1.players[1])}
                </td>
                {getScores(match)}
                <td className="border">
                  {getPlayer(match.team2.players[0])}
                  {getPlayer(match.team2.players[1])}
                </td>
                {getMatchState(match)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
