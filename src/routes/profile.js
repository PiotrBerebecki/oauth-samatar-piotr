module.exports = {
  method: 'GET',
  path: '/profile',
  handler: (request, reply) => {

    console.log('===== request', request.auth);

    reply('profile page');
  }
};
