import Match, { Player, LeaderboardRow, Team } from "../models/tournament";
import generateMatches from "../services/GenerateGroup";
import LocalStorageService from "../services/LocalStorageService";

export default class tournamentState {
  static myInstance: tournamentState = new tournamentState();
  matches: Match[] = [];
  Players: Player[] = [];
  Name: string = "";
  Created: Date;
  Edited: Date;
  PlayersCount: number = 0;
  Status: number = 0;
  PlayersCountCalculator() {
    return this.Players.length;
  }
  
  StatusCalculator() {
    if (this.matches.filter(x => x.status !== 2).length === 0) return 2
    if (this.matches.filter(x => x.status != 0).length === 0) return 1
    return 0;
  }

  
  
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
    this.Created = new Date();
    this.Edited = new Date();
    if (playerNamesArray === undefined) {
      return;
    }
this.Name = name;
    playerNamesArray.forEach(name => {
      this.Players.push({ name: name, games: 0 });
    });

    const tmpMatches = generateMatches(this.Players);

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
    this.PlayersCount = this.PlayersCountCalculator();
    this.Status = this.StatusCalculator();
    this.updateEdited()
  }
  
  updateEdited() {
    this.Edited = new Date();
    this.Status = this.StatusCalculator();
    UpdateLocalStorage(this);
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
    this.updateEdited()
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
    this.updateEdited()
  }

  getLeaderboard() {
    let tmpLeaderboard: LeaderboardRow[] = [];
    this.Players.forEach(player => {
      let points = 0;
      let playedGames = 0;
      let wins = 0;

      this.matches.forEach(match => {
        if (match.team1.players.filter(x => x.name === player.name).length>0) {
          if (match.score1) {
            points += match.score1;
          }
          if (match.status === 2 && match.score1 > match.score2) {
            wins += 1;
          }
        }
        if (match.team2.players.filter(x => x.name === player.name).length>0) {
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
          match.team1.players.filter(x => x.name === player.name).length>0 ||
          match.team2.players.filter(x => x.name === player.name).length>0
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

    return tmpLeaderboard;
  }

  reloadOldTournament(tournament: tournamentState) {
    this.Name = tournament.Name;
    this.Players = tournament.Players;
    this.matches = tournament.matches;
    
  }
}


function UpdateLocalStorage(tournament: tournamentState){
  var localStorageServicetmp = new LocalStorageService();
  localStorageServicetmp.UpdateTournament(tournament);
}
