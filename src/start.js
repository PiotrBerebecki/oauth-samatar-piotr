const server = require('./server');

server.start((err)=>{
  if (err) throw err;
  console.log(`Server is running at ${server.info.uri}`);
});
