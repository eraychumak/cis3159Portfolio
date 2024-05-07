import Image from "next/image";
import Link from "next/link";
import { Octokit } from "octokit";

import PFP from "./pfp.jpg";
import MRC from "./mrc.png";
import REDESIGN from "./redesign.png";
import GH from "./gh.svg";

export default async function Home() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_TOKEN
  });

  const {
    data: { login }
  } = await octokit.rest.users.getAuthenticated();

  const { data } = await octokit.rest.repos.listForUser({
    username: login,
    sort: "created"
  });

  return (
    <>
      <header className="container p-10">
        <nav className="flex gap-5 flex-wrap">
          <h1 className="font-bold">Eray Chumak</h1>
          <Link className="hover:underline text-blue-600" href={"https://github.com/eraychumak/"}>GitHub</Link>
          <Link className="hover:underline text-blue-600" href={"https://www.linkedin.com/in/eray-chumak/"}>LinkedIn</Link>
          <Link className="hover:underline text-blue-600" href={"mailto:eraychumak_@outlook.com"}>eraychumak_@outlook.com</Link>
        </nav>
      </header>
      <main className="lg:grid lg:grid-cols-2">
        <section className="container flex flex-col p-10 gap-10">
          <section className="container flex max-w-sm flex-col gap-5">
            <Image src={PFP} className="max-w-48 rounded-lg w-auto" alt="Profile picture"/>
            <h2 className="font-bold text-xl">Introduction</h2>
            <p>
              Hello, I&apos;m Eray. I live in North West England
              and I&apos;m a frontend developer. I enjoy working
              alone or with others to create useful web
              apps. I&apos;m curious and pay close attention to
              detail, thanks to having four eyes instead of two.
            </p>
          </section>
          <section className="max-w-md">
            <h2 className="font-bold mb-2 text-xl">Projects</h2>
            <section className="container flex flex-wrap gap-10">
              <article className="container flex max-w-m flex-col gap-5">
                <h3 className="font-medium text-lg">Mortgage repayment calculator</h3>
                <Image src={MRC} className="rounded-lg w-auto" alt="Profile picture"/>
                <p>An open-source native web component that can be embeded on websites.</p>
              </article>
              <article className="container flex max-w-m flex-col gap-5">
                <h3 className="font-medium text-lg">Local business redesign</h3>
                <Image src={REDESIGN} className="rounded-lg w-auto border-2 rounded-xl" alt="Profile picture"/>
                <p>
                  A heuristic evaluation on a local business
                  in Ormskirk, producing a new designs
                  for the website.
                </p>
                <Link
                  href={"https://www.figma.com/file/2Zkirrt2WdN1Ll6434QSvd/Large-Task%3A-Local-Business-Redesign?type=design&node-id=0%3A1&mode=design&t=cEaj9BxLdfFFuCft-1"}
                  className="hover:underline text-blue-600"
                >
                  Preview Figma designs
                </Link>
                <Link
                  href={"https://www.figma.com/file/UskxC56unTpOEQ79ofyJlm/Large-Task%3A-Local-Business-Redesign?type=whiteboard&node-id=0%3A1&t=XWWQsnT8bEnZSU93-1"}
                  className="hover:underline text-blue-600"
                >
                  Preview FigJam (for heuristic evaluation)
                </Link>
              </article>
            </section>
          </section>
          <section>
            <h2 className="font-bold mb-2 text-xl">Timeline</h2>
            <ul className="container flex flex-col gap-2">
              <li>2024. Certificate. Microsoft AI-900 for Principles, Vision, and Natural Language.</li>
              <li>2023. Placement. React Native Developer at Lancashire Constabulary (DMIU).</li>
              <li>2022. Certificate. Microsoft SC-900 for Security, Compliance, and Identity Fundamentals.</li>
              <li>2022. Certificate. Google for Fundamentals of Digital Marketing.</li>
              <li>2021. Enrolled. at Edge Hill University, for the Web Design & Development degree.</li>
              <li>2018-20. Ada National College for Digital Skills.</li>
            </ul>
          </section>
        </section>
        <section className="container flex flex-col p-10 gap-10">
          <section>
            <h2 className="font-bold text-xl mb-2">Skills</h2>
            <ul>
              <li>JavaScript</li>
              <li>NodeJS</li>
              <li>HTML</li>
              <li>CSS</li>
              <li>React & React Native</li>
              <li>NextJS</li>
              <li>Git</li>
              <li>Firebase</li>
              <li>AI</li>
              <li>SEO</li>
              <li>Figma</li>
            </ul>
          </section>
          <section>
            <h2 className="font-bold text-xl mb-2">See my latest repos</h2>
            <section className="container flex flex-wrap gap-5">
              {data.map((repo, i) => {
                return (
                  <article key={i} className="relative container justify-between flex flex-col gap-2 p-5 border rounded-lg max-w-sm">
                    <Image src={GH} width={16} height={16} alt="Github logo" className="absolute top-4 right-4"/>
                    <section>
                      <p className="font-medium mb-2">{repo.name}</p>
                      <p className="text-slate-700">{repo.description}</p>
                    </section>
                    <Link className="hover:underline text-blue-600 self-end" href={repo.html_url}>Visit repository</Link>
                  </article>
                )
              })}
            </section>
          </section>
        </section>
      </main>
      <footer className="p-5 border-t">
        <p>Copyright &copy; 2024 Eray Chumak. All rights reserved.</p>
      </footer>
    </>
  );
}
