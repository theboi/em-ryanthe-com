import React from "react";
import style from "./style.module.css";

export function Button(props: {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children: React.ReactNode
}) {
  return <div className={style.button} onClick={props.onClick}>{props.children}</div>;
}
