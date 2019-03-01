import MainApp from "./MainApp";

MainApp.main({
  development: process.env.NODE_ENV !== "production",
});
