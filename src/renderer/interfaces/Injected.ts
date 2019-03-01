import AppMainMenu from "./AppMainMenu";
import RouterStore from "./RouterStore";

namespace Injected {
  export interface Menu {
    menu?: AppMainMenu;
  }

  export interface Router {
    router?: RouterStore;
  }

  export interface Stores extends Injected.Menu, Injected.Router {}
}

export default Injected;
