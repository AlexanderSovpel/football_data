export interface ITeam {
  id: number;
  name: string;
}

export interface ITeamDetails extends ITeam {
  crest: string;
  squad: IPlayer[];
  matches: IMatch[];
}

export interface IPlayer {
  id: number;
  name: string;
}

export interface IMatch {
  id: number;
  homeTeam: ITeam;
  awayTeam: ITeam;
  utcDate: string;
  competition: ICompetition;
}

export interface ICompetition {
  id: number;
  name: string;
}
