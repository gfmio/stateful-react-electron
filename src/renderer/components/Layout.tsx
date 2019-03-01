import { jsx } from "@emotion/core";
import { FC, Fragment } from "react";

import Nav from "./Nav";

const Layout: FC = ({ children }) => (
  <Fragment>
    <Nav />
    {children}
  </Fragment>
);

export default Layout;
