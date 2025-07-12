"use client";
import { Button as ShadCNButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, PlusIcon } from "lucide-react";
import type { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconBefore?: ReactNode;
  iconAfter?: ReactNode;
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link"
    | null
    | undefined;
  size?: "default" | "sm" | "lg" | "icon" | "xlg" | "full" | null | undefined;
  isLoading?: boolean;
  link?: string;
  addButton?: boolean;
  loaderClassName?: string;
  component?: React.ElementType;
}

const Button: FC<ButtonProps> = ({
  iconBefore,
  size,
  variant,
  className,
  children,
  isLoading,
  link,
  addButton,
  loaderClassName,
  iconAfter,
  ...rest
}) => {
  const EXTRA_CLASSES = cn("text-base");

  return (
    <ShadCNButton
      link={link}
      {...rest}
      size={size}
      variant={variant}
      className={cn(
        "flex gap-2 items-center justify-center",
        "relative",
        EXTRA_CLASSES,
        className
      )}
      disabled={isLoading || rest.disabled}
    >
      <div
        className={cn(
          "absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
          "overflow-hidden",
          !isLoading && "opacity-0"
        )}
      >
        <Loader2 className={cn("mr-2 h-8 w-4 animate-spin", loaderClassName)} />
      </div>

      {addButton && (
        <span className={cn(isLoading && "opacity-0", "flex-shrink-0")}>
          <PlusIcon className="h-5 w-5" />
        </span>
      )}
      {iconBefore && (
        <span className={cn(isLoading && "opacity-0")}>{iconBefore}</span>
      )}
      {children && (
        <span className={cn(isLoading && "opacity-0")}>{children}</span>
      )}
      {iconAfter && (
        <span className={cn(isLoading && "opacity-0")}>{iconAfter}</span>
      )}
    </ShadCNButton>
  );
};

export default Button;
