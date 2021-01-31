import { count } from "console";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect, useRef, useState } from "react";
import { Countdown } from "../../components/cd";
import { Button } from "../../components/global";

declare global {
  interface Date {
    toOffsetISOString(): string;
  }
}

Date.prototype.toOffsetISOString = function() {
  return new Date(this - (new Date()).getTimezoneOffset() * 60000).toISOString()
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
        <div onClick={() => {
          navigator.clipboard.writeText(`${props.url}?${countdowns.map(v => [v[0] || "Untitled", v[1] || now.toOffsetISOString()].join('=')).join('&')}`)
        }}>Unsaved changes. Click to copy new link.</div>
      ) : <></>}
      {countdowns.map(([key, value], i) => (
        <Countdown
          isEditing={editIndex === i}
          onEditClick={() => setEditIndex(i)}
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
      <Button onClick={() => {
        setCountdowns((countdowns) => [...countdowns, ["", now.toOffsetISOString()]])
        setEditIndex(countdowns.length)
        }}>
        Add
      </Button>
    </main>
  );
}

export async function getServerSideProps(c: GetServerSidePropsContext) {
  return {
    props: { url: `${c.req.headers.host}${c.req.url}`, query: c.query },
  };
}