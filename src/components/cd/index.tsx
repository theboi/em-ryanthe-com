import React, { useRef } from "react";
import { CountdownValue } from "../../pages/cd";
import { ThemeButton } from "../theme";
import style from "./style.module.css";

type CountdownTimeUnit = [unit: string, value: number];

export function Countdown(props: {
  name: string;
  now: Date;
  till: Date;
  isEditing: boolean;
  onEditClick: () => void;
  onChange: (value: CountdownValue) => void;
}) {
  const timeLeft = getTimeLeft(props.now, props.till);
  const nameField = useRef(null);
  const dateField = useRef(null);

  return (
    <div className={style.countdown}>
      {props.isEditing ? (
        <div className={`${style.inputs} ${style.content}`}>
          <input
            type="text"
            ref={nameField}
            placeholder="Name"
            defaultValue={props.name}
            onChange={() =>
              props.onChange([nameField.current.value, dateField.current.value])
            }
          />
          <input
            ref={dateField}
            defaultValue={props.till.toOffsetISOString().slice(0, -5)}
            type="datetime-local"
            onChange={() =>
              props.onChange([nameField.current.value, dateField.current.value])
            }
          />
        </div>
      ) : (
        <div className={style.content}>
          <h3 className={style.name}>{props.name || "Untitled"}</h3>
          <div className={style.timings}>
            {timeLeft.map(([unit, value], i) => (
              <div className={style.timing} key={i}>
                <div className={style.box}>
                  <p className={style.number}>{value}</p>
                </div>
                <p className={style.unit}>{unit}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <ThemeButton onClick={props.onEditClick} className={style.editButton}>
        <i className={props.isEditing ? "fas fa-times" : "fas fa-pen"}></i>
      </ThemeButton>
    </div>
  );
}

const getTimeLeft = (now: Date, date: Date): CountdownTimeUnit[] => {
  const diff = date.getTime() - now.getTime();

  return [
    ["w", Math.floor(diff / 1000 / 60 / 60 / 24 / 7)],
    ["d", Math.floor((diff / 1000 / 60 / 60 / 24) % 7)],
    ["h", Math.floor((diff / 1000 / 60 / 60) % 24)],
    ["m", Math.floor((diff / 1000 / 60) % 60)],
    ["s", Math.floor((diff / 1000) % 60)],
  ];
};
