// Disable browser warnings in development mode
(window as any).ELECTRON_DISABLE_SECURITY_WARNINGS = true;

import AppMainMenu from "./interfaces/AppMainMenu";
import Ui from "./interfaces/Ui";
import container from "./inversify.config";

container.get(Ui).display();
container.get(AppMainMenu).main();
