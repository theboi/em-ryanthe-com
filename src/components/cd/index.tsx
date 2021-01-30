import React, { useState } from "react";
import { CountdownValue } from "../../pages/cd";
import style from "./style.module.css";

type CountdownTimeUnit = [unit: string, value: number]

export function Countdown(props: {
  name: string;
  now: Date;
  till: Date;
  isEditing: boolean;
  onEditClick: () => void;
  onChange: (value: CountdownValue) => void
}) {
  const timeLeft = getTimeLeft(props.now, props.till);

  return (
    <div className={style.countdown}>
      {props.isEditing ? (
        <>
          <input type="text" placeholder="Name" defaultValue={props.name} onChange={(e) => props.onChange([e.target.value, undefined])}/>
          <input
            defaultValue={props.till.toOffsetISOString().slice(0, -5)}
            type="datetime-local"
            onChange={(e) => props.onChange([undefined, e.target.value])}
          />
        </>
      ) : (
        <>
          <h3 className={style.name}>{props.name}</h3>
          <div className={style.timings}>
            {timeLeft.map(([unit, value], i) => (
              <div className={style.timing} key={i}>
                <div className={style.box}>
                  <p className={style.number}>{value}</p>
                </div>
                <p className={style.unit}>{unit}</p>
              </div>
            ))}
            <p onClick={props.onEditClick}>Edit</p>
          </div>
        </>
      )}
    </div>
  );
}

const getTimeLeft = (now: Date, date: Date): CountdownTimeUnit[] => {
  const diff = date.getTime() - now.getTime();

  return [
    [ "w", Math.floor(diff / 1000 / 60 / 60 / 24 / 7) ],
    [ "d", Math.floor((diff / 1000 / 60 / 60 / 24) % 7) ],
    [ "h", Math.floor((diff / 1000 / 60 / 60) % 24) ],
    [ "m", Math.floor((diff / 1000 / 60) % 60) ],
    [ "s", Math.floor((diff / 1000) % 60) ],
  ];
};
