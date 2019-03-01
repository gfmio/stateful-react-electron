import { useEffect, useState } from "react";

const usePersistedState = <T extends any>(key: string, defaultValue: T): [T, (value: T) => void, () => void] => {
  let currentValue = defaultValue;

  const persistedValue = sessionStorage.getItem(key);
  if (persistedValue) {
    currentValue = JSON.parse(persistedValue);
  } else {
    sessionStorage.setItem(key, JSON.stringify(currentValue));
  }

  const [statefulValue, setStatefulValue] = useState(currentValue);

  const setPersistedState = (value: T) => {
    sessionStorage.setItem(key, JSON.stringify(value));
    setStatefulValue(value);
  };

  const unsetPersistedState = () => setPersistedState(defaultValue);

  // Removes the item from storage on unmount
  useEffect(() => () => sessionStorage.removeItem(key), []);

  return [statefulValue, setPersistedState, unsetPersistedState];
};

export default usePersistedState;
