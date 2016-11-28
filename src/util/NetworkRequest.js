import request from 'superagent';
import Promise from 'bluebird';
import NetworkError from '../models/NetworkError';
import URL from 'url';

/**
 * @function fetchDataAtUrl
 * @param  {Url String} url The URL to get json data from.
 * @return {Promise}        A promise to fetch data via AJAX.
 */

export function fetchDataAtUrl(url, query={}) {
  return new Promise((resolve, reject) => {
    request.get(url)
      .query(query)
      .end((err, res) => {
        if (err) {
          reject(NetworkError(err));
        } else {
          if (res.body === null) {
            resolve(JSON.parse(res.text));
          } else {
            resolve(res.body);
          }
        }
      });
  });
};
