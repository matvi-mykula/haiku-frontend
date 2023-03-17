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

const structures = [
  ['DET', 'NOUN', 'AUX', 'ADJ'],
  ['ADP', 'VERB', 'PART', 'NOUN'],
  ['PRON', 'VERB', 'VERB', 'AUX', 'ADJ'],
];

////takes list of words and builds haiku of correct syllables
function makeHaiku(wordList: string[]) {
  const sortedWords = wordSorter(wordList);
  //combine nouns and propernouns

  console.log({ sortedWords });
  let syllables = [0, 0, 0];
  let firstLine = '';
  let secondLine = '';
  let thirdLine = '';

  //   let copy: string[] = wordList.slice();
  ///for 3 lines
  let structure = pickRandomStructure(structures); //chooses phrase structure
  console.log({ structure });
  let structureIndex = 0; // initial pos
  while (syllables[0] < 5) {
    console.log(typeof sortedWords['NOUN']);
    console.log(sortedWords[structure[structureIndex]]);
    console.log({ firstLine });
    console.log(structure[structureIndex]);
    // let aString = pickRandomString(sortedWords[structure[structureIndex]]);
    let aString;
    pickRandomString(sortedWords[structure[structureIndex]])
      ? (aString = pickRandomString(sortedWords[structure[structureIndex]]))
      : (aString = sortedWords[structure[structureIndex]][0]);

    if (syllables[0] + syllable(aString) <= 5) {
      firstLine += aString + ' ';
      syllables[0] += syllable(aString);
      structureIndex += 1;
    }
  }
  structure = pickRandomStructure(structures); //chooses phrase structure
  structureIndex = 0; // initial pos
  while (syllables[1] < 7) {
    let aString = pickRandomString(sortedWords[structure[structureIndex]]);
    if (syllables[1] + syllable(aString) <= 7) {
      secondLine += aString + ' ';
      syllables[1] += syllable(aString);
      structureIndex += 1;
    }
  }
  structure = pickRandomStructure(structures); //chooses phrase structure
  structureIndex = 0; // initial pos
  while (syllables[2] < 5) {
    let aString = pickRandomString(sortedWords[structure[structureIndex]]);
    if (syllables[2] + syllable(aString) <= 5) {
      thirdLine += aString + ' ';
      syllables[2] += syllable(aString);
      structureIndex += 1;
    }
  }
  console.log(firstLine);
  console.log(secondLine);
  console.log(thirdLine);
  return [firstLine, secondLine, thirdLine];
}

// pick random string from list and remove ////
function pickRandomString(arr: string[]) {
  console.log({ arr });
  //   const randomIndex = Math.floor(Math.random() * arr.length);
  //   const random = arr.splice(randomIndex, 1)[0];
  //   return random;
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}
function pickRandomStructure(arr: string[][]) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

///////////// stop words to not include //////////////
const stopwords = [
  ///// these are ones i added
  '(oc)',
  //   "i'm",
  'i',
  //   'me',
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
  //   'it',
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
