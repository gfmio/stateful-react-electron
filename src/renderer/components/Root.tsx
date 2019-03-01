import { jsx } from "@emotion/core";
import { Provider } from "mobx-react";
import { FC } from "react";
import ErrorBoundary from "react-error-boundary";
import { hot } from "react-hot-loader";

import Injected from "../interfaces/Injected";

namespace Root {
  export interface Props extends Required<Injected.Stores> {}
}

const Root: FC<Root.Props> = ({ children, ...stores }) => (
  <ErrorBoundary>
    <Provider {...stores}>{children}</Provider>
  </ErrorBoundary>
);

export default hot(module)(Root);
