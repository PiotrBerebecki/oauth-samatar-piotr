const fs = require('fs');
const path = require('path');
const hapi = require('hapi');
const inert = require('inert');
const cookieAuthModule = require('hapi-auth-cookie');

const routes = require('./routes');

require('env2')('./config.env');


const server = new hapi.Server();


server.connection({
  port: process.env.PORT || 3000,
  tls: {
        key: fs.readFileSync(path.join(__dirname, '../keys/key.pem'), 'utf8'),
        cert: fs.readFileSync(path.join(__dirname, '../keys/cert.pem'), 'utf8')
    }
});


server.register([inert, cookieAuthModule], (err) => {
  if (err) throw err;

  server.auth.strategy('base', 'cookie', 'optional', {
    password: process.env.COOKIE_PASSWORD,
    cookie: 'samatar_piotr_cookie',
    ttl: 24 * 60 * 60 * 1000
  });

  server.route(routes);

});

module.exports = server;
