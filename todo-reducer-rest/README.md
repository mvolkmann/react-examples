Setup steps
* npm install
* mongod
* npm run build

For production,
use the Node server to serve content AND host REST services.
* npm run rest-server
* browse localhost:8081

For development,
use Node server to host REST services and
use webpack-dev-server (with hot reload) to serve content.
* npm run rest-server
* npm start
* browse localhost:8080
