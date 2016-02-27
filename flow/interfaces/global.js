// This allows .css files to be imported in .js files using ES6 imports.
declare module CSSModule {
  declare var exports: { [key: string]: string };
}
