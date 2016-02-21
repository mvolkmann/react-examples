/*
declare class Promise {
  then(resolve: Function, reject: ?Function): Promise;
  catch(reject: Function): Promise;
}
*/

declare module axios {
  declare function axios(config: ?Object): Promise;
  //declare function delete(url: string, config: ?Object): Promise;
  declare function get(url: string, config: ?Object): Promise;
  declare function head(url: string, config: ?Object): Promise;
  declare function patch(url: string, config: ?Object): Promise;
  declare function post(url: string, config: ?Object): Promise;
  declare function put(url: string, config: ?Object): Promise;
}
