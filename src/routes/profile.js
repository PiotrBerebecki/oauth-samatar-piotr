module.exports = {
  method: 'GET',
  path: '/profile',
  config: {
    auth: 'jwt'
  },
  handler: (request, reply) => {
    reply('profile page, thanks for logging in');
  }
};
