const functions = require('firebase-functions');
const fetch = require('node-fetch');
const moment = require('moment');

exports.getHabits = functions
  .region('europe-west2')
  .https.onRequest((request, response) => {
    const habitId = '95356A72-B8D4-4F58-B15B-78210B8511C5';
    const targetDate = getRecentSunday();
    const url = `https://api.habitify.me/status/${habitId}?target_date=${targetDate}`;

    response.set('Access-Control-Allow-Origin', '*');

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: functions.config().habitify.key,
      },
    })
      .then((response) => response.json())
      .then((data) => response.send(data.data));
  });

const getRecentSunday = () => {
  const d = moment().startOf('week');
  d.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

  return encodeURIComponent(d.format());
};
