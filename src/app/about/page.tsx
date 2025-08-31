import { H1, H2 } from "@components/index";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Me",
  description: "Learn more about Mohammad Farhadi and his work.",
};

export default function Page() {
  return (
    <section className="space-y-6">
      <H1>About Me</H1>
      <section className="space-y-3">
        <H2>Who am I?</H2>
        <p>
          My name is Mohammad Farhadi and I am a self-taught software developer
          from Hungary (Originally I&apos;m from Iran). I started programming in
          2017, at the age of 22, and since then I have worked on many projects,
          both personal and professional. I graduated with MSc Computer Science
          from the Obuda University in 2024.
        </p>
        <p>
          I&apos;m passionate about building cool apps and websites and I love
          sharing the things I learn with my colleagues and the community. I
          believe that programming is not just a job, but a way of life. I enjoy
          learning new technologies and improving my skills.
        </p>
      </section>
      <hr className="border-muted" />
      <section className="space-y-3">
        <H2>Skills</H2>
        <p>
          I&apos;m a front-end web developer/engineer specializing in{" "}
          <strong>React</strong>, <strong>Next.js</strong>,{" "}
          <strong>TypeScript</strong>,{" "}
          <strong>Angular/Angular Universal</strong>, <strong>SvelteKit</strong>
          , and familiar with <strong>Node.js</strong>. I have a strong
          understanding of web development principles and best practices, and
          I&apos;m always eager to learn new technologies and frameworks. I am
          actively expanding into full-stack development with Python and
          Node.js, specifically focusing on AI/LLM-driven projects and
          integrating smart agents using tools like LangChain, OpenAI, and
          Gemini.
        </p>
        <p>
          I also have experience with mobile development (React Native) but have
          stopped working with it a few years ago. I prefer web development
          because you can use a modern website on almost every device and reach
          the whole world with it.
        </p>
      </section>
      <hr className="border-muted" />
      <section className="space-y-3">
        <H2>Side projects</H2>
        <p>
          In my free time, I like to work on side projects to keep my skill
          sharp and try out new tech. Here is a list of my current
          projects:{" "}
        </p>
        <ul className="list-inside list-disc">
          <li>
            <a
              href="https://ai-agent-next-eight.vercel.app"
              className="text-primary hover:underline"
            >
              Assistly
            </a>{" "}
            - An AI agent that can be trained and used to answer questions as a
            chatbot
          </li>
          <li>
            <Link
              href="http://3dfolio-one.vercel.app"
              className="text-primary hover:underline"
            >
              My 3D Portfolio
            </Link>{" "}
            - A showcase of my 3D work and projects
          </li>
          <li>
            <Link
              href="https://github.com/mamadfar/dappazon__solidity"
              className="text-primary hover:underline"
            >
              Dappazon
            </Link>{" "}
            - A decentralized Amazon clone built with Solidity and React
          </li>
          <li>
            <Link
              href="https://chatgpt-livid.vercel.app"
              className="text-primary hover:underline"
            >
              CodeX
            </Link>{" "}
            - A ChatGPT clone that read the answers out loud using Web Speech
            API (synthesis)
          </li>
          <li>
            <Link
              href="https://sharemeeeeee.netlify.app/login"
              className="text-primary hover:underline"
            >
              ShareMe
            </Link>{" "}
            - A social media app where you can share your photos
          </li>
          <li>
            You can find more of my projects on my{" "}
            <Link
              href="https://github.com/mamadfar"
              className="text-primary hover:underline"
            >
              GitHub
            </Link>
          </li>
        </ul>
      </section>
      <hr className="border-muted" />
      <section className="space-y-3">
        <H2>Hobbies</H2>
        <p>
          Besides programming, I love doing sports. I lift weights. I also enjoy
          video games and going out sometimes. I think having hobbies other than
          coding is important for mental health.
        </p>
        <p>
          I&apos;m also very much into self-improvement, nutrition, and positive
          psychology.
        </p>
      </section>
    </section>
  );
}
