export class Game {
    constructor(
      public awayTeamRuns: number,
      public homeTeamRuns: number,
      public awayTeam: string,
      public homeTeam: string,
      public gameEndDateTime: Date,
    ) {}
  
    static fromJson(json: {AwayTeamRuns: number; HomeTeamRuns: number; AwayTeam: string; HomeTeam: string, GameEndDateTime: Date}): Game {
      return new Game(
        json.AwayTeamRuns,
        json.HomeTeamRuns,
        json.AwayTeam,
        json.HomeTeam,
        new Date(json.GameEndDateTime),
      );
    }
  }