import { DateTime } from "luxon";
import { loadAllResults } from "./save_local";


const getHistogram = (data, binSize) => {
  
}

export function getStatsData() {
    const allResults = loadAllResults();
  
    const allResultsEntries = Object.entries(allResults);
    const sequenceResults = allResultsEntries.map(([date, result]) => ({date: date, result: result.sequence}));
    const numberResults = allResultsEntries.map(([date, result]) => ({date: date, result: result.number}));
    const wordResults = allResultsEntries.map(([date, result]) => ({date: date, result: result.word}));

    console.log(numberResults)
    const played = allResultsEntries.length;
  
    // Playing streak
    // guess distributions
    // max score for each one
    // score over time
  
    return {
      sequenceResults,
      numberResults,
      wordResults
    };
  }
