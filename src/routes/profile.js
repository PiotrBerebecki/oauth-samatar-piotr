module.exports = {
  method: 'GET',
  path: '/profile',

  handler: (request, reply) => {

    console.log('===== request.auth', request.auth);
    reply('profile page, thanks for logging in');
  }
};
