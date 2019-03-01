import createHashHistory from "history/createHashHistory";
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";

const routerFactory = () => {
  const routerStore = new RouterStore();
  syncHistoryWithStore(createHashHistory(), routerStore);
  return routerStore;
};

export default routerFactory;
