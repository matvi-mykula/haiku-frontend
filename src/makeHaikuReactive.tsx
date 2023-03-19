/////// ----------- reactive haiku maker --------
// think i will implement this one first
// this version dumps out a haiku from the words scraped and is then voted on
// hoping the votes get a readable haiku
// if voted on send haiku to database
// // haikuData = {
//   haiku: string[],
//   structure: string[], //this would require a function to tag each word and return a corresponding stringlist
//   upvotes: number,
//   downvotes: number,
//   date: Date,
//   url: url,
//    sentiment:number

// }

import { url } from 'inspector';
import { syllable } from 'syllable';
import { getColor } from './getColor';
import { stopwords } from './utils/stopwords';

import posTagger from 'wink-pos-tagger';
// Load wink-nlp package.
const winkNLP = require('wink-nlp');
// Load english language model.
const model = require('wink-eng-lite-web-model');
// Instantiate winkNLP.
const nlp = winkNLP(model);
// Obtain "its" helper to extract item properties.
const its = nlp.its;
// Obtain "as" reducer helper to reduce a collection.
const as = nlp.as;
// nlp.use(posTagger);

// function wordSorter(words: string[]) {
//   const sortedWords: Record<string, string[]> = {
//     NOUN: [],
//     PROPN: [],
//     VERB: [],
//     ADJ: [],
//     ADV: [],
//     PRON: [],
//     ADP: [],
//     PART: [],
//     AUX: [],
//     DET: [],
//   };
//   // Perform part-of-speech tagging on the words array
//   words.forEach((word) => {
//     const doc = nlp.readDoc(word);
//     const tag = doc.tokens().out(its.pos);
//     if (tag) {
//       if (tag in sortedWords) {
//         sortedWords[tag].push(word);
//       }
//     }
//   });
//   return sortedWords;
//   // Iterate through the tagged words and sort them into separate arrays
// }

// const allStuctures = [
//   ['ADJ', 'NOUN', 'VERB', 'NOUN'],
//   ['ADJ', 'NOUN', 'VERB', 'ADV', 'VERB', 'NOUN'],
//   ['NOUN', 'VERB', 'ADV', 'VERB', 'NOUN'],
//   ['PRON', 'VERB', 'VERB', 'ADJ', 'NOUN'],
//   ['NOUN', 'VERB', 'VERB', 'NOUN', 'VERB', 'NOUN'],
//   ['ADJ', 'NOUN', 'VERB', 'PRON', 'VERB', 'NOUN'],
//   ['ADJ', 'NOUN', 'VERB', 'PREP', 'DET', 'NOUN'],
//   ['NOUN', 'VERB', 'DET', 'NOUN', 'VERB', 'PRON'],
// ];

// const structures = [
//   { pos: pickRandomStructure(allStuctures), syl: 5 },
//   { pos: pickRandomStructure(allStuctures), syl: 7 },
//   { pos: pickRandomStructure(allStuctures), syl: 5 },
// ];

////takes list of words and builds haiku of correct syllables
function makeHaiku(titleArray: string[]) {
  let wordList = getTopWords(titleArray);

  const syl: number[] = [5, 7, 5];
  const haiku: string[] = ['', '', ''];

  for (let i = 0; i < syl.length; i++) {
    let syllableCount = 0;
    while (syllableCount < syl[i]) {
      let randomWord = pickRandomString(wordList);
      if (syllableCount + syllable(randomWord) <= syl[i]) {
        /// if 1 less than syl[i] then add 'a' or 'the' before the first noun
        haiku[i] += ' ' + randomWord;
        syllableCount += syllable(randomWord);
      }
    }
  }

  // console.log({ haiku });
  return haiku;
}

/////----------get sentiment score
function getSent(text: string) {
  const doc = nlp.readDoc(text);
  const sentiment = doc.out(its.sentiment);
  return sentiment;
}

// pick random string from list and remove ////
function pickRandomString(arr: string[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const random = arr.splice(randomIndex, 1)[0];
  return random;
}
function pickRandomStructure(arr: string[][]) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

/////// takes in array of titles , removes stopwords and counts most used words
/////  returns array of most used words to be made into haikus
/////////// how to allow for better haikus   //////////////
/// basic version just get top twenty used words without stopwords

function getTopWords(titleArray: string[]) {
  // Combine all sentences into a single string
  const text = titleArray.join(' ');
  text.replace(/[^\p{L}\s]/gu, ''); ///removes non letter characters
  // Split the text into words
  let words = text.split(/[\s,.?!;:]+/);

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].replace(/[^\p{Letter}\s]/gu, ''); // replace all non-letter characters except for whitespace with an empty string
    //could lower case anything that isnt a propernoun ---------
    if (whatPOS(words[i])[0] !== 'PROPN') {
      words[i] = words[i].toLowerCase();
    }
  }
  // count their occurrences
  const wordCounts = new Map<string, number>();
  for (let i = 0; i < words.length; i++) {
    if (!stopwords.includes(words[i].toLowerCase())) {
      const count = wordCounts.get(words[i]) || 0;
      wordCounts.set(words[i], count + 1);
    }
  }

  // Sort the words by frequency and return the top 20
  const sortedWords = Array.from(wordCounts.entries()).sort(
    (a, b) => b[1] - a[1]
  );
  const mostUsedWords = sortedWords.slice(0, 20).map(([word]) => word);

  return mostUsedWords;
}

/// returns part of speech of word
function whatPOS(aword: string) {
  const doc = nlp.readDoc(aword);
  const tag = doc.tokens().out(its.pos);
  return tag;
}

/// add proper nouns and allow for some stopwords
/// ********************
//i was using this when i was trying to get a selection fo different kind of words
// now not being used
function wordCount(titleArray: string[]) {
  console.log({ titleArray });
  const properWordCountMap = new Map();
  let topProper: string[] = [];
  const wordCountMap = new Map();
  const stopWordCountMap = new Map();
  let topWords: string[] = [];
  titleArray.forEach((title) => {
    const words = title.split(' ');
    const cleanWords = words.map((word) => word.replace(/[^a-zA-Z]/g, ''));

    cleanWords.forEach((word) => {
      if (!stopwords.includes(word.toLowerCase()) && /^[A-Z]/.test(word)) {
        // const count = properWordCountMap.get(word) || 0;
        // properWordCountMap.set(word, count + 1);
        topProper.push(word);
      }
      if (!stopwords.includes(word) && !/[^a-zA-Z]/.test(word.toLowerCase())) {
        const count = wordCountMap.get(word) || 0;
        wordCountMap.set(word, count + 1);
      }
      // get some stopwords
      if (stopwords.includes(word)) {
        const count = stopWordCountMap.get(word) || 0;
        stopWordCountMap.set(word, count + 1);
      }
    });
  });

  //   const topProper = [...properWordCountMap.entries()]
  //     .sort((a, b) => b[1] - a[1])
  //     .slice(0, 20)
  //     .map((entry) => entry[0]);
  const topNormWords = [...wordCountMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map((entry) => entry[0]);
  const topStopWords = [...stopWordCountMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map((entry) => entry[0]);
  //   console.log({ topProper });
  //   console.log({ topNormWords });
  //   console.log({ topStopWords });

  topWords = topProper.concat(topNormWords, topStopWords);

  return topWords;
}

export { makeHaiku, getSent };
