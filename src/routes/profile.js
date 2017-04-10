module.exports = {
  method: 'GET',
  path: '/profile',
  handler: (request, reply) => {

    console.log('===== request.state', request.state.samatar_piotr_cookie.access_token);

    reply('profile page');
  }
};
