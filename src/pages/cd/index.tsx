import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect, useState } from "react";
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

export type CountdownValue = [name?: string, date?: string]

export default function CountdownCreatePage(props: {
  url: string;
  query: ParsedUrlQuery;
}) {
  const [countdowns, setCountdowns] = useState(Object.entries(props.query) as CountdownValue[]);
  const [editIndex, setEditIndex] = useState(-1);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    if (Object.keys(props.query).length > 0) {
      setTimeout(() => {
        setNow(new Date());
      }, 1000);
    }
  });

  return (
    <main>
      {countdowns.map(([key, value], i) => (
        <Countdown
          isEditing={editIndex === i}
          onEditClick={() => setEditIndex(i)}
          onChange={(value) => setCountdowns((countdowns) => {
            const newCountdowns = [...countdowns]
            newCountdowns[i] = [value[0] ?? newCountdowns[i][0], value[1] ?? newCountdowns[i][1], ]
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