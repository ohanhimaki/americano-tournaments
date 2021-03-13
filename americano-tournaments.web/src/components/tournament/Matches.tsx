import React, { useState } from "react";
import tournamentState from "./../../services/tournamentState";
import Match, { Team, Player } from "../../models/tournament";

interface Props {
  updated: Date;
  pageupdated: Function;
  highlightedPlayer: string;
  highlightPlayer: Function;
}

export const Matches = ({
  updated,
  pageupdated,
  highlightedPlayer,
  highlightPlayer
}: Props) => {
  const tournamentinst = tournamentState.getInstance();

  function addScore(match: Match, team: Team, sumToAdd: number) {
    tournamentinst.updateMatchScore(match, team, sumToAdd);
    pageupdated();
  }

  function changeStatus(match: Match) {
    tournamentinst.updateMatchStatus(match);

    pageupdated();
  }

  function getPlayer(player?: Player) {
    let classstring = "";
    if (!player) {
      return;
    }

    if (player.name === highlightedPlayer) {
      classstring = "bg-palayellow-600";
    }
    classstring += " py-2 md:px-4 sm:px-2";
    return (
      <div className={classstring}>
        <button onClick={() => highlightPlayer(player.name)}>
          {player.name}
        </button>
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
      <td
        className="border  border-palayellow-300 md:px-4 sm:px-2 py-2"
        onClick={() => changeStatus(match)}
      >
        <button>{statestring}</button>
      </td>
    );
  }

  function scoreButtons(match: Match) {
    if (match.status != 1) {
      return;
    }
    return (
      <tr>
        <td colSpan={7}>
          <div className="flex-initial self-auto bg-palayellow-300  flex flex-row justify-between m-auto">
            <button
              className="border-palayellow-300 px-4 bg-gray-800   "
              onClick={() => addScore(match, match.team1, 1)}
            >
              1
            </button>

            <button
              className="border-palayellow-300 px-4 bg-gray-800   "
              onClick={() => addScore(match, match.team1, 2)}
            >
              2
            </button>

            <button
              className="border-palayellow-300 px-4 bg-gray-800   "
              onClick={() => addScore(match, match.team1, 3)}
            >
              3
            </button>

            <button
              className="border-palayellow-300 px-4 bg-gray-800   "
              onClick={() => addScore(match, match.team1, 4)}
            >
              4
            </button>

            <button
              className="border-palayellow-300 px-4 bg-gray-800   "
              onClick={() => addScore(match, match.team1, -1)}
            >
              {" "}
              -
            </button>

            <button
              className="border-palayellow-300 px-4 bg-gray-800   "
              onClick={() => addScore(match, match.team2, 1)}
            >
              1
            </button>

            <button
              className="border-palayellow-300 px-4 bg-gray-800   "
              onClick={() => addScore(match, match.team2, 2)}
            >
              2
            </button>

            <button
              className="border-palayellow-300 px-4 bg-gray-800   "
              onClick={() => addScore(match, match.team2, 3)}
            >
              3
            </button>

            <button
              className="border-palayellow-300 px-4 bg-gray-800   "
              onClick={() => addScore(match, match.team2, 4)}
            >
              4
            </button>

            <button
              className="border-palayellow-300 px-4 bg-gray-800   "
              onClick={() => addScore(match, match.team2, -1)}
            >
              {" "}
              -
            </button>
          </div>
        </td>
      </tr>
    );
  }

  function getScores(match: Match) {
    let team1class =
      " align-middle flex flex-col justify-between  items-stretch";
    let team2class = team1class;
    if (match.status === 2) {
      if (match.score1 > match.score2) {
        team1class += " bg-green-700";
        team2class += " bg-red-700";
      } else if (match.score2 > match.score1) {
        team2class += " bg-green-700";
        team1class += " bg-red-700";
      } else {
        team1class += " bg-yellow-700";
        team2class += " bg-yellow-700";
      }
    }
    return (
      <>
        <td className="border  border-palayellow-300">
          <div className={team1class}>
            <div className="text-center flex-auto ">{match.score1}</div>
            {/* {scoreButtons(match, match.team1)} */}
          </div>
        </td>
        <td className="border  border-palayellow-300">
          <div className={team2class}>
            <div className="text-center">{match.score2}</div>
            {/* {scoreButtons(match, match.team2)} */}
          </div>
        </td>
      </>
    );
  }
  function rowStatusClass(match: Match) {
    let rowClass = "";
    if (match.status === 1) {
      rowClass = "bg-green-800";
    } else if (match.status === 2) {
      rowClass = "";
    }
    return rowClass;
  }

  return (
    <div className="m-auto max-w-2xl bg-gray-800 text-gray-300 rounded-lg py-8 my-8">
      <table className="table-auto m-auto">
        <thead>
          <tr>
            <th className="md:px-4 sm:px-2 py-2">Round</th>
            <th className="md:px-4 sm:px-2 py-2">Match</th>
            <th className="md:px-4 sm:px-2 py-2">Team 1</th>
            <th className="md:px-4 sm:px-2 py-2"></th>
            <th className="md:px-4 sm:px-2 py-2"></th>
            <th className="md:px-4 sm:px-2 py-2">Team 2</th>
            <th className="md:px-4 sm:px-2 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {tournamentinst.matches.map((match: Match, index: number) => {
            return (
              <>
                <tr key={index} className={rowStatusClass(match)}>
                  <td className="border  border-palayellow-300 md:px-4 sm:px-2 py-2">
                    {match.roundno}
                  </td>
                  <td className="border  border-palayellow-300 md:px-4 sm:px-2 py-2">
                    {match.matchno}
                  </td>
                  <td className="border  border-palayellow-300">
                    {getPlayer(match.team1.players[0])}
                    {getPlayer(match.team1.players[1])}
                  </td>
                  {getScores(match)}
                  <td className="border  border-palayellow-300">
                    {getPlayer(match.team2.players[0])}
                    {getPlayer(match.team2.players[1])}
                  </td>
                  {getMatchState(match)}
                </tr>
                {scoreButtons(match)}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
