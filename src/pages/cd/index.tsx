import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect, useState } from "react";
import Countdown, { CountdownTiming } from "../../components/cd/countdown";
import style from "./style.module.css";

export default function CountdownCreatePage(props: {
  url: string;
  query: ParsedUrlQuery;
}) {
  const isAddNewPage = Object.keys(props.query).length === 0;

  const [datetime, setDatetime] = useState("");

  const queries = Object.entries(props.query);

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    if (!isAddNewPage) {
      setTimeout(() => {
        setNow(new Date());
      }, 1000);
    }
  });

  return (
    <main className={style.main}>
      {queries.map(([key, value], i) => (
        <Countdown
          timeLeft={getTimeLeft(now, new Date(value as string))}
          name={key}
          key={i}
        />
      ))}
      <input
        type="datetime-local"
        onChange={(e) => {
          setDatetime(e.target.value);
        }}
      />
      <p
        onClick={() => document.execCommand("copy")}
      >{`${props.url}?${datetime}`}</p>
    </main>
  );
}

export async function getServerSideProps(c: GetServerSidePropsContext) {
  return {
    props: { url: `${c.req.headers.host}${c.req.url}`, query: c.query },
  };
}

const getTimeLeft = (now: Date, date: Date): CountdownTiming[] => {
  const diff = date.getTime() - now.getTime();

  return [
    { unit: "d", value: Math.floor(diff / (1000 * 60 * 60 * 24)) },
    { unit: "h", value: Math.floor((diff / (1000 * 60 * 60)) % 24) },
    { unit: "min", value: Math.floor((diff / 1000 / 60) % 60) },
    { unit: "s", value: Math.floor((diff / 1000) % 60) },
  ];
};
