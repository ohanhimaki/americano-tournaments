import Match, { Player } from "./tournament";
import generateMatches from "../services/GenerateGroup";

export default class tournamentState {
  static myInstance: tournamentState = new tournamentState();
  matches: Match[] = [];
  players: Player[] = [];

  static getInstance() {
    return this.myInstance;
  }

  static createMatches(
    players?: string[],
    pointsPerServe: number = 4,
    startTime: Date = new Date()
  ) {
    tournamentState.myInstance = new tournamentState(
      players,
      pointsPerServe,
      startTime
    );
  }

  constructor(
    playerNamesArray?: string[],
    pointsPerServe: number = 4,
    startTime: Date = new Date()
  ) {
    if (playerNamesArray === undefined) {
      return;
    }

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
}
