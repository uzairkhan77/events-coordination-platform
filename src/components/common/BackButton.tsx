import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  onClick?: () => void;
  href?: string;
  variant?: "default" | "round";
  type?: "button" | "submit" | "reset";
}

const BackButton = ({
  href,
  onClick,
  variant = "default",
  type = "button",
}: Props) => {
  let content: React.ReactNode;
  if (variant === "default") {
    content = (
      <div className="flex flex-row items-center gap-2 cursor-pointer">
        <ArrowLeft className="text-text-secondary" />
        <p className="text-base text-text-primary">Back</p>
      </div>
    );
  } else {
    content = (
      <div
        className={cn(
          "cursor-pointer",
          "flex flex-row items-center justify-center gap-2",
          "bg-foreground",
          "border border-primary/20 rounded-full",
          "h-[34px] w-[34px]"
        )}
      >
        <ArrowLeft className="text-text-secondary" />
      </div>
    );
  }

  if (href) {
    return <Link to={href}>{content}</Link>;
  } else {
    return (
      <button className="text-left" type={type} onClick={onClick}>
        {content}
      </button>
    );
  }
};

export default BackButton;
