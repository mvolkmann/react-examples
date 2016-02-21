//TODO: Make this more explicit by not using "any".
declare module immutable {
  declare function fromJS(value: any): any;
  declare function Map(value: any): Object;
  declare function OrderedMap(value: any): Object;
}
