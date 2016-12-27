// @flow

import type {Named} from './type-alias-export';
import {sayHello} from './type-alias-export';

const mark: Named = {name: 'Mark', hobby: 'running'};
sayHello(mark);
sayHello({name: 'Tami', hobby: 'swimming'});
sayHello('Mark');
