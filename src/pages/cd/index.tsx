import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect, useRef, useState } from "react";
import { Countdown } from "../../components/cd";
import { ThemeButton } from "../../components/theme";
import style from "./style.module.css"

declare global {
  interface Date {
    toOffsetISOString(): string;
  }
}

Date.prototype.toOffsetISOString = function() {
  try {
    return new Date(this - (new Date()).getTimezoneOffset() * 60000).toISOString()
  } catch {
    return ""
  }
}

export type CountdownValue = [name: string, date: string]

export default function CountdownCreatePage(props: {
  url: string;
  query: ParsedUrlQuery;
}) {
  const [countdowns, setCountdowns] = useState((Object.entries(props.query) as CountdownValue[]).flatMap(a => [a[1]].flat().map(b => [a[0], b])));
  const [editIndex, setEditIndex] = useState(-1);
  const [now, setNow] = useState(new Date());
  const [didMakeChanges, setDidMakeChanges] = useState<boolean>(false)

  useEffect(() => {
    setInterval(() => {
      console.log("Hey")
      setNow(new Date());
    }, 1000);
  }, []);

  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {initialRender.current = false; return;}
    setDidMakeChanges(true)
  }, [countdowns])

  return (
    <main>
      {didMakeChanges ? (
        <div className={style.alert} onClick={() => {
          navigator.clipboard.writeText(`${props.url}?${countdowns.map(v => [v[0] || "Untitled", v[1] || now.toOffsetISOString()].join('=')).join('&')}`)
        }}>
          <i className="fas fa-exclamation-triangle" />
        <p className={style.alertText}>Unsaved changes. Click to copy new link.</p>
        </div>
      ) : <></>}
      {countdowns.map(([key, value], i) => (
        <Countdown
          isEditing={editIndex === i}
          onEditClick={() => setEditIndex((current) => current === i ? -1 : i)}
          onChange={value => setCountdowns(countdowns => {
            const newCountdowns = [...countdowns]
            newCountdowns[i] = value
            return newCountdowns
          })}
          now={now}
          till={new Date(value)}
          name={key}
          key={i}
        />
      ))}
      <ThemeButton onClick={() => {
        setCountdowns((countdowns) => [...countdowns, ["", now.toOffsetISOString()]])
        setEditIndex(countdowns.length)
        }} className={style.addButton}>
        <i className="fas fa-plus"></i><p className={style.addText}>Add</p>
      </ThemeButton>
    </main>
  );
}

export async function getServerSideProps(c: GetServerSidePropsContext) {
  return {
    props: { url: `${c.req.headers.host}${c.req.url}`, query: c.query },
  };
}