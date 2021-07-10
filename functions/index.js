const functions = require('firebase-functions');
const fetch = require('node-fetch');

exports.helloWorld = functions
  .region('europe-west2')
  .https.onRequest((request, response) => {
    functions.logger.info('Hello logs!', { structuredData: true });

    fetch('https://api.habitify.me/habits', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: functions.config().habitify.key,
      },
    })
      .then((response) => response.json())
      .then((data) => response.send(data));
  });
