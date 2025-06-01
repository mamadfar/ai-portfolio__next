import { cn } from "@/lib/utils/TailwindMerge";
import React from "react";

const H3 = (props: React.HTMLProps<HTMLHeadingElement>) => {
  return (
    <h3
      {...props}
      className={cn("text-xl font-semibold tracking-tight", props.className)}
    />
  );
};

export default H3;
