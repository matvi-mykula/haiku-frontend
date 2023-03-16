import axios from 'axios';

/////////////
function figureAPI() {
  console.log(window.location);
  console.log(process.env.NODE_ENV);
  const devBackend = 'http://localhost:8080/';
  const prodBackend = 'https://dry-silence-9236.fly.dev/';

  console.log({ prodBackend });
  const prodEnv = process.env.NODE_ENV === 'production';
  console.log(prodEnv);
  let environment;
  prodEnv ? (environment = prodBackend) : (environment = devBackend);
  return environment;
}

const environment = figureAPI();

console.log({ environment });

// send top words of the day to server for processing
// get haiku as response

const fetchHaiku = async (topWords: string[]) => {
  console.log({ topWords });
  axios
    .post(environment + `sendData`, { topWords })
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export { fetchHaiku };
