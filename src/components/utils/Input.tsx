"use client";
import React, { forwardRef, useState } from "react";
import { Input as ShadCnInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputP extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  isPassword?: boolean;
  containerClassName?: string;
  mainClassName?: string;
  iconBefore?: React.ReactNode;
  showLength?: string;
  shoMaxLength?: number;
  iconAfter?: React.ReactNode;
  disableOutline?: boolean;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputP>(
  (
    {
      className,
      error,
      helperText,
      label,
      isPassword,
      containerClassName,
      iconBefore,
      showLength,
      shoMaxLength,
      iconAfter,
      disableOutline,
      mainClassName,
      required,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const MAIN_BACKGROUND_COLOR = cn("bg-white");
    const BORDER_COLOR = cn("[#9C88C233]");
    const HEIGHT = cn("12");
    const FONT_COLOR = cn("text-text-primary");
    const EXTRA_CLASSES = cn("");

    return (
      <div className={cn("w-full", containerClassName)}>
        {label && (
          <label
            htmlFor="input"
            className={cn("text-text-primary", "text-sm ms-1 font-normal")}
          >
            {label}
            {required && <span className="text-destructive text-base"> *</span>}
          </label>
        )}
        <div
          className={cn(
            MAIN_BACKGROUND_COLOR,
            "ps-1 py-2 pe-2",
            `h-${HEIGHT}`,
            "gap-1 rounded-lg flex items-center justify-center}",
            "w-full",
            "rounded-md overflow-hidden",
            `border border-${BORDER_COLOR}`,
            !disableOutline &&
              "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary/80",
            label && "mt-2",
            error && "ring-2 ring-offset-2 ring-destructive border-none",
            mainClassName
          )}
        >
          {iconBefore && (
            <div
              className={cn(
                MAIN_BACKGROUND_COLOR,
                "p-2",
                "rounded-lg",
                FONT_COLOR
              )}
            >
              {iconBefore}
            </div>
          )}
          <ShadCnInput
            ref={ref}
            className={cn(
              "focus-visible:ring-0 focus:ring-0 focus:ring-transparent focus:ring-offset-0 focus-visible:ring-offset-0 focus-visible:outline-none border-none",
              `h-${HEIGHT}`,
              FONT_COLOR,
              MAIN_BACKGROUND_COLOR,
              EXTRA_CLASSES,
              className
            )}
            type={isPassword ? (showPassword ? "text" : "password") : "text"}
            {...rest}
          />
          {isPassword && (
            <button
              style={{
                backgroundColor: "transparent",
                outline: "none",
                boxShadow: "none",
              }}
              onClick={() => setShowPassword((prev) => !prev)}
              type="button"
            >
              {showPassword ? <PasswordEyeSlashIcon /> : <PasswordEyeIcon />}
            </button>
          )}
          {iconAfter && (
            <div className={cn("p-2 rounded-lg text-text-primary")}>
              {iconAfter}
            </div>
          )}
        </div>

        {error && (
          <p className="text-xs text-destructive mt-2 ms-1">{helperText}</p>
        )}
        {showLength && (
          <div className="flex flex-row items-center w-full mt-2 px-2 justify-end">
            <p className={cn("text-text-grey", "text-sm")}>
              <span> {showLength}</span>
              <span>/</span>
              <span>{shoMaxLength ?? 250}</span>
            </p>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

const PasswordEyeIcon = () => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5799 12.6702C15.5799 14.6502 13.9799 16.2502 11.9999 16.2502C10.0199 16.2502 8.41992 14.6502 8.41992 12.6702C8.41992 10.6902 10.0199 9.09021 11.9999 9.09021C13.9799 9.09021 15.5799 10.6902 15.5799 12.6702Z"
        stroke="#9B9B9B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9998 20.9401C15.5298 20.9401 18.8198 18.8601 21.1098 15.2601C22.0098 13.8501 22.0098 11.4801 21.1098 10.0701C18.8198 6.47014 15.5298 4.39014 11.9998 4.39014C8.46984 4.39014 5.17984 6.47014 2.88984 10.0701C1.98984 11.4801 1.98984 13.8501 2.88984 15.2601C5.17984 18.8601 8.46984 20.9401 11.9998 20.9401Z"
        stroke="#9B9B9B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const PasswordEyeSlashIcon = () => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.53 10.1401L9.46998 15.2001C8.81998 14.5501 8.41998 13.6601 8.41998 12.6701C8.41998 10.6901 10.02 9.09009 12 9.09009C12.99 9.09009 13.88 9.49009 14.53 10.1401Z"
        stroke="#9B9B9B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.82 6.44015C16.07 5.12015 14.07 4.40015 12 4.40015C8.47003 4.40015 5.18003 6.48015 2.89003 10.0801C1.99003 11.4901 1.99003 13.8601 2.89003 15.2701C3.68003 16.5101 4.60003 17.5801 5.60003 18.4401"
        stroke="#9B9B9B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.41998 20.2001C9.55998 20.6801 10.77 20.9401 12 20.9401C15.53 20.9401 18.82 18.8601 21.11 15.2601C22.01 13.8501 22.01 11.4801 21.11 10.0701C20.78 9.5501 20.42 9.0601 20.05 8.6001"
        stroke="#9B9B9B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.51 13.3701C15.25 14.7801 14.1 15.9301 12.69 16.1901"
        stroke="#9B9B9B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.47 15.2002L2 22.6702"
        stroke="#9B9B9B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 2.67017L14.53 10.1402"
        stroke="#9B9B9B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
