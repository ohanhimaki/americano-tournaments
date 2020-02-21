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
        teams: match.teams,
        points: pointsPerServe,
        scores: [{ score: [0] }, { score: [0] }],
        status: 0,
        startTime: startTime
      });
    });
  }
}
