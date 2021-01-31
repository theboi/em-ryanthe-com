import React from "react";
import style from "./style.module.css";

export function ThemeButton(props: {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children: React.ReactNode
  className?: string
}) {
  return <div className={`${style.button} ${props.className}`} onClick={props.onClick}>{props.children}</div>;
}
