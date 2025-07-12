import { cn } from "@/lib/utils";
import React, { Fragment } from "react";

interface IProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  size?:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | string;
  color?: "primary" | "secondary";
  children?: React.ReactNode;
  className?: string;
  weight?: "normal" | "semi-bold" | "bold";
}

const Typography = ({
  color,
  size,
  variant,
  children,
  className,
  weight,
}: IProps) => {
  const CombinedClasses = cn(
    size ? `text-${size}` : "text-base",
    color ? `text-text-${color}` : "text-text-primary",
    weight ? `font-${weight}` : "font-normal",
    className
  );

  let value;

  switch (variant) {
    case "h1":
      value = <h1 className={CombinedClasses}>{children}</h1>;
      break;
    case "h2":
      value = <h2 className={CombinedClasses}>{children}</h2>;
      break;
    case "h3":
      value = <h3 className={CombinedClasses}>{children}</h3>;
      break;
    case "h4":
      value = <h4 className={CombinedClasses}>{children}</h4>;
      break;
    case "h5":
      value = <h5 className={CombinedClasses}>{children}</h5>;
      break;
    case "h6":
      value = <h6 className={CombinedClasses}>{children}</h6>;
      break;
    case "p":
      value = <p className={CombinedClasses}>{children}</p>;
      break;

    default:
      value = <div className={CombinedClasses}>{children}</div>;
      break;
  }

  return <Fragment>{value}</Fragment>;
};

export default Typography;
