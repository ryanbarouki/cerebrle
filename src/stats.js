import { DateTime } from "luxon";
import { loadAllResults } from "./save_local";


const getHistogram = (data, binSize) => {
  // TODO: implement this
}

export function getStatsData() {
    const allResults = loadAllResults();
  
    const allResultsEntries = Object.entries(allResults);
    const sequenceResults = allResultsEntries.map(([date, result]) => ({date: date, score: result.sequence}));
    const numberResults = allResultsEntries.map(([date, result]) => ({date: date, score: result.number}));
    const wordResults = allResultsEntries.map(([date, result]) => ({date: date, score: result.word}));

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
