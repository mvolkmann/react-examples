// @flow

//TODO: Can these imports be combined?
import type {NamedType} from './type-alias-export';
// eslint-disable-next-line no-duplicate-imports
import {sayHello} from './type-alias-export';

const mark: NamedType = {name: 'Mark', hobby: 'running'};
sayHello(mark);
sayHello({name: 'Tami', hobby: 'swimming'});
//sayHello('Mark');
