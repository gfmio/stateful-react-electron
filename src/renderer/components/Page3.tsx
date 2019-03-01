import { jsx } from "@emotion/core";
import { inject, observer } from "mobx-react";
import { FC, useEffect } from "react";
import Injected from "../interfaces/Injected";
import fc from "../util/fc";
import usePersistedState from "../util/usePersistedState";
import Layout from "./Layout";

namespace Page3 {
  export interface Props {
    isRed: boolean;
    isGreen: boolean;
  }
}

const Page3: FC<Page3.Props> = ({ isRed, isGreen }) => {
  const title = "Page 3";
  const red = "#F00";
  const green = "#0F0";

  const props: any = {};
  let children: any = title;

  if (isRed && !isGreen) {
    props.css = {
      color: red,
    };
  } else if (isGreen && !isRed) {
    props.css = {
      color: green,
    };
  }

  if (isRed && isGreen) {
    children = title.split("").map((c, i) => (
      <span
        key={i}
        css={{
          color: i % 2 === 0 ? "#F00" : "#0F0",
        }}
      >
        {c}
      </span>
    ));
  }

  return (
    <Layout>
      <div>
        <h1 {...props} children={children} />
      </div>
    </Layout>
  );
};

const StatefulPage3: FC<Injected.Menu> = ({ menu }) => {
  const [isRed, setIsRed] = usePersistedState("Page3.Red", false);
  const [isGreen, setIsGreen] = usePersistedState("Page3.Green", false);
  useEffect(() => menu!.on("MAKE_RED_CLICKED", () => setIsRed(!isRed)));
  useEffect(() => menu!.on("MAKE_GREEN_CLICKED", () => setIsGreen(!isGreen)));

  return <Page3 isRed={isRed} isGreen={isGreen} />;
};

export default inject("menu")(observer(fc(StatefulPage3)));
