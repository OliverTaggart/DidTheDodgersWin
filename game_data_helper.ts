import { Game } from "./game.ts";
import { TeamStringToDataMap } from "./team_data.ts";

const dodgersTeamString = "LAD";

export async function recursivelyAttemptToFetchGameData(daysAgo: number) {
    console.log(`Looking for game ${daysAgo} days ago`);
    const maybeLatestGame = await fetchLatestGameData(daysAgo);
    if(maybeLatestGame) {
      return maybeLatestGame;
    } else {
      await new Promise(resolve => setTimeout(resolve, 5000));
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

  if(resp.status != 200) {
    console.log(`Failed to fetch game data: ${resp.status} ${resp.statusText}`);
    return undefined;
  }

  const data = await resp.json();

  console.log(data);

  // Ensure data is an array
  if (!Array.isArray(data)) {
    console.log("Data was not an array");
    return undefined;
  }

  // Filter out games that are not completed
  const games: Game[] = data
    .filter((gameData: {AwayTeamRuns: string | null; HomeTeamRuns: string | null; AwayTeam: string; HomeTeam: string; GameEndDateTime: string | null}) => 
      gameData.AwayTeamRuns != null && gameData.HomeTeamRuns != null && gameData.GameEndDateTime != null)
    .map((gameData: {AwayTeamRuns: string; HomeTeamRuns: string; AwayTeam: string; HomeTeam: string; GameEndDateTime: string}) => 
      Game.fromJson(gameData));

  console.log(`Found ${games.length} completed games`);

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

export function gameIsComplete(game: Game) {
    return game.gameEndDateTime.getTime() !== new Date(0).getTime();
}