import token from "../util/token";
import MainMenu from "./MainMenu";
import MenuActions from "./MenuActions";

interface AppMainMenu extends MainMenu<MenuActions> {}
const AppMainMenu = token<AppMainMenu>("AppMainMenu");

export default AppMainMenu;
