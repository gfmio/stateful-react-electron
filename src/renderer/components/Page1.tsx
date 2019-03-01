import { jsx } from "@emotion/core";
import { inject, observer } from "mobx-react";
import { FC, useEffect } from "react";
import Injected from "../interfaces/Injected";
import fc from "../util/fc";
import usePersistedState from "../util/usePersistedState";
import Layout from "./Layout";

namespace Page1 {
  export interface Props {
    isRed: boolean;
  }
}

const Page1: FC<Page1.Props> = ({ isRed }) => (
  <Layout>
    <div>
      <h1 css={{ color: isRed ? "#F00" : undefined }}>Page 1</h1>
    </div>
  </Layout>
);

const ManagedPage1: FC<Injected.Menu> = ({ menu }) => {
  const [isRed, setIsRed] = usePersistedState("Page1", false);
  useEffect(() => menu!.on("MAKE_RED_CLICKED", () => setIsRed(!isRed)));

  return <Page1 isRed={isRed} />;
};

export default inject("menu")(observer(fc(ManagedPage1)));
