import EventEmitter3 from "eventemitter3";
import Equal from "./Equal";
import Precisely from "./Precisely";

namespace TypedEventEmitter {
  export type ListenerFunction<T, K extends keyof T> = T[K] extends Precisely<T[K], void>
    ? (event: K) => any
    : T[K] extends any[]
    ? (event: K, ...args: T[K]) => any
    : (event: K, props: T[K]) => any;

  export interface EventEmitter<T> {
    /** Return an array listing the events for which the emitter has registered listeners. */
    eventNames(): Array<keyof T>;
    /** Return the listeners registered for a given event. */
    listeners<K extends keyof T & string>(event: K): Array<ListenerFunction<T, K>>;
    /** Return the number of listeners listening to a given event. */
    listenerCount<K extends keyof T & string>(event: K): number;
    /** Calls each of the listeners registered for a given event. */
    emit<K extends keyof T & string>(event: Equal<T[K], void, K, never>): boolean;
    emit<K extends keyof T & string>(event: K, props: T[K] extends any[] ? never : T[K]): boolean;
    emit<K extends keyof T & string>(event: K, ...args: T[K] extends any[] ? T[K] : [T[K]]): boolean;
    /** Add a listener for a given event. */
    on<K extends keyof T & string>(event: K, fn: ListenerFunction<T, K>, context?: any): this;
    /** Add a listener for a given event. */
    addListener<K extends keyof T & string>(event: K, fn: ListenerFunction<T, K>, context?: any): this;
    /** Add a one-time listener for a given event. */
    once<K extends keyof T & string>(event: K, fn: ListenerFunction<T, K>, context?: any): this;
    /** Remove the listeners of a given event. */
    removeListener<K extends keyof T & string>(
      event: K,
      fn?: ListenerFunction<T, K>,
      context?: any,
      once?: boolean,
    ): this;
    /** Remove the listeners of a given event. */
    off<K extends keyof T & string>(event: K, fn?: ListenerFunction<T, K>, context?: any, once?: boolean): this;
    /** Remove all listeners, or those of the specified event. */
    removeAllListeners<K extends keyof T & string>(event: K): this;
  }
}

type AnyFunction = (...args: any[]) => any;

class TypedEventEmitter<T extends object> implements TypedEventEmitter.EventEmitter<T> {
  public static get prefixed() {
    return EventEmitter3.prefixed;
  }
  public static set prefixed(value) {
    EventEmitter3.prefixed = value;
  }

  protected eventEmitter: EventEmitter3<keyof T & string>;

  constructor() {
    this.eventEmitter = new EventEmitter3();
  }

  /** Return an array listing the events for which the emitter has registered listeners. */
  public eventNames() {
    return this.eventEmitter.eventNames() as Array<keyof T>;
  }

  /** Return the listeners registered for a given event. */
  public listeners<K extends keyof T & string>(event: K) {
    return this.eventEmitter.listeners(event) as Array<TypedEventEmitter.ListenerFunction<T, K>>;
  }

  /** Return the number of listeners listening to a given event. */
  public listenerCount<K extends keyof T & string>(event: K) {
    return this.eventEmitter.listenerCount(event);
  }

  /** Calls each of the listeners registered for a given event. */
  public emit<K extends keyof T & string>(event: K, props: T[K] extends any[] ? never : T[K]): boolean;
  public emit<K extends keyof T & string>(event: K, ...args: T[K] extends any[] ? T[K] : [T[K]]): boolean;
  public emit<K extends keyof T & string>(event: K, ...args: any[]) {
    return this.eventEmitter.emit(event, ...args);
  }

  /** Add a listener for a given event. */
  public on<K extends keyof T & string>(event: K, fn: TypedEventEmitter.ListenerFunction<T, K>, context?: any): this {
    this.eventEmitter.on(event, fn as AnyFunction, context);
    return this;
  }

  /** Add a listener for a given event. */
  public addListener<K extends keyof T & string>(
    event: K,
    fn: TypedEventEmitter.ListenerFunction<T, K>,
    context?: any,
  ): this {
    this.eventEmitter.addListener(event, fn as AnyFunction, context);
    return this;
  }

  /** Add a one-time listener for a given event. */
  public once<K extends keyof T & string>(event: K, fn: TypedEventEmitter.ListenerFunction<T, K>, context?: any): this {
    this.eventEmitter.once(event, fn as AnyFunction, context);
    return this;
  }

  /** Remove the listeners of a given event. */
  public removeListener<K extends keyof T & string>(
    event: K,
    fn?: TypedEventEmitter.ListenerFunction<T, K>,
    context?: any,
    once?: boolean,
  ): this {
    this.eventEmitter.removeListener(event, fn as AnyFunction, context, once);
    return this;
  }

  /** Remove the listeners of a given event. */
  public off<K extends keyof T & string>(
    event: K,
    fn?: TypedEventEmitter.ListenerFunction<T, K>,
    context?: any,
    once?: boolean,
  ): this {
    this.eventEmitter.off(event, fn as AnyFunction, context, once);
    return this;
  }

  /** Remove all listeners, or those of the specified event. */
  public removeAllListeners<K extends keyof T & string>(event: K): this {
    this.eventEmitter.removeAllListeners(event);
    return this;
  }
}

export default TypedEventEmitter;
