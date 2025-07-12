import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
/* eslint-disable */

interface ResponsiveProp<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  default?: T;
}

interface IProps {
  cols?: number | ResponsiveProp<number>;
  gap?: number | string;
  gapX?: number | string;
  gapY?: number | string;
  className?: string;
  children?: ReactNode;
}

const generateColType = (prop: any) => {
  if (!prop) return "";
  if (typeof prop === "object") {
    const entry = Object.entries(prop)
      .map(([key, value]) =>
        key === "default" ? `grid-cols-${value}` : `${key}:grid-cols-${value}`
      )
      .join(" ");
    return entry;
  }
  const entry = `grid-cols-${prop}`;
  return entry;
};

const Grid = ({ cols, gap, gapX, gapY, className, children }: IProps) => {
  return (
    <div
      className={cn(
        "grid",
        cols && generateColType(cols),
        gap && (typeof gap === "string" ? `gap-[${gap}]` : `gap-${gap}`),
        gapX &&
          (typeof gapX === "string" ? `gap-x-[${gapX}]` : `gap-x-${gapX}`),
        gapY &&
          (typeof gapY === "string" ? `gap-y-[${gapY}]` : `gap-y-${gapY}`),
        className
      )}
    >
      {children}
    </div>
  );
};

export default Grid;
