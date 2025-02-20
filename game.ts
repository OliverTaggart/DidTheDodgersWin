export class Game {
    constructor(
      public awayTeamRuns: number,
      public homeTeamRuns: number,
      public awayTeam: string,
      public homeTeam: string,
      public gameEndDateTime: Date,
    ) {}
  
    static fromJson(json: {awayTeamRuns: number; homeTeamRuns: number; awayTeam: string; homeTeam: string, gameEndDateTime: Date}): Game {
      return new Game(
        json.awayTeamRuns,
        json.homeTeamRuns,
        json.awayTeam,
        json.homeTeam,
        new Date(json.gameEndDateTime),
      );
    }
  }