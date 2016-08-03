Setup steps
* download and install MongoDB
  - browse https://www.mongodb.com/
  - press "Download" button
  - select "Community Server" tab
  - press "DOWNLOAD" button
  - unzip the downloaded file
  - for Mac OS X, add bin directory of new directory to PATH
  - for Windows, ?
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
