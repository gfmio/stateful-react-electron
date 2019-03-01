import { jsx } from "@emotion/core";
import { inject, observer } from "mobx-react";
import { FC, useEffect } from "react";
import Injected from "../interfaces/Injected";
import fc from "../util/fc";
import usePersistedState from "../util/usePersistedState";
import Layout from "./Layout";

namespace Page2 {
  export interface Props {
    isGreen: boolean;
  }
}

const Page2: FC<Page2.Props> = ({ isGreen }) => (
  <Layout>
    <div>
      <h1 css={{ color: isGreen ? "#0F0" : undefined }}>Page 2</h1>
    </div>
  </Layout>
);

const StatefulPage2: FC<Injected.Menu> = ({ menu }) => {
  const [isGreen, setisGreen] = usePersistedState("Page2", false);
  useEffect(() => menu!.on("MAKE_GREEN_CLICKED", () => setisGreen(!isGreen)));

  return <Page2 isGreen={isGreen} />;
};

export default inject("menu")(observer(fc(StatefulPage2)));
