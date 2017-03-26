/**
 * You might need to install node-fetch...if so then leave this line
 * otherwise comment it out.
 */
import fetch from 'node-fetch';

/**
 * Generic Application Headers required for each API call.
 * @type {Object}
 */
const APP_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  // Access Control Allow Methods is needed to 
  // run HTTP Calls on the concurrent JSON Server
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH'
};

/**
 * Generic FETCH() method implementation.
 * It returns a promise which has the final
 * JSON after going through the .json() method.
 * 
 * @param  {String}  options.url    The URL to fetch from
 * @param  {Object}  options.config The defined config object with method type, headers, mode, body, etc.
 * @return {Promise}
 */
function FETCH({ url, config }) {
  return new Promise((resolve, reject) => {
    fetch(url, config)
      .then(resp => {
        resp.json()
          .then(json => {
            resolve(json);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * Simple GET() method.
 * Returns a FETCH() call which returns a promise
 * 
 * @param  {String}  options.url     The URL to GET
 * @param  {Object}  options.headers Any additional headers
 * @return {Promise}
 */
export function GET({ url, headers }) {
  let config = {
    method: 'GET',
    headers: Object.assign({}, APP_HEADERS, headers),
    mode: 'cors',
    cache: 'default'
  };

  return FETCH({ url: url, config: config });
}

/**
 * Simple POST() method.
 * Returns a FETCH() call which returns a promise
 * 
 * @param  {String}  options.url     The URL to POST to
 * @param  {Object}  options.headers Any additional headers
 * @param  {Object}  options.body    The Body of the POST request
 * @return {Promise}
 */
export function POST({ url, headers, body }) {
  let config = {
    method: 'POST',
    headers: Object.assign({}, APP_HEADERS, headers),
    body: JSON.stringify(body),
    mode: 'cors',
    cache: 'default'
  };

  return FETCH({ url: url, config: config });
}

/**
 * Simple PUT() method.
 * Returns a FETCH() call which returns a promise
 * 
 * @param  {String}  options.url     The URL to PUT to
 * @param  {Object}  options.headers Any additional headers
 * @param  {Object}  options.body    The Body of the PUT request
 * @return {Promise}
 */
export function PUT({ url, headers, body }) {
  let config = {
    method: 'PUT',
    headers: Object.assign({}, APP_HEADERS, headers),
    body: JSON.stringify(body),
    mode: 'cors',
    cache: 'default'
  };

  return FETCH({ url: url, config: config });
}

/**
 * Simple PATCH() method.
 * Returns a FETCH() call which returns a promise
 * 
 * @param  {String}  options.url     The URL to PATCH to
 * @param  {Object}  options.headers Any additional headers
 * @param  {Object}  options.body    The Body of the PATCH request
 * @return {Promise}
 */
export function PATCH({ url, headers, body }) {
  let config = {
    method: 'PATCH',
    headers: Object.assign({}, APP_HEADERS, headers),
    body: JSON.stringify(body),
    mode: 'cors',
    cache: 'default'
  };

  return FETCH({ url: url, config: config });
}

/**
 * Simple DELETE() method.
 * Returns a FETCH() call which returns a promise
 * 
 * @param  {String}  options.url     The URL to DELETE to
 * @param  {Object}  options.headers Any additional headers
 * @return {Promise}
 */
export function DELETE({ url, headers }) {
  let config = {
    method: 'DELETE',
    headers: Object.assign({}, APP_HEADERS, headers),
    mode: 'cors',
    cache: 'default'
  };

  return FETCH({ url: url, config: config });
}
