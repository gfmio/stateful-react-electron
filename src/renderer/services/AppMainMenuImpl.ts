import { MenuItemConstructorOptions, remote } from "electron";
import { injectable } from "inversify";
import AppMainMenu from "../interfaces/AppMainMenu";
import MenuActions from "../interfaces/MenuActions";
import TypedEventEmitter from "../util/TypedEventEmitter";

@injectable()
class AppMainMenuImpl implements AppMainMenu {
  protected eventEmitter: TypedEventEmitter<MenuActions> = new TypedEventEmitter();

  protected get menu(): MenuItemConstructorOptions[] {
    return [
      {
        label: "File",
        submenu: [
          {
            accelerator: "Ctrl+Q",
            click: () => remote.app.quit(),
            label: "Quit",
          },
        ],
      },
      {
        label: "View",
        submenu: [
          {
            accelerator: "CmdOrCtrl+R",
            click: (item, focusedWindow) => {
              if (focusedWindow) {
                // on reload, start fresh and close any old
                // open secondary windows
                if (focusedWindow.id === 1) {
                  remote.BrowserWindow.getAllWindows().forEach((win) => {
                    if (win.id > 1) {
                      win.close();
                    }
                  });
                }
                focusedWindow.reload();
              }
            },
            label: "Reload",
          },
          {
            accelerator: process.platform === "darwin" ? "Ctrl+Command+F" : "F11",
            click: (item, focusedWindow) => {
              if (focusedWindow) {
                focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
              }
            },
            label: "Toggle Full Screen",
          },
          {
            accelerator: process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
            click: (item, focusedWindow) => {
              if (focusedWindow) {
                (focusedWindow as any).toggleDevTools!();
              }
            },
            label: "Toggle Developer Tools",
          },
        ],
      },
      {
        label: "Run",
        submenu: [
          {
            accelerator: "CmdOrCtrl+F",
            click: () => {
              this.eventEmitter.emit("MAKE_RED_CLICKED");
              console.log("MAKE_RED_CLICKED", this.eventEmitter.listenerCount("MAKE_RED_CLICKED"));
            },
            enabled: this.eventEmitter.listenerCount("MAKE_RED_CLICKED") > 0,
            label: "Toggle Red",
          },
          {
            accelerator: "CmdOrCtrl+G",
            click: () => {
              this.eventEmitter.emit("MAKE_GREEN_CLICKED");
              console.log("MAKE_GREEN_CLICKED", this.eventEmitter.listenerCount("MAKE_GREEN_CLICKED"));
            },
            enabled: this.eventEmitter.listenerCount("MAKE_GREEN_CLICKED") > 0,
            label: "Toggle Green",
          },
        ],
      },
    ];
  }

  public main() {
    this.displayMenu();
  }

  public on<K extends keyof MenuActions>(event: K, fn: TypedEventEmitter.ListenerFunction<MenuActions, K>) {
    this.eventEmitter.on(event, fn);
    const dispose = () => {
      this.eventEmitter.off(event, fn);
      this.onEventListenerChange();
    };
    this.onEventListenerChange();
    return dispose;
  }

  public once<K extends keyof MenuActions>(event: K, fn: TypedEventEmitter.ListenerFunction<MenuActions, K>) {
    this.eventEmitter.once(event, fn);
    const dispose = () => {
      this.eventEmitter.off(event, fn, true);
      this.onEventListenerChange();
    };
    this.onEventListenerChange();
    return dispose;
  }

  protected onEventListenerChange() {
    this.displayMenu();
  }

  protected displayMenu() {
    remote.Menu.setApplicationMenu(remote.Menu.buildFromTemplate(this.menu));
  }
}

export default AppMainMenuImpl;
