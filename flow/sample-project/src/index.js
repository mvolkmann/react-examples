// @flow
import filer from './filer';

filer('./haiku.txt', (lineCount: number) => {
  console.log('line count is', lineCount);
});
