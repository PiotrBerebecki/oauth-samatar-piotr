module.exports = {
  method: 'GET',
  path: '/login',
  handler: (request, reply) => {
    reply.redirect('https://github.com/login/oauth/authorize?client_id=de1fa62e4dfedbccbf2b&redirect_uri=https://localhost:3000/welcome');
  }
};
