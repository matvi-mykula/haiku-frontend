import { syllable } from 'syllable';

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

function wordSorter(words: string[]) {
  const sortedWords: Record<string, string[]> = {
    NOUN: [],
    PROPN: [],
    VERB: [],
    ADJ: [],
    ADV: [],
    PRON: [],
    ADP: [],
    PART: [],
    AUX: [],
    DET: [],
  };
  // Perform part-of-speech tagging on the words array
  words.forEach((word) => {
    const doc = nlp.readDoc(word);
    const tag = doc.tokens().out(its.pos);
    if (tag) {
      if (tag in sortedWords) {
        sortedWords[tag].push(word);
      }
    }
  });
  return sortedWords;
  // Iterate through the tagged words and sort them into separate arrays
}

const allStuctures = [
  ['ADJ', 'NOUN', 'VERB', 'NOUN'],
  ['ADJ', 'NOUN', 'VERB', 'ADV', 'VERB', 'NOUN'],
  ['NOUN', 'VERB', 'ADV', 'VERB', 'NOUN'],
  ['PRON', 'VERB', 'VERB', 'ADJ', 'NOUN'],
  ['NOUN', 'VERB', 'VERB', 'NOUN', 'VERB', 'NOUN'],
  ['ADJ', 'NOUN', 'VERB', 'PRON', 'VERB', 'NOUN'],
  ['ADJ', 'NOUN', 'VERB', 'PREP', 'DET', 'NOUN'],
  ['NOUN', 'VERB', 'DET', 'NOUN', 'VERB', 'PRON'],
];

const structures = [
  { pos: pickRandomStructure(allStuctures), syl: 5 },
  { pos: pickRandomStructure(allStuctures), syl: 7 },
  { pos: pickRandomStructure(allStuctures), syl: 5 },
];

////takes list of words and builds haiku of correct syllables
function makeHaiku(wordList: string[]) {
  wordList = wordList.filter(
    (elem: string) => !stopwords.includes(elem.toLowerCase())
  );
  const sortedWords = wordSorter(wordList);
  sortedWords['ADJ'].forEach((element) => {
    element.toLowerCase();
  });
  sortedWords['ADP'].forEach((element) => {
    element.toLowerCase();
  });
  sortedWords['DET'].forEach((element) => {
    element.toLowerCase();
  });
  sortedWords['NOUN'].forEach((element) => {
    element.toLowerCase();
  });
  sortedWords['PRON'].forEach((element) => {
    element.toLowerCase();
  });
  sortedWords['VERB'].forEach((element) => {
    element.toLowerCase();
  });

  sortedWords['NOUN'].concat(sortedWords['PROPN']);

  console.log({ sortedWords });

  const haiku = [];

  // get list of 3 strucutres and pass to below

  for (const structure of structures) {
    let line = '';
    let syllables = 0;
    for (const part of structure['pos']) {
      const words = sortedWords[part];
      const randomWord = pickRandomString(words);
      const wordSyllables = syllable(randomWord);
      if (syllables + wordSyllables > structure.syl) {
        break;
      }
      line += randomWord + ' ';
      syllables += wordSyllables;
      ///if phrase is at 4 or 6 insert the or a before first noun
    }
    console.log({ syllables });
    haiku.push(line.trim());
  }
  console.log({ haiku });
  return haiku;
}

// pick random string from list and remove ////
function pickRandomString(arr: string[]) {
  //   const randomIndex = Math.floor(Math.random() * arr.length);
  //   const random = arr.splice(randomIndex, 1)[0];
  //   return random;
  let index;
  let aString;

  //   if (arr) {
  index = Math.floor(Math.random() * arr.length);
  aString = arr[index];
  //   } else {
  //     index = Math.floor(Math.random());
  //     altArray[index] ? (aString = altArray[index]) : (aString = 'oops');
  //   }
  return aString;
}
function pickRandomStructure(arr: string[][]) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

///////////// stop words to not include //////////////
const stopwords = [
  '(oc)',
  'meirl',
  'MEIRL',
  ///// these are ones i added
  //   "i'm",
  'i',
  'me',
  'my',
  'myself',
  'we',
  'our',
  'ours',
  'ourselves',
  'you',
  'your',
  'yours',
  'yourself',
  'yourselves',
  'he',
  'him',
  'his',
  'himself',
  'she',
  'her',
  'hers',
  'herself',
  'it',
  'its',
  'itself',
  'they',
  'them',
  'their',
  'theirs',
  'themselves',
  'what',
  'which',
  'who',
  'whom',
  'this',
  'that',
  'these',
  'those',
  'am',
  'is',
  'are',
  'was',
  'were',
  'be',
  'been',
  //   'being',
  'have',
  'has',
  'had',
  'having',
  'do',
  'does',
  'did',
  'doing',
  'a',
  'an',
  'the',
  //   'and',
  'but',
  'if',
  'or',
  'because',
  'as',
  'until',
  'while',
  'of',
  'at',
  'by',
  'for',
  'with',
  'about',
  'against',
  'between',
  'into',
  'through',
  'during',
  'before',
  'after',
  'above',
  'below',
  'to',
  'from',
  'up',
  'down',
  'in',
  'out',
  'on',
  'off',
  'over',
  'under',
  'again',
  'further',
  'then',
  'once',
  'here',
  'there',
  'when',
  'where',
  'why',
  'how',
  'all',
  'any',
  'both',
  'each',
  'few',
  'more',
  'most',
  'other',
  'some',
  'such',
  'no',
  'nor',
  'not',
  'only',
  'own',
  'same',
  'so',
  'than',
  'too',
  'very',
  's',
  't',
  'can',
  'will',
  'just',
  'don',
  'should',
  'now',
];

export { makeHaiku };
