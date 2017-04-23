// @flow

//TODO: Can these imports be combined? It seems no.
//import {sayHello}, type {NamedType} from './type-alias-export';
import type {NamedType} from './type-alias-export';
// eslint-disable-next-line no-duplicate-imports
import {sayHello} from './type-alias-export';


const mark: NamedType = {name: 'Mark', hobby: 'running'};
sayHello(mark);
sayHello({name: 'Tami', hobby: 'swimming'});
//sayHello('Mark');
