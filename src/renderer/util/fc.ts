import { ComponentType, createElement, FC } from "react";

const fc = <P>(component: ComponentType<P>): FC<P> => (props: P) => createElement(component, props);

export default fc;
