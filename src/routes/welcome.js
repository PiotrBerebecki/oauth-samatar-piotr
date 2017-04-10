const request = require('request');

module.exports={
  method: 'GET',
  path: '/welcome',
  handler: (req, reply)=>{
    const query = req.query;
    const options = {
      method: 'POST',
      url:`https://github.com/login/oauth/access_token?code=${query.code}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
    };

    request(options, (error, response, body)=>{
      console.log(`Body`, body)
      reply.redirect('/');
    })
  }
}
