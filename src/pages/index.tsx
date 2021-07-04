import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>em-ryan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="https://github.com/theboi/em-ryanthe.com">View on GitHub</Link>
      <h3>Available paths:</h3>
      <ul>
        <li>cd: Countdown Timer</li>
        <li>bv: Bible</li>
      </ul>
    </div>
  );
}
