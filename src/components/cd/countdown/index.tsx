import React from "react";
import style from "./style.module.css";

export interface CountdownTiming {
  unit: string;
  value: number;
}

export default function Countdown(props: {
  name: string;
  timeLeft: CountdownTiming[];
}) {
  return (
    <div className={style.countdown}>
      <h3 className={style.name}>{props.name}</h3>
      <div className={style.timings}>
        {props.timeLeft.map(({ unit, value }, i) => (
          <div className={style.timing} key={i}>
            <div className={style.box}>
              <p className={style.number}>{value}</p>
            </div>
            <p className={style.unit}>{unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
