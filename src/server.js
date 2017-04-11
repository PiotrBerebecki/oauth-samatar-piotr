const fs = require('fs');
const path = require('path');
const hapi = require('hapi');
const inert = require('inert');
const cookieAuthModule = require('hapi-auth-cookie');
const jwtAuth = require('hapi-auth-jwt2');

const routes = require('./routes');
const validateUser = require('./helpers/validate-user');

require('env2')('./config.env');


const options = {
    connections: {
        state: {
            isSameSite: 'Lax'
        }
    }
};

const server = new hapi.Server(options);


server.connection({
  port: process.env.PORT || 3000,
  tls: {
        key: fs.readFileSync(path.join(__dirname, '../keys/key.pem'), 'utf8'),
        cert: fs.readFileSync(path.join(__dirname, '../keys/cert.pem'), 'utf8')
    }
});


server.register([inert, cookieAuthModule, jwtAuth], (err) => {
  if (err) throw err;

  const strategyOptions = {
    key: process.env.CLIENT_SECRET,
    validateFunc: validateUser,
    verifyOptions: { algorithms: [ 'HS256' ] }
  }

  server.auth.strategy('jwt', 'jwt', strategyOptions);

  // server.auth.strategy('base', 'cookie', 'required', {
  //   password: process.env.COOKIE_PASSWORD,
  //   cookie: 'samatar_piotr_cookie',
  //   ttl: 24 * 60 * 60 * 1000
  // });

  server.route(routes);

});

module.exports = server;
