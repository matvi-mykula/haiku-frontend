import { Box, Button, Text } from '@mantine/core';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { fetchHaiku } from './requests';
import { syllable } from 'syllable';

const DailyFrontPage = () => {
  const url = 'https://reddit.com/';

  const [haiku, setHaiku] = useState(['']);
  const [topWords, setTopWords] = useState(['']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://www.reddit.com/r/popular/top.json').then((response) => {
      const postsData = response.data.data.children.map((post: any) => {
        return post.data.title;
      });
      const topTwenty = wordCount(postsData);
      setTopWords(topTwenty);
      console.log(topWords);
    });
  }, []);

  //   useEffect(() => {
  //     if (topWords.length > 1) {
  //       console.log({ topWords });
  //       setHaiku(makeHaiku(topWords));
  //     }
  //   }, [topWords]);

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
      }}
    >
      {haiku.map((str, index) => (
        <Text
          size="xl"
          style={{}}
          key={index}
        >
          {str}
        </Text>
      ))}
      <br></br>
      <Box>
        <Button
          onClick={() => {
            setHaiku(makeHaiku(topWords));
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export { DailyFrontPage };

/////// takes in array of titles , removes stopwords and counts most used words
/////  returns array of most used words to be made into haikus
function wordCount(titleArray: string[]) {
  const wordCountMap = new Map();

  titleArray.forEach((title) => {
    const words = title.toLowerCase().split(' ');

    words.forEach((word) => {
      if (!stopwords.includes(word) && !/[^a-zA-Z]/.test(word)) {
        const count = wordCountMap.get(word) || 0;
        wordCountMap.set(word, count + 1);
      }
    });
  });

  const topTenWords = [...wordCountMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map((entry) => entry[0]);

  return topTenWords;
}

//////// make a haiku //////////////////////// 575
function makeHaiku(wordList: string[]) {
  let syllables = [0, 0, 0];
  let firstLine = '';
  let secondLine = '';
  let thirdLine = '';

  let copy: string[] = wordList.slice();
  ///for 3 lines
  while (syllables[0] < 5) {
    let randomString = pickRandomString(copy);
    if (syllables[0] + syllable(randomString) <= 5) {
      firstLine += randomString + ' ';
      syllables[0] += syllable(randomString);
    }
  }
  while (syllables[1] < 7) {
    let randomString = pickRandomString(copy);
    if (syllables[1] + syllable(randomString) <= 7) {
      secondLine += randomString + ' ';
      syllables[1] += syllable(randomString);
    }
  }
  while (syllables[2] < 5) {
    let randomString = pickRandomString(copy);
    if (syllables[2] + syllable(randomString) <= 5) {
      thirdLine += randomString + ' ';
      syllables[2] += syllable(randomString);
    }
  }
  console.log(firstLine);
  console.log(secondLine);
  console.log(thirdLine);
  return [firstLine, secondLine, thirdLine];
}

// pick random string from list and remove ////
function pickRandomString(arr: string[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const randomString = arr.splice(randomIndex, 1)[0];
  return randomString;
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
