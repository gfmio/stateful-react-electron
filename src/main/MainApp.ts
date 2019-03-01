import { MainProcessElectronApplication, MainProcessElectronApplicationProps } from "@service/electron";
import { Menu } from "electron";

class MainApp extends MainProcessElectronApplication {
  constructor(props: MainProcessElectronApplicationProps) {
    super(props);
  }

  protected displayMenu() {
    Menu.setApplicationMenu(Menu.buildFromTemplate([]));
  }

  protected async main() {
    /* Empty on purpose */
  }
}

export default MainApp;
