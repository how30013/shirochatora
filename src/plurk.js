import OAuth from 'oauth'
import https from 'https'
import fs from 'fs'
import url from 'url'
import fetch from 'node-fetch'

export default class Plurk {
  constructor(appKey, appSecret, token, tokenSecret) {
    this.appKey = appKey;
    this.appSecret = appSecret;
    this.token = token;
    this.tokenSecret = tokenSecret;
    this.requestTokenUrl = 'https://www.plurk.com/OAuth/request_token';
    this.accessTokenUrl = 'https://www.plurk.com/OAuth/access_token';
    this.oauth = this.getOAuth();
    this.fetchWithTimeout = this.fetchWithTimeout.bind(this);
  }

  getOAuth() {
    return this.oauth || new OAuth.OAuth(this.requestTokenUrl,
      this.accessTokenUrl,
      this.appKey,
      this.appSecret,
      '1.0',
      null,
      'HMAC-SHA1'
    );
  }

  server() {
    const ip = '127.0.0.1';
    const port = '1337';
    https.createServer(this.onRequest).listen(port, ip);
    console.log('Server start');
  }

  onRequest(request, response) {
    console.log('Request received');
    response.writeHead(200, {'Contetnt-Type': "text/plain"});
    response.write('Hello, World');
    response.end();
  }

  get(path, callback) {
    return this.oauth.get(path, this.token, this.tokenSecret, callback);
  }

  post(path, parameter, callback) {
    return this.oauth.post(path, this.token, this.tokenSecret, parameter, callback);
  }

  pollingNewPlurk(callback) {
    this.get('https://www.plurk.com/APP/Realtime/getUserChannel', (e, data, res) => {
      if (e) {
        console.log(e);
        return;
      }
      let jsonData = JSON.parse(data);
      const cometServer = jsonData['comet_server'];
      let parsedUrl = url.parse(cometServer, true);
      let offset = parsedUrl.query['offset'];
      let channel = parsedUrl.query['channel'];
      let baseUrl = `${/[^?]+/.exec(cometServer)}?channel=${channel}`;
      this.fetchWithTimeout(80000, baseUrl, callback, offset);
    });
  }

  fetchWithTimeout(timeout, pollingUrl, callback, offset) {
    let timeoutAction = new Promise((resolve, reject) => {
      setTimeout(reject, timeout, offset);
    })
    const options = {
      agent:new https.Agent({rejectUnauthorized:false})
    };

    let fetchAction = new Promise((resolve, reject) => {
      fetch(`${pollingUrl}&offset=${offset}`, options)
        .then(response => response.text())
        .then(text => {
          let from = text.indexOf('{');
          let to = text.lastIndexOf('}') + 1;
          return JSON.parse(text.substring(from, to));
        })
        .then(json => resolve(json))
        .catch(reject)
    });
    return Promise
      .race([timeoutAction, fetchAction])
      .then(json => {
        let newOffset = json['new_offset'];
        callback(json);
        this.fetchWithTimeout(timeout, pollingUrl, callback, newOffset);
      }, originalOffset => {
        this.fetchWithTimeout(timeout, pollingUrl, callback, originalOffset);
      })
      .catch(err => console.log(err))
  }

  storeHistory(plurk) {
    fs.exists('./history', (exists) => {
      if (!exists) {
        fs.mkdirSync('./history', (err, folder) => {
          if (err) throw err;
        });
      }

      fs.writeFile(`./history/plurk_${plurk.plurk_id || plurk.id}.json`, JSON.stringify(plurk), err => {
        if (err) throw err;
      });
    })
  }

}
