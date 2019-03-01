import token from "../util/token";

interface Ui {
  display(): void;
}
const Ui = token<Ui>("Ui");

export default Ui;
