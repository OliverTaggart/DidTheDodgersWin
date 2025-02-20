import { Game } from "./game.ts";
import { TeamStringToDataMap } from "./team_data.ts";

const dodgersTeamString = "LAD";

export async function recursivelyAttemptToFetchGameData(daysAgo: number) {
    console.log(`Looking for game ${daysAgo} days ago`);
    const maybeLatestGame = await fetchLatestGameData(daysAgo);
    if(maybeLatestGame) {
      return maybeLatestGame;
    } else {
      return recursivelyAttemptToFetchGameData(daysAgo + 1);
    }
  }

export async function fetchLatestGameData(daysAgo: number = 0): Promise<Game | undefined> {
  const key = Deno.env.get("SPORTS_API_KEY")
  if (!key) {
    throw new Error("No API key found");
  }
  
  const dateString = new Date(new Date().setDate(new Date().getDate() - daysAgo)).toISOString().split('T')[0];

  console.log(`Fetching game data for ${dateString}`);

  const url = `https://api.sportsdata.io/v3/mlb/scores/json/ScoresBasicFinal/${dateString}?key=${key}`

  const resp = await fetch(url, {
    method: "GET",
  });
  const data = await resp.json();
  const games: Game[] = data.map((gameData: {awayTeamRuns: number; homeTeamRuns: number; awayTeam: string; homeTeam: string; gameEndDateTime: Date}) => Game.fromJson(gameData));
  console.log(`Found ${games.length} games`);
  const maybeLastDodgersGame = games.find((game) => {
    if (game.homeTeam == dodgersTeamString || game.awayTeam == dodgersTeamString) {
      return game;
    }
  });
  return maybeLastDodgersGame;
}

export function didTheDodgersWin(game: Game) {
  if (game.homeTeam == dodgersTeamString) {
    return game.homeTeamRuns > game.awayTeamRuns;
  } else {
    return game.awayTeamRuns > game.homeTeamRuns;
  }
}

export function getOponentTeamString(game: Game) {
  const oponentTeamKey = game.homeTeam == dodgersTeamString ? game.awayTeam : game.homeTeam;
  const oponentTeam = TeamStringToDataMap[oponentTeamKey];

  return `${oponentTeam.city} ${oponentTeam.name}`;
}

export function getDidDodgersWinDisplayString(latestDodgersGame: Game) {
  const wonOrLostString = didTheDodgersWin(latestDodgersGame) ? "won" : "lost";
  const dateFormatting = { year: 'numeric', month: 'long', day: 'numeric' } as const;
  const formattedEndDate = latestDodgersGame.gameEndDateTime.toLocaleDateString('en-US', dateFormatting);
  const oponentString = getOponentTeamString(latestDodgersGame);
  const responseString = `The Dodgers ${wonOrLostString} their latest game.\nIt was played on ${formattedEndDate} vs the ${oponentString}\nThe score was was ${latestDodgersGame.awayTeamRuns} - ${latestDodgersGame.homeTeamRuns}`;
  return responseString;
}

export function gameValuesAreNotNull(game: Game) {
  return game.awayTeam != null && game.homeTeam != null && game.awayTeamRuns != null && game.homeTeamRuns != null && game.gameEndDateTime != null;
}