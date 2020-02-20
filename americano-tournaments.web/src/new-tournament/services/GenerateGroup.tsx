import Match, { Player, Team } from "../models/tournament";

export function tarkista(matches: Match[]) {
  var allPlayers: Player[] = [];

  matches.forEach(match => {
    match.teams.forEach(team => {
      team.players.forEach(player => {
        allPlayers.push(player);
      });
    });
  });

  var uniquePlayers = allPlayers
    .map(player => player.name)
    .filter((name, index, self) => {
      return self.indexOf(name) === index;
    });

  uniquePlayers.forEach(player => {
    console.log(player);
    console.log("----");

    var tmpmatches: Match[] = [];

    matches.forEach(match => {
      match.teams.forEach(team => {
        team.players.forEach(tmpplayer => {
          if (tmpplayer.name === player) {
            tmpmatches.push(match);
          }
        });
      });
    });
    console.log("Matches: \t" + tmpmatches.length);

    var tmpplayers: Player[] = [];

    tmpmatches.forEach(match => {
      match.teams.forEach(team => {
        team.players.forEach(player => {
          tmpplayers.push(player);
        });
      });
    });

    uniquePlayers.forEach(player2 => {
      if (player2 !== player) {
        console.log(
          player2 +
            "\t" +
            tmpplayers.filter(tmpplayer => {
              return tmpplayer.name === player2;
            }).length
        );
      }
    });
    console.log("----");
  });
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

function bestOpponent(team1: Team, sortedTeams: Team[], matches: Match[]) {
  var tmpmatches = matches.filter(match => {
    return (
      match.teams[0].players.includes(team1.players[0]) ||
      match.teams[0].players.includes(team1.players[1]) ||
      match.teams[1].players.includes(team1.players[0]) ||
      match.teams[1].players.includes(team1.players[1])
    );
  });

  var tmpteams = sortedTeams.sort((a, b) => {
    var aMatchesAgainst = teamOccuredInMatches(a, tmpmatches);
    var bMatchesAgainst = teamOccuredInMatches(b, tmpmatches);

    return aMatchesAgainst - bMatchesAgainst;
  });

  return tmpteams;
}

function teamOccuredInMatches(team: Team, matches: Match[]) {
  var totalOccurences = 0;
  matches.forEach(match => {
    match.teams.forEach(tmpteam => {
      if (
        tmpteam.players.includes(team.players[0]) ||
        tmpteam.players.includes(team.players[1])
      ) {
        totalOccurences++;
      }
    });
  });
  return totalOccurences;
}

export default function generateMatches(playerNames: Array<string>) {
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

    teams = bestOpponent(team1, teams, matches);
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
