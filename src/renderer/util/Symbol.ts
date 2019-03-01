type PolyfillSymbol<S extends string> = symbol | { symbol: S };

const knownSymbols: { [K in string]: PolyfillSymbol<K> } = {};
const newSymbol = <S extends string>(symbol: S) => {
  let s = knownSymbols[symbol];
  if (!s) {
    s = Symbol.for(symbol);
    knownSymbols[symbol] = s;
  }
  return s;
};

const uniqueSymbol = () => {
  let n = 0;
  let s = n.toString();
  while (knownSymbols[s]) {
    n++;
    s = n.toString();
  }
  return newSymbol(s);
};

const PolyfillSymbol = {
  for: newSymbol,
  unique: uniqueSymbol,
};

export default PolyfillSymbol;
