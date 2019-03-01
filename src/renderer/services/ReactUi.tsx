import { jsx } from "@emotion/core";
import { inject, injectable } from "inversify";
import ReactDOM from "react-dom";
import App from "../components/App";
import Root from "../components/Root";
import AppMainMenu from "../interfaces/AppMainMenu";
import RouterStore from "../interfaces/RouterStore";
import Ui from "../interfaces/Ui";

@injectable()
class ReactUi implements Ui {
  @inject(AppMainMenu)
  protected menu: AppMainMenu;

  @inject(RouterStore)
  protected router: RouterStore;

  public display() {
    ReactDOM.render(
      <Root menu={this.menu} router={this.router}>
        <App />
      </Root>,
      document.getElementById("app"),
    );
  }
}

export default ReactUi;
