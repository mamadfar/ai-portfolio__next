import { cn } from "@/lib/utils/TailwindMerge";
import React from "react";

const H1 = (props: React.HTMLProps<HTMLHeadingElement>) => {
  return (
    <h1
      {...props}
      className={cn("text-3xl font-bold tracking-tight sm:text-4xl", props.className)}
    />
  );
};

export default H1;
