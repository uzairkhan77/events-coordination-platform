/* eslint-disable */
"use client";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ResponsiveProp<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  default?: T;
}

type TFlexDirection = "row" | "col";
type TFlexJustifyAlign = "center" | "start" | "between" | "end" | "evenly";
type TNumberString = number | string;

interface IProps {
  direction?: ResponsiveProp<TFlexDirection> | TFlexDirection;
  justify?: ResponsiveProp<TFlexJustifyAlign> | TFlexJustifyAlign;
  items?: ResponsiveProp<TFlexJustifyAlign> | TFlexJustifyAlign;
  center?: boolean;
  gap?: ResponsiveProp<TNumberString> | TNumberString;
  children?: ReactNode;
  p?: ResponsiveProp<TNumberString> | TNumberString;
  px?: ResponsiveProp<TNumberString> | TNumberString;
  py?: ResponsiveProp<TNumberString> | TNumberString;
  ps?: ResponsiveProp<TNumberString> | TNumberString;
  pe?: ResponsiveProp<TNumberString> | TNumberString;
  pt?: ResponsiveProp<TNumberString> | TNumberString;
  pb?: ResponsiveProp<TNumberString> | TNumberString;
  m?: ResponsiveProp<TNumberString> | TNumberString;
  mx?: ResponsiveProp<TNumberString> | TNumberString;
  my?: ResponsiveProp<TNumberString> | TNumberString;
  ms?: ResponsiveProp<TNumberString> | TNumberString;
  me?: ResponsiveProp<TNumberString> | TNumberString;
  mt?: ResponsiveProp<TNumberString> | TNumberString;
  mb?: ResponsiveProp<TNumberString> | TNumberString;
  className?: string;
  width?: ResponsiveProp<string>;
}

const generateResponsiveClasses = (prop: any, prefix: string) => {
  if (!prop) return "";
  if (typeof prop === "object") {
    const entry = Object.entries(prop)
      .map(([key, value]) =>
        key === "default" ? `${prefix}-${value}` : `${key}:${prefix}-${value}`
      )
      .join(" ");
    return entry;
  }
  const entry = `${prefix}-${prop}`;
  return entry;
};

const Stack = ({
  direction,
  justify,
  items,
  center,
  children,
  gap,
  className,
  p,
  pe,
  ps,
  px,
  py,
  pt,
  pb,
  m,
  mb,
  me,
  ms,
  mt,
  mx,
  my,
  width,
}: IProps) => {
  return (
    <div
      className={cn(
        "flex",
        center && "justify-center items-center",
        generateResponsiveClasses(direction, "flex"),
        generateResponsiveClasses(justify, "justify"),
        generateResponsiveClasses(items, "items"),
        generateResponsiveClasses(gap, "gap"),
        generateResponsiveClasses(p, "p"),
        generateResponsiveClasses(px, "px"),
        generateResponsiveClasses(py, "py"),
        generateResponsiveClasses(ps, "ps"),
        generateResponsiveClasses(pe, "pe"),
        generateResponsiveClasses(pt, "pt"),
        generateResponsiveClasses(pb, "pb"),
        generateResponsiveClasses(m, "m"),
        generateResponsiveClasses(mx, "mx"),
        generateResponsiveClasses(my, "my"),
        generateResponsiveClasses(ms, "ms"),
        generateResponsiveClasses(me, "me"),
        generateResponsiveClasses(mt, "mt"),
        generateResponsiveClasses(mb, "mb"),
        generateResponsiveClasses(width, "w"),
        className
      )}
    >
      {children}
    </div>
  );
};

export default Stack;
