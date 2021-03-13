import Match, { Player, LeaderboardRow, Team } from "../models/tournament";
import generateMatches from "../services/GenerateGroup";
import LocalStorageService from "../services/LocalStorageService";

export default class tournamentState {
  static myInstance: tournamentState = new tournamentState();
  matches: Match[] = [];
  players: Player[] = [];
  name: string = "";

  
  
  static getInstance() {
    return this.myInstance;
  }

  static createMatches(
    name: string = "",
    players?: string[],
    pointsPerServe: number = 4,
    startTime: Date = new Date()
  ) {
    tournamentState.myInstance = new tournamentState(
        name,
      players,
      pointsPerServe,
      startTime
    );
  }

  constructor(
      name: string = "",
    playerNamesArray?: string[],
    pointsPerServe: number = 4,
    startTime: Date = new Date()
  ) {
    if (playerNamesArray === undefined) {
      return;
    }
this.name = name;
    playerNamesArray.forEach(name => {
      this.players.push({ name: name, games: 0 });
    });

    const tmpMatches = generateMatches(this.players);

    tmpMatches.forEach(match => {
      this.matches.push({
        matchno: match.matchno,
        roundno: match.roundno,
        team1: match.team1,
        team2: match.team2,
        points: pointsPerServe,
        score1: 0,
        score2: 0,
        status: 0,
        startTime: startTime
      });
    });
  }

  updateMatchScore(match: Match, team: Team, sumToAdd: number) {
    const matchToUpdate = this.matches.find(x => x.matchno === match.matchno);
    console.log(matchToUpdate);

    if (matchToUpdate?.team1 === team) {
      matchToUpdate.score1 += sumToAdd;
    }
    if (matchToUpdate?.team2 === team) {
      matchToUpdate.score2 += sumToAdd;
    }
  }

  updateMatchStatus(match: Match) {
    const matchToUpdate = this.matches.find(x => x.matchno === match.matchno);

    console.log(matchToUpdate?.status);

    if (matchToUpdate?.status === 1) {
      matchToUpdate.status = 2;
    } else if (matchToUpdate?.status === 2) {
      matchToUpdate.status = 0;
    } else if (matchToUpdate?.status === 0) {
      matchToUpdate.status = 1;
    }
  }

  getLeaderboard() {
    let tmpLeaderboard: LeaderboardRow[] = [];
    this.players.forEach(player => {
      let points = 0;
      let playedGames = 0;
      let wins = 0;

      this.matches.forEach(match => {
        if (match.team1.players.includes(player)) {
          if (match.score1) {
            points += match.score1;
          }
          if (match.status === 2 && match.score1 > match.score2) {
            wins += 1;
          }
        }
        if (match.team2.players.includes(player)) {
          if (match.score2) {
            points += match.score2;
          }
          if (match.status === 2 && match.score2 > match.score1) {
            wins += 1;
          }
        }
      });

      this.matches.forEach(match => {
        if (
          match.team1.players.includes(player) ||
          match.team2.players.includes(player)
        ) {
          if (match.status === 2) {
            playedGames += 1;
          }
        }
      });

      tmpLeaderboard.push({
        name: player.name,
        points: points,
        playedGames: playedGames,
        wins: wins
      });
    });
    tmpLeaderboard.sort((a, b) => {
      if (a.points !== b.points) {
        return b.points - a.points;
      } else {
        return b.wins - a.wins;
      }
    });
    console.log('tulee tänne')
    UpdateLocalStorage(this);

    return tmpLeaderboard;
  }
}


function UpdateLocalStorage(tournament: tournamentState){
  var tournaments = [tournament]
  var localStorageServicetmp = new LocalStorageService();
  localStorageServicetmp.SetTournaments(tournaments)
}
