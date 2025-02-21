import { Game } from "./game.ts";
import { fetchLatestGameData, gameIsComplete, gameValuesAreNotNull, getDidDodgersWinDisplayString, recursivelyAttemptToFetchGameData } from "./game_data_helper.ts";

const kv = await Deno.openKv();
const dbKey = "latest_dodgers_game";

Deno.cron("Store latest game info", { hour: { every: 1 } }, async () => {
  const maybeTodaysGame = await fetchLatestGameData();
  if(maybeTodaysGame) {
    console.log("Storing today's game");
    await kv.atomic().set([dbKey], JSON.stringify(maybeTodaysGame)).commit();
    return;
  } else {
    const maybeStoredGame = await kv.get<Game>([dbKey]);
    if(maybeStoredGame.value && gameValuesAreNotNull(maybeStoredGame.value) && gameIsComplete(maybeStoredGame.value)) {
      console.log("No game found today, defaulting to saved game");
      return;
    } else {
        console.log("Recursively searching for game");
        const latestGame = await recursivelyAttemptToFetchGameData(1)
        await kv.atomic().set([dbKey], JSON.stringify(latestGame)).commit();
    }
  } 
});

Deno.serve(async () => {
  const maybeLatestStoredGame = await kv.get<Game>([dbKey]);
  const maybeLatestDodgersGame = maybeLatestStoredGame.value
  console.log(`Displaying stored game: ${maybeLatestDodgersGame}`);
  console.log(`hom team runs: ${maybeLatestDodgersGame?.homeTeamRuns}`);
  const g = maybeLatestDodgersGame ? true : false;
  const h = gameValuesAreNotNull(maybeLatestDodgersGame!);
  console.log(`Game exists: ${g}`);
  console.log(`Game values are not null: ${h}`);

  if(maybeLatestDodgersGame && gameValuesAreNotNull(maybeLatestDodgersGame)) {
    return new Response(getDidDodgersWinDisplayString(maybeLatestDodgersGame));
  } else return new Response("No game found");
});
