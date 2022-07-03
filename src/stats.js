import { DateTime } from "luxon";
import { loadAllResults } from "./save_local";

const getHistogram = (data, binSize, maxBin) => {
  let hist = {};
  for (let i = 0; i <= maxBin; i++) {
    hist[i] = 0;
  }
  data.forEach(value => {
    if (value === null) return;
    const bin = Math.floor(value / binSize);
    hist[bin]++;
  });
  let histList = [];
  for (const key in hist) {
    histList.push({value: key*binSize, freq: hist[key]})
  }
  return histList;
}

export function getStatsData(binSize) {
    const allResults = loadAllResults();
  
    const allResultsEntries = Object.entries(allResults);
    const sequenceResults = allResultsEntries.map(([date, result]) => ({date: date, score: result.sequence ?? null}));
    const numberResults = allResultsEntries.map(([date, result]) => ({date: date, score: result.number ?? null}));
    const wordResults = allResultsEntries.map(([date, result]) => ({date: date, score: result.word ?? null}));

    const maxSequenceScore = Math.max(...sequenceResults.map(entry => entry.score));
    const maxNumberScore = Math.max(...numberResults.map(entry => entry.score));
    const maxWordScore = Math.max(...wordResults.map(entry => entry.score));

    const sequenceDist = getHistogram(sequenceResults.map(entry => entry.score), binSize, Math.floor(maxSequenceScore/binSize));
    const numberDist = getHistogram(numberResults.map(entry => entry.score), binSize, Math.floor(maxNumberScore/binSize));
    const wordDist = getHistogram(wordResults.map(entry => entry.score), binSize, Math.floor(maxWordScore/binSize));

    const played = allResultsEntries.length;

    // Days played
    // Playing streak
    // guess distributions
    // max score for each one
    // score over time
  
    return {
      results: {sequence: sequenceResults,
                number: numberResults,
                word: wordResults},
      maxScores: {sequence: maxSequenceScore,
                  number: maxNumberScore,
                  word: maxWordScore},
      gamesPlayed: played,
      distributions: {sequence: sequenceDist,
                      number: numberDist,
                      word: wordDist}
    };
  }
