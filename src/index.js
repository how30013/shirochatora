import Plurk from './plurk.js'
import fs from 'fs'
import WeatherHelper from './weatherHelper.js'
import ChatHelper from './chatHelper.js'

let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let plurk = new Plurk(config.appKey, config.appSecret, config.token, config.tokenSecret);
const USER_ID = config.userId;
const USER_ACCOUNT = config.account;

let chatHelper = new ChatHelper();

plurk.pollingNewPlurk(res => {
  console.log(require('util').inspect(res));
  if (!res.data) {
    return;
  }
  for (let newPlurk of res.data) {
    let content;
    switch (newPlurk.type) {
      case 'new_plurk':
        if (+newPlurk.owner_id == USER_ID) {
          return;
        }
        content = newPlurk.content;
        break;
      case 'new_response':
        if (newPlurk.user[USER_ID]) {
          return;
        }
        content = newPlurk.response.content;
        let contentRaw = newPlurk.response.content_raw;
        if (contentRaw.indexOf(`@${USER_ACCOUNT}`) === -1) {
          return;
        }
      default:
        break;
    }

    let plurkResponse = {
      'plurk_id': newPlurk.plurk_id,
      'content': chatHelper.getResponse(content),
      'qualifier': ':'
    };
    plurk.post('https://www.plurk.com/APP/Responses/responseAdd', plurkResponse, (e, data, res) => {
      let jsonData = JSON.parse(data);
      if (e) console.error(e);
      plurk.storeHistory(jsonData);
    });
  }
});

// let helper = new WeatherHelper();
//
// helper.fetchWeather('台北').then(res => {
//   console.log('1:   ' + require('util').inspect(res));
// }).then(() => {
//   helper.fetchWeather('台北').then(res => {
//     console.log('2:   ' + require('util').inspect(res));
//   });
// });
