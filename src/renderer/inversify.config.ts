import "reflect-metadata";

import { Container } from "inversify";
import AppMainMenu from "./interfaces/AppMainMenu";
import RouterStore from "./interfaces/RouterStore";
import Ui from "./interfaces/Ui";
import AppMainMenuImpl from "./services/AppMainMenuImpl";
import ReactUi from "./services/ReactUi";
import routerFactory from "./services/Router";

const container = new Container();

container
  .bind(Ui)
  .to(ReactUi)
  .inSingletonScope();
container
  .bind(AppMainMenu)
  .to(AppMainMenuImpl)
  .inSingletonScope();
container.bind(RouterStore).toConstantValue(routerFactory());

export default container;
