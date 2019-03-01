import TypedEventEmitter from "../util/TypedEventEmitter";

export default interface MainMenu<T extends object> {
  main(): void;
  on<K extends keyof T>(event: K, fn: TypedEventEmitter.ListenerFunction<T, K>, context?: any): () => void;
  once<K extends keyof T>(event: K, fn: TypedEventEmitter.ListenerFunction<T, K>, context?: any): () => void;
}
