import { interfaces } from "inversify";
import PolyfillSymbol from "./Symbol";

const token = <T>(s?: string) =>
  ((s ? PolyfillSymbol.for(s) : PolyfillSymbol.unique()) as any) as interfaces.Abstract<T>;

export default token;
