import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import useSWR from "swr";

export default function BibleVersePage({ slug, t }) {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { data } = useSWR(`https://bible-api.com/${slug}`, fetcher);

  console.log(`https://bible-api.com/${slug}?translation=${t}`, data);

  return (<div>
    <h3>{data?.reference}</h3>
    <p>
    {data?.verses.map((v) => `${v?.text.split("\\n").join("")} [${v?.verse}] `)}
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
