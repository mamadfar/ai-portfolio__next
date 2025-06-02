import { H1, H2 } from "@components/index"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media",
  description: "My social media channels and how to work with me.",
};

const Social = () => {
  return (
    <section className="space-y-6">
      <H1>Social Media</H1>
      <section className="space-y-3">
        <H2>My channels</H2>
        <p>
          I&apos;m active mostly on Github and before AI, I was also active on StackOverflow.
        </p>
        <p>Links to all my social accounts:</p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            <a
              href="https://www.github.com/mamadfar"
              className="text-primary hover:underline"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/mamadfar"
              className="text-primary hover:underline"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://stackoverflow.com/users/12852629/mohammad-farhadi"
              className="text-primary hover:underline"
            >
              StackOverflow
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/mamadfar"
              className="text-primary hover:underline"
            >
              LinkedIn
            </a>
          </li>
        </ul>
        <hr className="border-muted" />
      <section className="space-y-3">
        <H2>Business inquiries</H2>
        <p>
          If you want to work with me on a project or get a shoutout for your
          product on my social media channels, please contact me via email at{" "}
          <a
            href="mailto:farhadimohammad6069@gmail.com"
            className="text-primary hover:underline"
          >
            farhadimohammad6069@gmail.com
          </a>
        </p>
        <p>
          I&apos;ve worked with many different companies in the past, including{" "}
          <a
            href="https://www.bimobject.com"
            className="text-primary hover:underline"
          >
            BimObject
          </a>
          ,{" "}
          <a href="https://citronity.com/" className="text-primary hover:underline">
            Citronity
          </a>
          ,{" "}
          <a
            href="https://hamimohajer.co"
            className="text-primary hover:underline"
          >
            Hamimohajer
          </a>
          ,{" "}
          and many more.
        </p>
      </section>
    </section>
    </section>
  );
}

export default Social;