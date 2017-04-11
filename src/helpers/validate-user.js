const users = require('./../database/users');


module.exports = (token, request, callback) => {
  console.log('===== token', token);
  if (!users[token.user.user_id]) {
     return callback(null, false);
   }
   return callback(null, true);
};
