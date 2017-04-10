const request = require('request');
const querystring = require('querystring');
const hashString = require('./../helpers/hash-string');


module.exports={
  method: 'GET',
  path: '/welcome',
  handler: (req, reply) => {
    const query = req.query;
    const options = {
      method: 'POST',
      url:`https://github.com/login/oauth/access_token?code=${query.code}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
    };

    request(options, (error, response, body)=>{

      const githubQueries = querystring.parse(body);
      const { access_token } = githubQueries;


      // hash the access_token
      hashString(access_token, (hashingErr, hash) => {
        if (hashingErr) {
          return reply('Sorry, problem processing your authorisation');
        }

        const session = {
          access_token: hash,
          last: Date.now()
        };

        // save the ahashedccess_token to
        return reply.redirect('/').state('samatar_piotr_cookie', session);
      });

    });
  }
}
