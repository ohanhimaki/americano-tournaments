export default interface Match {
  matchno: number;
  roundno: number;
  teams: Array<Team>;
  points?: number;
  scores?: Array<Score>;
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
