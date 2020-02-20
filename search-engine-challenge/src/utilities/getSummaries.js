/**
 * Book Filter function utility returns ${K} relavent set of book Summaries and IDs
 * The utility employes two sets of rules and assigns score to each summary object.
 * 1. Number of occurances of the search words in the given summary
 * 2. The distance between each search word in the given summary in case of at least one occurance
 * The scored summaries will then be sorted and top ${K} values will be returned back
 */

import data from "../assets/data.js";

/**
 * Generator function to return iterator with all searched array of values and indices
 * @param {string} str String value to check with in
 * @param {RegExp} regex Regex value to check for
 */
function* matchAll(str, regex) {
  const localCopy = new RegExp(regex, "g");
  let match;
  while ((match = localCopy.exec(str))) {
    yield match;
  }
}

// Less significant values to be ommitted while scoring.
// We could either or not consider this based on our preference.
const EXCLUDED_VALUES = ["", "the", "a", "an"];

/**
 * Function to return the filtered summary Objects
 * @param {string} searchString user input from the search input box
 * @param {number} size number of requested results
 */
const bookFilter = (searchString, size) => {
  // Map to store the scores of summaries for user search query
  const score = new Map();

  // Array to store final results of requested size
  const finalResult = [];

  // User input split by space
  const searchParams = searchString.split(" ");

  // Take unique words from the search query to avoid
  // duplicate calculation of scoring for a single word
  const uniqueParams = [...new Set(searchParams)];

  // Remove unwanted words while calculating score
  const sanitizedParams = uniqueParams.filter(
    o => !EXCLUDED_VALUES.includes(o)
  );

  // Return empty array if the search string is empty -- Base case
  if (sanitizedParams.length <= 0) return finalResult;

  // Construct regex which will be used for searching the summaries
  const regex = new RegExp(
    `\\b${sanitizedParams.join("|\\b").toLowerCase()}`,
    "g"
  );

  // Calculate score for each summary
  data.summaries.forEach(sumObj => {
    let matches = []; // array to store matched values and indices for a summary

    for (const match of matchAll(sumObj.summary.toLowerCase(), regex)) {
      matches.push([match[0], match.index]); // find all matches and store it in the matches array
    }

    // If matches a re present for a given summary set the score based on two rules
    // 1. Number of time the keyword is occured in the summary. This is length of matches array
    // 2. Distance between the words. this is the indices of the occurances
    if (matches.length) {
      if (score.get(sumObj.id)) {
        score.set(
          sumObj.id,
          score.get(sumObj.id) +
            (matches || []).length +
            1 /
              matches.reduce((acc, val) => {
                return acc * val[1] + 1;
              }, 1)
        );
      } else {
        score.set(
          sumObj.id,
          (matches || []).length +
            1 /
              matches.reduce((acc, val) => {
                return acc * val[1] + 1;
              }, 1)
        );
      }
    }
  });

  // sort in descending order to pick the top K values
  const sortedScores = new Map(
    [...score.entries()].sort((a, b) => b[1] - a[1])
  );

  const sortedScoresIterator = sortedScores.entries();

  // Pick the top K (size) summaries
  for (let i = 0; i < size; i++) {
    let value = sortedScoresIterator.next().value;
    if (value) {
      finalResult.push(data.summaries[value[0]]);
    }
  }

  // return final summary results
  return finalResult;
};

export default bookFilter;
