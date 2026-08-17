"use client";

import {
  InputBlock,
  InputColor,
  InputSize,
  InputVariant,
} from "@/components/custom/blocks/InputBlock";
import { Mail } from "lucide-react";

export default function InputDemo({
  inputType = "text",
  variant = "default",
  inputSize = "md",
  showError = false,
  isDisabled = false,
  isMultiple = true,
  isImageOnly = false,
  color = "indigo",
  showAll,
}: {
  inputType?: "text" | "password" | "email" | "file";
  variant?: InputVariant;
  inputSize?: InputSize;
  showError?: boolean;
  isDisabled?: boolean;
  isMultiple?: boolean;
  isImageOnly?: boolean;
  color?: InputColor | string;
  /** Render-all modes: every size, or the error/disabled states, in one frame. */
  showAll?: "sizes" | "states";
}) {
  if (showAll) {
    const sizes: InputSize[] = ["sm", "md", "lg"];
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[400px] relative z-10">
        <div className="w-full max-w-sm flex flex-col gap-6">
          {showAll === "sizes"
            ? sizes.map((size) => (
                <InputBlock
                  key={size}
                  type="email"
                  variant={variant}
                  color={color}
                  inputSize={size}
                  label={`Email Address (${size})`}
                  placeholder="Enter your email..."
                  leftIcon={
                    <Mail
                      className={
                        size === "sm"
                          ? "w-3.5 h-3.5"
                          : size === "lg"
                            ? "w-5 h-5"
                            : "w-4 h-4"
                      }
                    />
                  }
                />
              ))
            : (
              <>
                <InputBlock
                  type="email"
                  variant={variant}
                  color={color}
                  inputSize={inputSize}
                  label="Email Address"
                  placeholder="Enter your email..."
                  error="Please enter a valid input."
                />
                <InputBlock
                  type="email"
                  variant={variant}
                  color={color}
                  inputSize={inputSize}
                  disabled
                  label="Email Address (disabled)"
                  placeholder="Enter your email..."
                  helperText="We'll never share your data."
                />
              </>
            )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[400px] relative z-10">
      <div className="w-full max-w-sm">
        <InputBlock
          key={`${inputType}-${variant}-${color}-${inputSize}-${showError}-${isDisabled}-${isMultiple}-${isImageOnly}`}
          type={inputType}
          variant={variant}
          color={color}
          inputSize={inputSize}
          disabled={isDisabled}
          leftIcon={
            inputType === "email" ? (
              <Mail
                className={
                  inputSize === "sm"
                    ? "w-3.5 h-3.5"
                    : inputSize === "lg"
                      ? "w-5 h-5"
                      : "w-4 h-4"
                }
              />
            ) : undefined
          }
          label={
            inputType === "file"
              ? "Upload Portfolio"
              : inputType === "password"
                ? "Password"
                : "Email Address"
          }
          placeholder={
            inputType === "file"
              ? undefined
              : inputType === "password"
                ? "Enter your password..."
                : "Enter your email..."
          }
          helperText={
            !showError
              ? inputType === "file"
                ? "Attach your files here."
                : "We'll never share your data."
              : undefined
          }
          error={
            showError
              ? inputType === "file"
                ? "File size exceeds 5MB limit."
                : "Please enter a valid input."
              : undefined
          }
          multiple={inputType === "file" ? isMultiple : undefined}
          accept={inputType === "file" && isImageOnly ? "image/*" : undefined}
          onFilesChange={(files) => console.log("Uploaded files:", files)}
        />
      </div>
    </div>
  );
}
