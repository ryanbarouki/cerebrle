export function loadAllResults() {
  const storedResults = localStorage.getItem("results");
  return storedResults != null ? JSON.parse(storedResults) : {};
}

export function saveResults(dayString, game, results) {
  const allResults = loadAllResults();
  localStorage.setItem(
    "results",
    JSON.stringify({
      ...allResults,
      [dayString]: {
        ...allResults[dayString],
        [game]: results
      },
    })
  );
}
