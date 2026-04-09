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
          I&apos;m a software engineer with <strong>7+ years</strong> of experiences building high-traffic web platforms for European companies, with deep expertise in <strong>React</strong>, <strong>Next.js</strong>, <strong>Angular</strong>, and <strong>SvelteKit</strong>. Actively expanding into full-stack development with <strong>Node.js</strong>, <strong>Python</strong>, and <strong>Java</strong> Spring Boot. Hands-on experience integrating <strong>LLMs/AI</strong> into production systems using OpenAI and LangChain.
        </p>
        <p>
          Currently at Air France KLM Royal Dutch (Budapest/Amsterdam), building scalable internal tools and contributing to LLM-powered search features. Previously at BimObject, where I engineered SvelteKit SSR applications serving 5M+ users and drove a 20% organic traffic increase through an Angular Universal SSR migration.
          And <strong>EU Blue Card</strong> holder with the right to work in any EU country. Fluent in English and Persian, with basic proficiency in Hungarian and Germany.
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
            <ul className="list-inside list-disc space-y-1">
              <li>Designed and implemented API integrations in collaboration with cross-functional teams and worked closely with the Designer, Product Owner, and Scrum Master across distributed environments.</li>
              <li>Contributed to LLM-powered internal search design and built the semantic search UI in Angular, enabling natural language queries over complex operational data.</li>
              <li>Led the development of scalable, high-traffic internal tools using Angular, ensuring seamless API integration between Budapest and Amsterdam.</li>
              <li>Delivered end-to-end features across frontend and backend layers in production systems.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Software Engineer
            </h3>
            <p className="text-muted-foreground text-sm mb-2">
              BimObject &middot; Budapest, Hungary / Malmö, Sweden &middot; Jul 2023 - Oct 2025
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>Engineered SvelteKit SSR applications with centralized authentication, managing secure access for over 5 million users.</li>
              <li>Drove 20% organic traffic growth (via Google Search Console) by migrating to Angular Universal SSR, improving Core Web Vitals from "Poor" to "Good" across LCP, CLS, and FID.</li>
              <li>Delivered 20+ features for high-traffic platforms, enhancing user engagement by 30%.</li>
              <li>Built an internal AI-assisted developer tool using Next.js and OpenAI API, enabling natural language access to internal documentation — adopted by the engineering team as a daily workflow tool.</li>
              <li>Collaborated on backend API design, improving data flow efficiency and system scalability.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Software Engineer
            </h3>
            <p className="text-muted-foreground text-sm mb-2">
              Citronity &middot; Toronto, Canada &middot; Oct 2021 - Jul 2023
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>Built 4 React applications and reusable UI libraries using Ant Design and Redux.</li>
              <li>Reduced page load time by 40% and halved reported UI bugs through codebase refactoring and performance profiling with React DevTools and Lighthouse.</li>
              <li>Mentored junior developers and helped increase team output by 20%.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Frontend Developer
            </h3>
            <p className="text-muted-foreground text-sm mb-2">
              Hamimohajer &middot; Alborz, Iran &middot; Oct 2020 - Oct 2021
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>Designed and launched React/Next.js dashboards, raising engagement by 40%.</li>
              <li>Integrated 30+ REST APIs into scalable web apps.</li>
              <li>Enhanced app performance by 50% through React best practices.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Frontend Developer
            </h3>
            <p className="text-muted-foreground text-sm mb-2">
              Tadbir Hesab Mohaseban & Novin Tarh Gostaran &middot; Iran &middot; Jun 2017 - Oct 2020
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>Refactored React/SCSS codebases to reduce downtime by 20%.</li>
              <li>Led responsive design implementation, improving mobile retention.</li>
              <li>Solved cross-browser issues, increasing accessibility and performance.</li>
            </ul>
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
