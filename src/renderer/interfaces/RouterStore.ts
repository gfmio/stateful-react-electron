import { RouterStore as MobxReactRouterStore } from "mobx-react-router";
import token from "../util/token";

type RouterStore = MobxReactRouterStore;
const RouterStore = token<RouterStore>("RouterStore");

export default RouterStore;
