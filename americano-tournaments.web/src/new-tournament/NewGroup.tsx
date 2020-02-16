import React, { useState } from "react";

export const NewGroup = () => {
  const [matches, setmatches] = useState<Match[]>([]);

  function asdf() {
    console.log(names);
  }

  function handleChange(event: any) {
    console.log(event.target.value);
  }
  function handleSubmit(event: any) {
    event.preventDefault();
    stringSplit(event.target.Names.value);
  }

  function stringSplit(stringSplit: string, splitwith: string = "\n") {
    var players: Array<string> = stringSplit.split("\n");
    setmatches(generateMatches(players));
  }

  interface Player {
    name: string;
    games: number;
  }

  interface Team {
    players: Array<Player>;
  }

  interface Match {
    matchno: number;
    roundno: number;
    teams: Array<Team>;
  }

  function returnValidTeam(teams: Team[], team1: Team) {
    return teams.filter(team => {
      return (
        !team.players.includes(team1.players[0]) &&
        !team.players.includes(team1.players[1])
      );
    })[0];
  }

  function removeTeams(teams: Team[], team1: Team, team2: Team) {
    if (teams && team1 && team2) {
      return teams.filter(team => {
        return team.players !== team1.players && team.players !== team2.players;
      });
    } else {
      console.log(teams);
      console.log(team1);
      console.log(team2);
      return [];
    }
  }

  function sumGamesOfTeam(team: Team) {
    var sumOfGames = 0;
    team.players.forEach(x => {
      sumOfGames = sumOfGames + x.games;
    });

    return sumOfGames;
  }

  function generateMatches(playerNames: Array<string>) {
    console.log(playerNames);
    var players: Player[] = [];
    var teams: Team[] = [];
    var matches: Match[] = [];

    playerNames.forEach(name => {
      players.push({ name: name, games: 0 });
    });

    for (let i = 0; i < playerNames.length - 1; i++) {
      for (let j = i + 1; j < playerNames.length; j++) {
        teams.push({ players: [players[i], players[j]] });
      }
    }
    teams = teams.sort(() => 0.5 - Math.random());
    var i = 0;
    while (teams.length > 0) {
      i++;
      teams.sort((a, b) => {
        return sumGamesOfTeam(a) - sumGamesOfTeam(b);
      });

      var team1 = teams[0];

      var team2 = returnValidTeam(teams, team1);

      if (team1 && team2) {
        team1.players.forEach(player => {
          player.games++;
        });
        team2.players.forEach(player => {
          player.games++;
        });
        matches.push({
          matchno: i,
          roundno: sumGamesOfTeam(team1) / 2,
          teams: [team1, team2]
        });

        teams = removeTeams(teams, team1, team2);
      } else {
        break;
      }
    }

    return matches;
  }

  let names = `test1
  test2
  test3
  test4
  test5
  test6
  ptest7
  test8`;
  return (
    <div>
      <form action="" onSubmit={handleSubmit} className="flex-col flex m-8">
        <label htmlFor="">
          Names:
          <textarea
            name="Names"
            defaultValue={names}
            onChange={handleChange}
            rows={8}
          ></textarea>
        </label>
        <label htmlFor="">
          Rounds:
          <input type="text" name="name"></input>
        </label>
        <label htmlFor="">
          :<input type="text" name="name"></input>
        </label>
        <label htmlFor="">
          Names:
          <input type="text" name="name"></input>
        </label>
        <label htmlFor="">
          Names:
          <input type="text" name="name"></input>
        </label>
        <input type="submit" value="Submit"></input>
      </form>
      <button onClick={asdf}>paina</button>
      <div>
        {matches?.map((match: Match) => {
          return (
            <div>
              {match.roundno}
              {match.matchno}
              {match.teams[0].players[0].name}
              {match.teams[0].players[1].name}
              {match.teams[1].players[0].name}
              {match.teams[1].players[1].name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
