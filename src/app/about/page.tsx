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
          My name is Mohammad Farhadi and I am a self-taught software engineer
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
          I&apos;m a software engineer specializing in{" "}
          <strong>React</strong>, <strong>Next.js</strong>,{" "}
          <strong>TypeScript</strong>,{" "}
          <strong>Angular/Angular Universal</strong>, <strong>SvelteKit</strong>
          , and familiar with <strong>Node.js</strong> and <strong>Python</strong>. I have a strong
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
        <H2>Professional Experience</H2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">
              Senior Software Engineer
            </h3>
            <p className="text-muted-foreground text-sm mb-2">
              KLM Royal Dutch Airlines &middot; Budapest, Hungary / Amsterdam, Netherlands &middot; Nov 2025 - Present
            </p>
            <p>
              Collaborating with cross-functional teams across Budapest and Amsterdam hubs to design and implement performant API integrations for enterprise-level internal tools. Architected and integrated an AI-driven search feature utilizing LLMs to streamline access to complex operational data. Building scalable, high-traffic frontend features using Angular, ensuring optimal performance for mission-critical airline systems.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Software Engineer
            </h3>
            <p className="text-muted-foreground text-sm mb-2">
              BimObject &middot; Budapest, Hungary / Malmö, Sweden &middot; Jul 2023 - Oct 2025
            </p>
            <p>
              Architected and built SvelteKit SSR applications with centralized authentication, securing access for over 5 million users. Developed SEO-optimized Angular Universal applications that boosted organic visibility by 20%. Delivered 20+ features for high-traffic platforms, enhancing user engagement by 30%. Collaborated closely with backend teams to design performant API integrations and contributed to an internal Next.js/React AI project, deepening expertise in LLM-enabled user interfaces.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Software Engineer
            </h3>
            <p className="text-muted-foreground text-sm mb-2">
              Citronity &middot; Toronto, Canada &middot; Oct 2021 - Jul 2023
            </p>
            <p>
              Built 4 React applications and reusable UI libraries using Ant Design and Redux. Improved user experience by 50% through systematic debugging and codebase optimization. Mentored junior developers, contributing to a 20% increase in team output, and achieved 90% customer satisfaction through rapid delivery and quality-focused development.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Frontend Developer
            </h3>
            <p className="text-muted-foreground text-sm mb-2">
              Hamimohajer &middot; Alborz, Iran &middot; Oct 2020 - Oct 2021
            </p>
            <p>
              Designed and launched React/Next.js dashboards that raised user engagement by 40%. Integrated 30+ REST APIs into scalable web applications and enhanced overall app performance by 50% through implementing React best practices and optimization techniques.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Frontend Developer
            </h3>
            <p className="text-muted-foreground text-sm mb-2">
              Tadbir Hesab Mohaseban & Novin Tarh Gostaran &middot; Iran &middot; Jun 2017 - Oct 2020
            </p>
            <p>
              Refactored React/SCSS codebases to reduce system downtime by 20%. Led responsive design implementation, significantly improving mobile retention. Solved critical cross-browser compatibility issues, increasing overall accessibility and application performance.
            </p>
          </div>
        </div>
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
