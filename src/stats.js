import { DateTime } from "luxon";
import { loadAllResults } from "./save_local";

export function getStatsData() {
    const allGuesses = loadAllResults();
  
    const allGuessesEntries = Object.entries(allGuesses);
    console.log(allGuessesEntries);
    const played = allGuessesEntries.length;
  
    // Playing streak
    // guess distributions
    // max score for each one
    // score over time
  
    return;
  }
