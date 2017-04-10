const server = require('./../src/server.js');
const tape = require('tape');
const querystring = require('querystring');


tape('login redirect', (t) => {
  const options = {
    method: 'GET',
    url: '/login'
  };

  server.inject(options, res => {
    t.equal(res.statusCode, 302, 'statusCode should be 302');

    const redirectUrlParams = querystring.parse(res.headers.location);
    const { redirect_uri }  = redirectUrlParams;
    const expectedRedirectUri = 'https://localhost:3000/welcome';

    // t.equal(redirect_uri, expectedRedirectUri, `the redirect_uri should be ${expectedRedirectUri}`);
    t.end();
  });
});
