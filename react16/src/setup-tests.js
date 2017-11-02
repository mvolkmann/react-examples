// See https://github.com/airbnb/enzyme/blob/master/docs/guides/migration-from-2-to-3.md
// This file is required to use Enzyme 3 with React 16.

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});
