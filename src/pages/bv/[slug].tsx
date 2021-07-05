import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import useSWR from "swr";

export default function BibleVersePage({ slug, t }) {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { data } = useSWR(`https://bible-api.com/${slug}?translation=${t}`, fetcher);

  return (<div style={{ padding: "16px 16px 16px 12px", backgroundColor: "var(--bg-blue)", borderRadius: 3}}>
    <h3>{data?.reference} ({(data?.translation_id as string)?.toUpperCase()})</h3>
    <p style={{ lineHeight: 2 }}>
    {data?.verses.map((v) => <p style={{ display: "inline"}}>{v?.text.split("\\n").join("")} <sub>[{v?.verse}]</sub> </p>)}
    </p>
  </div>);
}

interface GetServerSidePropsResultProps {
  slug: string;
  t: string;
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<GetServerSidePropsResultProps>> {
  const { slug, t } = ctx.query as { [k: string]: string };
  return {
    props: {
      slug,
      t: t ?? "kjv"
    },
  };
}
