//TODO: Make this more explicit by not using "any".
declare module immutable {
  // "Map" is both a class and a function in Immutable.
  // Flow can't handle that, so I'm giving the class
  // an alternate name for type checking purposes.
  declare class IMap {
    get(key: any, notSetValue?: any): any,
    set(key: any, value: any): IMap
  }

  declare function fromJS(value: any): any;
  declare function Map(value: any): IMap;
  declare function OrderedMap(value: any): Object;
}
