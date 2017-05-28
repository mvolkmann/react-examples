declare class Liner {
  constructor(path: string): Liner;
  on(eventName: string, cb: Function): void;
  read(): string;
}
