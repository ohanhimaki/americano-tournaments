import Match from "./tournament";

export default class tournamentState {
  static myInstance: tournamentState = new tournamentState();
  matches: Match[] = [];

  static getInstance() {
    return this.myInstance;
  }

  static createMatches(
    matchesParam?: Match[],
    pointsPerServe: number = 4,
    startTime: Date = new Date()
  ) {
    tournamentState.myInstance = new tournamentState(
      matchesParam,
      pointsPerServe,
      startTime
    );
  }

  constructor(
    matchesParam?: Match[],
    pointsPerServe: number = 4,
    startTime: Date = new Date()
  ) {
    if (matchesParam === undefined) {
      return;
    }
    matchesParam.forEach(match => {
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
