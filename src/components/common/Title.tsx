import { cn } from "@/lib/utils";
import React from "react";

export interface TitleComponentProps {
  children: React.ReactNode;
  className?: string;
  h2ClassName?: string;
  divClassName?: string;
  subTitle?: string | React.ReactNode;
  subTitleGridContent?: React.ReactNode;
  mainTitleVariant?: "heading-1" | "heading-2" | "heading-3";
}

const Title = ({
  children,
  className,
  divClassName,
  h2ClassName,
  subTitle,
  subTitleGridContent,
  mainTitleVariant = "heading-1",
}: TitleComponentProps) => {
  return (
    <div className={cn("flex flex-col gap-1", divClassName)}>
      <h1
        className={cn(
          "font-lora text-text-primary font-semibold",
          mainTitleVariant === "heading-1" && "text-3xl",
          mainTitleVariant === "heading-2" && "text-2xl",
          mainTitleVariant === "heading-3" && "text-xl",
          className
        )}
      >
        {children}
      </h1>
      {subTitle && (
        <div className="flex gap-2 items-center justify-between">
          <h2 className={cn("text-text-secondary", h2ClassName)}>{subTitle}</h2>
          {subTitleGridContent}
        </div>
      )}
    </div>
  );
};

export default Title;
