export default interface Match {
  matchno: number;
  roundno: number;
  team1: Team;
  team2: Team;
  points?: number;
  score1: number;
  score2: number;
  status?: number;
  startTime?: Date;
}

export interface Score {
  score: Array<number>;
}

export interface Team {
  players: Array<Player>;
}

export interface Player {
  name: string;
  games: number;
}

export interface LeaderboardRow {
  name: string;
  points: number;
  playedGames: number;
  wins: number;
}
