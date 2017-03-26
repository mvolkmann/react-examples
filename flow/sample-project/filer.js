// @flow
const Liner = require('liner');
const _ = require('lodash/string');

// Flow requires types for this function because it is exported.
function processFile(path, cb) {
  const liner = new Liner(path);

  function readLines() {
    let count: number = 0;
    while (true) {
      const line = liner.read();
      if (line === null) break;
      console.log(_.startCase(line));
      count++;
    }
    cb(count);
  }

  liner.on('readable', readLines);
  liner.on('error', err => console.error(err));
}

exports.processFile = processFile;
//module.exports = processFile;
