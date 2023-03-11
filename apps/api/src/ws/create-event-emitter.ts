import { EventEmitter } from "events";

export type WSEvents = {
  [key: string]: (...params: any) => void;
};

interface TypedEventEmitter<TEvents extends WSEvents> {
  on<TEventKey extends keyof TEvents>(event: TEventKey, listener: TEvents[TEventKey]): this;
  off<TEventKey extends keyof TEvents>(event: TEventKey, listener: TEvents[TEventKey]): this;
  once<TEventKey extends keyof TEvents>(event: TEventKey, listener: TEvents[TEventKey]): this;
  emit<TEventKey extends keyof TEvents>(
    event: TEventKey,
    ...args: Parameters<TEvents[TEventKey]>
  ): boolean;
}

export function createEventEmitter<T extends WSEvents>() {
  return new EventEmitter() as TypedEventEmitter<T>;
}
