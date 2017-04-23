// @flow
const Liner = require('liner');
// If this is used, Flow doesn't detect type errors.
// I suppose this is because it doesn't match any name under flow-typed/npm.
//const _ = require('lodash/string');
const _ = require('lodash');

/**
 * Outputs each line in the text file at the given path,
 * capitalizing the first letter of each word,
 * and calls cb with the number of lines read.
 */
function processFile(path: string, cb: (number) => void): void {
  let count = 0;
  const liner = new Liner(path);

  liner.on('readable', () => {
    while (true) {
      const line = liner.read();
      if (line === null) break;
      console.log(_.startCase(line));
      count++;
    }
  });

  liner.on('end', () => cb(count));

  liner.on('error', err => console.error(err));
}

export default processFile;
