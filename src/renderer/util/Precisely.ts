import Equal from "./Equal";
type Precisely<T, U> = Equal<T, U, T, never>;
export default Precisely;
