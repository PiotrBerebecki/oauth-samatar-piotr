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

      hashString(access_token, (hashingErr, hash) => {
        if (hashingErr) {
          return reply('Sorry, problem processing your authorisation');
        }
        console.log('===== hash', hash);
        console.log('===== access_token', access_token);

        // let session = req.state.session;

          const session = {
            access_token: access_token, // hash could be used here but we don't know if we can decrypt it!
            last: Date.now()
          };


        return reply.redirect('/').state('samatar-piotr-cookie', session);
      });

    });
  }
}
