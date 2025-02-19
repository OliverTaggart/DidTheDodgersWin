import { teamStringTodataMap } from "./TeamData.ts";

const kv = await Deno.openKv();
const dodgersTeamString = "LAD";
const dbKey = "latest_dodgers_game";

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

async function fetchLatestGameData(daysAgo: number = 0): Promise<Game | undefined> {
  const key = Deno.env.get("SPORTS_API_KEY")
  if (!key) {
    throw new Error("No API key found");
  }
  
  const dateString = new Date(new Date().setDate(new Date().getDate() - daysAgo)).toISOString().split('T')[0];

  const url = `https://api.sportsdata.io/v3/mlb/scores/json/ScoresBasicFinal/${dateString}?key=${key}`

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

function getOponentTeamString(game: Game) {
  const oponentTeamKey = game.homeTeam == dodgersTeamString ? game.awayTeam : game.homeTeam;
  const oponentTeam = teamStringTodataMap[oponentTeamKey];

  return `${oponentTeam.city} ${oponentTeam.name}`;
}

function recursivelyAttemptToFetchGame(daysAgo: number) {
  const maybeLatestGame = fetchLatestGameData(daysAgo);
  if(maybeLatestGame) {
    return maybeLatestGame;
  } else {
    return recursivelyAttemptToFetchGame(daysAgo + 1);
  }
}

function getDidDodgersWinString(latestDodgersGame: Game) {
  const wonOrLostString = didTheDodgersWin(latestDodgersGame) ? "won" : "lost";
  const dateFormatting = { year: 'numeric', month: 'long', day: 'numeric' } as const;
  const formattedEndDate = latestDodgersGame.gameEndDateTime.toLocaleDateString('en-US', dateFormatting);
  const oponentString = getOponentTeamString(latestDodgersGame);
  const responseString = `The Dodgers ${wonOrLostString} their latest game.\nIt was played on ${formattedEndDate} vs the ${oponentString}\nThe score was was ${latestDodgersGame.awayTeamRuns} - ${latestDodgersGame.homeTeamRuns}`;
  return responseString;
}

Deno.cron("Store latest game info", { hour: { every: 1 } }, async () => {
  const maybeTodaysGame = await fetchLatestGameData();
  if(maybeTodaysGame) {
    await kv.atomic().set([dbKey], JSON.stringify(maybeTodaysGame)).commit();
    return;
  } else {
    const maybeStoredGame = await kv.get<Game>([dbKey]);
    if(maybeStoredGame.value) {
      return;
    } else {
        const latestGame = recursivelyAttemptToFetchGame(1)
        await kv.atomic().set([dbKey], JSON.stringify(latestGame)).commit();
    }
  } 
});

Deno.serve(async () => {
  const maybeLatestStoredGame = await kv.get<Game>([dbKey]);
  const maybeLatestDodgersGame = maybeLatestStoredGame.value
  if(maybeLatestDodgersGame) {
    return new Response(getDidDodgersWinString(maybeLatestDodgersGame));
  } else return new Response("No game found");
});

// Deno.serve(getDidDodgersWinString)
