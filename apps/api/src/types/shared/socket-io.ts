export interface MainEmitEvents {
  message: (arg: { from: string; message: string }) => void;
}

export interface MainListenEvents {
  message: (arg: string) => void;
}

export interface MainServerEvents {
  foo: (arg: string) => void;
}

export interface MainSocketData {
  foo: string;
}
