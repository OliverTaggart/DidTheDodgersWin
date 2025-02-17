
// const kv = await Deno.openKv();
const dodgersTeamString = "LAD";
// const dbKey = "latest_dodgers_game";

// Deno.cron("Increment a counter", { hour: { every: 1 } }, async () => {
//   const latestDodgersGame: Game | undefined = await fetchLatestGameData();
//   if(latestDodgersGame) {
//     await kv.atomic().set([dbKey], JSON.stringify(latestDodgersGame)).commit();
//   }
// });

// Deno.serve(async () => {
//   // Get the latest count
//   const latestDodgersGame = await kv.get<Game>([dbKey]);
//   const wonOrLostString = didTheDodgersWin(latestDodgersGame.value!) ? "won" : "lost";
//   const otherTeamString = latestDodgersGame.value?.HomeTeam == dodgersTeamString ? latestDodgersGame.value?.AwayTeam : latestDodgersGame.value?.HomeTeam;
//   const responseString = `The Dodgers ${wonOrLostString} their latest game.\nIt was played on date vs ${otherTeamString}\nThe score was was ${latestDodgersGame.value?.AwayTeamRuns} - ${latestDodgersGame.value?.HomeTeamRuns}`;
//   return new Response(responseString);
// });

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

async function fetchLatestGameData() {
  const key = Deno.env.get("SPORTS_API_KEY")
  if (!key) {
    throw new Error("No API key found");
  }
  // const dateString = new Date().toISOString().split('T')[0];
  const testDatestring = '2024-03-13'

  const url = `https://api.sportsdata.io/v3/mlb/scores/json/ScoresBasicFinal/${testDatestring}?key=${key}`

  const resp = await fetch(url, {
    method: "GET",
  });
  const data = await resp.json();
  const games: Game[] = data.map((gameData: {awayTeamRuns: number; homeTeamRuns: number; awayTeam: string; homeTeam: string; gameEndDateTime: Date}) => Game.fromJson(gameData));
  const maybeLastDodgersGame = games.find((game) => {
    if (game.homeTeam == dodgersTeamString || game.awayTeam == dodgersTeamString) {
      return game;
    }
  });
  return maybeLastDodgersGame;
}

function didTheDodgersWin(game: Game) {
  if (game.homeTeam == dodgersTeamString) {
    return game.homeTeamRuns > game.awayTeamRuns;
  } else {
    return game.awayTeamRuns > game.homeTeamRuns;
  }
}

if (import.meta.main) {
  const latestDodgersGame = await fetchLatestGameData();
  if(latestDodgersGame) {
    const wonOrLostString = didTheDodgersWin(latestDodgersGame) ? "won" : "lost";
    const otherTeamString = latestDodgersGame.homeTeam == dodgersTeamString ? latestDodgersGame.awayTeam : latestDodgersGame.homeTeam;
    const dateFormatting = { year: 'numeric', month: 'long', day: 'numeric' } as const;
    const formattedEndDate = latestDodgersGame.gameEndDateTime.toLocaleDateString('en-US', dateFormatting);
    const responseString = `The Dodgers ${wonOrLostString} their latest game.\nIt was played on ${formattedEndDate} vs ${otherTeamString}\nThe score was was ${latestDodgersGame.awayTeamRuns} - ${latestDodgersGame.homeTeamRuns}`;
    console.log(responseString);
  }
}
