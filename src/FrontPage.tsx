import {
  Box,
  Button,
  Flex,
  Text,
  Loader,
  NumberInput,
  TextInput,
} from '@mantine/core';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
// import { syllable } from 'syllable';
import { makeHaiku, getSent } from './makeHaikuReactive';
import { getColor } from './getColor';
import './App.css';
// import { Twilio } from 'twilio';
import { useForm } from '@mantine/form';

//  import DashIconify from 'DashIconify'

interface Props {
  url: string;
  setColor: Function;
  color: string;
}

const DailyFrontPage: React.FC<Props> = ({ url, setColor, color }) => {
  const [haiku, setHaiku] = useState(['']);
  const [topWords, setTopWords] = useState(['']);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        const postsData = response.data.data.children.map((post: any) => {
          return post.data.title;
        });
        console.log('axios');
        setTopWords(postsData);
        const haikuLocal = makeHaiku(postsData);
        setHaiku(haikuLocal);
        setColor(getColor(getSent(haiku.join(' '))));

        setLoaded(true);
      })
      .catch((err: Error) => {
        console.log(err);
      });
    //   const topTwenty = wordCount(postsData);
  }, [url]);

  //// ---- collect number ---  do i want to do this? /// could be open to abuse...
  const form = useForm({
    initialValues: {
      number: '',
    },
    validate: {
      number: (value: string) => {
        if (!value.match(/^\d{10}$/)) {
          return 'Phone number should be 10 digits';
        }
      },
    },
  });

  const postMessageToPhone = (number: string, msg: string) => {
    axios
      .post('http://localhost:8080/sendMessage', {
        number: number,
        msg: msg,
      })
      .then((response) => {
        console.log('message should be sent');
      });
  };

  return (
    <Box
      style={{
        backgroundColor: color,
        background: `radial-gradient(circle at center, white, ${color})`,
        color: 'black',
        borderRadius: '20px',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
      }}
    >
      {loaded ? (
        haiku.map((str, index) => (
          <Text
            size="xl"
            style={{
              fontSize: 'calc(15px + 1vw)',

              textAlign: 'center',
              fontWeight: 'bold',
            }}
            key={index}
          >
            {str}
          </Text>
        ))
      ) : (
        <Loader
          size="xl"
          style={{ margin: 'auto' }}
        />
      )}

      <br></br>
      {/* <Flex
        style={{ height: '200px' }}
        justify="center"
        align="end"
      > */}
      <Box
        style={{
          position: 'fixed',
          bottom: '5%',
          display: 'flex',
          flexDirection: 'row',
          margin: '5%',
          justifyContent: 'space-between',
        }}
      >
        <Button
          onClick={() => {
            const haiku = makeHaiku(topWords);
            setHaiku(haiku);
            setColor(getColor(getSent(haiku.join(' '))));
          }}
        >
          Next
        </Button>
        <Box
          style={
            {
              // display: 'flex',
              // flexDirection: 'row',
            }
          }
        >
          <form
            onSubmit={form.onSubmit((values) => {
              console.log(values['number']);
              postMessageToPhone(form.values.number, haiku.join('\n'));
              // sendMessage(haiku);
            })}
          >
            <Button
              type="submit"
              mt="sm"
            >
              Submit
            </Button>
            <TextInput
              // label="Number"
              placeholder="9876543210"
              {...form.getInputProps('number')}
            />
          </form>
        </Box>
      </Box>
      {/* </Flex> */}
    </Box>
  );
};

export { DailyFrontPage };

// /////// takes in array of titles , removes stopwords and counts most used words
// /////  returns array of most used words to be made into haikus
// /////////// how to allow for better haikus   //////////////

// /// add proper nouns and allow for some stopwords
// function wordCount(titleArray: string[]) {
//   console.log({ titleArray });
//   const properWordCountMap = new Map();
//   let topProper: string[] = [];
//   const wordCountMap = new Map();
//   const stopWordCountMap = new Map();
//   let topWords: string[] = [];
//   titleArray.forEach((title) => {
//     const words = title.split(' ');
//     const cleanWords = words.map((word) => word.replace(/[^a-zA-Z]/g, ''));

//     cleanWords.forEach((word) => {
//       if (!stopwords.includes(word.toLowerCase()) && /^[A-Z]/.test(word)) {
//         // const count = properWordCountMap.get(word) || 0;
//         // properWordCountMap.set(word, count + 1);
//         topProper.push(word);
//       }
//       if (!stopwords.includes(word) && !/[^a-zA-Z]/.test(word.toLowerCase())) {
//         const count = wordCountMap.get(word) || 0;
//         wordCountMap.set(word, count + 1);
//       }
//       // get some stopwords
//       if (stopwords.includes(word)) {
//         const count = stopWordCountMap.get(word) || 0;
//         stopWordCountMap.set(word, count + 1);
//       }
//     });
//   });

//   //   const topProper = [...properWordCountMap.entries()]
//   //     .sort((a, b) => b[1] - a[1])
//   //     .slice(0, 20)
//   //     .map((entry) => entry[0]);
//   const topNormWords = [...wordCountMap.entries()]
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, 20)
//     .map((entry) => entry[0]);
//   const topStopWords = [...stopWordCountMap.entries()]
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, 20)
//     .map((entry) => entry[0]);
//   //   console.log({ topProper });
//   //   console.log({ topNormWords });
//   //   console.log({ topStopWords });

//   topWords = topProper.concat(topNormWords, topStopWords);

//   return topWords;
// }

///------------- original ------------ ////////
// function wordCount(titleArray: string[]) {
//     const wordCountMap = new Map();

//     titleArray.forEach((title) => {
//       const words = title.toLowerCase().split(' ');

//       words.forEach((word) => {
//         if (!stopwords.includes(word) && !/[^a-zA-Z]/.test(word)) {
//           const count = wordCountMap.get(word) || 0;
//           wordCountMap.set(word, count + 1);
//         }
//       });
//     });

//     const topWords = [...wordCountMap.entries()]
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 20)
//       .map((entry) => entry[0]);

//     return topWords;
//   }
//////// make a haiku //////////////////////// 575  ORIGINAL
// function makeHaiku(wordList: string[]) {
//   let syllables = [0, 0, 0];
//   let firstLine = '';
//   let secondLine = '';
//   let thirdLine = '';

//   let copy: string[] = wordList.slice();
//   ///for 3 lines
//   while (syllables[0] < 5) {
//     let randomString = pickRandomString(copy);
//     if (syllables[0] + syllable(randomString) <= 5) {
//       firstLine += randomString + ' ';
//       syllables[0] += syllable(randomString);
//     }
//   }
//   while (syllables[1] < 7) {
//     let randomString = pickRandomString(copy);
//     if (syllables[1] + syllable(randomString) <= 7) {
//       secondLine += randomString + ' ';
//       syllables[1] += syllable(randomString);
//     }
//   }
//   while (syllables[2] < 5) {
//     let randomString = pickRandomString(copy);
//     if (syllables[2] + syllable(randomString) <= 5) {
//       thirdLine += randomString + ' ';
//       syllables[2] += syllable(randomString);
//     }
//   }
//   console.log(firstLine);
//   console.log(secondLine);
//   console.log(thirdLine);
//   return [firstLine, secondLine, thirdLine];
// }

// // pick random string from list and remove ////
// function pickRandomString(arr: string[]) {
//   const randomIndex = Math.floor(Math.random() * arr.length);
//   const randomString = arr.splice(randomIndex, 1)[0];
//   return randomString;
// }
