export default interface Match {
  matchno: number;
  roundno: number;
  teams: Array<Team>;
}

export interface Team {
  players: Array<Player>;
}

export interface Player {
  name: string;
  games: number;
}
