export class Game {
    constructor(
      public awayTeamRuns: number,
      public homeTeamRuns: number,
      public awayTeam: string,
      public homeTeam: string,
      public gameEndDateTime: Date,
    ) {}
  
    static fromJson(json: {AwayTeamRuns: string; HomeTeamRuns: string; AwayTeam: string; HomeTeam: string, GameEndDateTime: string}): Game {
    return new Game(
      Number(json.AwayTeamRuns),
      Number(json.HomeTeamRuns),
      json.AwayTeam,
      json.HomeTeam,
      new Date(json.GameEndDateTime),
    );
    }
  }