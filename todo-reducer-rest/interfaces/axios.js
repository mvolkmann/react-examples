// This approach is a work-around for delete being a keyword.
declare module 'axios' {
  declare var exports: {
    axios(config: ?Object): Promise,
    delete(url: string, config: ?Object): Promise;
    get(url: string, config: ?Object): Promise;
    head(url: string, config: ?Object): Promise;
    patch(url: string, config: ?Object): Promise;
    post(url: string, config: ?Object): Promise;
    put(url: string, config: ?Object): Promise;
  };
};
