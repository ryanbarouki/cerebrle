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
  histList.push({value: (maxBin+1)*binSize, freq: 0});
  return histList;
}

const calculateStreak = (results) => {
  let previousDate = null;
  let currentStreak = 0;
  for (const {date, score} of results) {
    const currentDate = DateTime.fromFormat(date, "yyyy-MM-dd");
    if (
      previousDate == null ||
      previousDate.plus({ days: 1 }).hasSame(currentDate, "day")
    ) {
      currentStreak++;
    } else {
      currentStreak = 1;
    }
    previousDate = currentDate;
  }
  return currentStreak
};

const getGameStats = (allResultsEntries, game, binSize) => {
  const results = allResultsEntries.map(([date, result]) => ({ date: date, score: result[game] ?? null }));
  const fileredResults = results.filter(({ date, score }) => score !== null);
  const allScores = results.map(entry => entry.score);
  const maxScore = Math.max(...allScores);
  const distribution = getHistogram(allScores, binSize, Math.floor(maxScore/binSize));

  return {results: fileredResults, maxScore, distribution, played: results.length, streak: calculateStreak(results)};
};

export function getStatsData() {
    const allResults = loadAllResults();
    const allResultsEntries = Object.entries(allResults);

    // Playing streak
  
    return {
      sequence: getGameStats(allResultsEntries, "sequence", 1),
      number: getGameStats(allResultsEntries, "number", 1),
      word: getGameStats(allResultsEntries, "word", 10)
    };
  }
