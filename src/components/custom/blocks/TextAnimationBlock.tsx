"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TextAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  variant?: 
    | "typewriter" 
    | "blur-reveal" 
    | "wave" 
    | "pop-in"
    | "flip"
    | "spin-in"
    | "blur-in-up";
  duration?: number;
  delay?: number;
  as?: React.ElementType;
  /**
   * Swap what a word renders as, keeping its entrance. Word-level variants
   * only (`pop-in`, `flip`, `blur-in-up`): return the word itself with some
   * markup, e.g. a coloured span or a word that later changes.
   */
  renderWord?: (word: string, index: number) => React.ReactNode;
}

export const TextAnimation = React.forwardRef<
  HTMLDivElement,
  TextAnimationProps
>(
  (
    { 
      text, 
      variant = "blur-reveal", 
      duration = 0.5, 
      delay = 0, 
      as: Component = "p",
      renderWord,
      className, 
      ...props 
    },
    ref
  ) => {
    // Determine the Motion component correctly for string tags or custom components
    const MotionComponent =
      typeof Component === "string"
        ? (motion[Component as keyof typeof motion] as React.ElementType)
        : motion(Component);

    const renderAnimation = () => {
      switch (variant) {
        case "typewriter": {
          const containerVariants: Variants = {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: duration / text.length, delayChildren: delay },
            },
          };

          const childVariants: Variants = {
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", damping: 12, stiffness: 100 },
            },
          };

          return (
            <MotionComponent
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={cn("flex flex-wrap gap-[0.25em]", className)}
            >
              {text.split(" ").map((word, index) => (
                <span key={index} className="inline-flex">
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      variants={childVariants}
                      className="inline-block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </MotionComponent>
          );
        }



        case "blur-reveal": {
          const variants: Variants = {
            hidden: { opacity: 0, filter: "blur(10px)", scale: 0.95 },
            visible: {
              opacity: 1,
              filter: "blur(0px)",
              scale: 1,
              transition: { duration, delay, ease: "easeOut" },
            },
          };

          return (
            <MotionComponent
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={className}
            >
              {text}
            </MotionComponent>
          );
        }



        case "wave": {
          const containerVariants: Variants = {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05, delayChildren: delay },
            },
          };

          const childVariants: Variants = {
            hidden: { opacity: 0, y: 15 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", damping: 10, stiffness: 200 },
            },
          };

          return (
            <MotionComponent
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={cn("flex flex-wrap gap-[0.25em]", className)}
            >
              {text.split(" ").map((word, index) => (
                <span key={index} className="inline-flex">
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      variants={childVariants}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </MotionComponent>
          );
        }

        case "pop-in": {
          const containerVariants: Variants = {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: delay },
            },
          };

          const childVariants: Variants = {
            hidden: { opacity: 0, scale: 0.5, y: 10 },
            visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: "spring", damping: 12, stiffness: 200 },
            },
          };

          return (
            <MotionComponent
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={cn("flex flex-wrap gap-[0.25em]", className)}
            >
              {text.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  variants={childVariants}
                  className="inline-block"
                >
                  {renderWord ? renderWord(word, index) : word}
                </motion.span>
              ))}
            </MotionComponent>
          );
        }

        case "flip": {
          const containerVariants: Variants = {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: delay },
            },
          };

          const childVariants: Variants = {
            hidden: { opacity: 0, rotateX: -90, y: 20 },
            visible: {
              opacity: 1,
              rotateX: 0,
              y: 0,
              transition: { type: "spring", damping: 15, stiffness: 200 },
            },
          };

          return (
            <MotionComponent
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={cn("flex flex-wrap gap-[0.25em] perspective-[1000px]", className)}
            >
              {text.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  variants={childVariants}
                  className="inline-block origin-bottom"
                >
                  {renderWord ? renderWord(word, index) : word}
                </motion.span>
              ))}
            </MotionComponent>
          );
        }

        case "spin-in": {
          const containerVariants: Variants = {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05, delayChildren: delay },
            },
          };

          const childVariants: Variants = {
            hidden: { opacity: 0, scale: 0, rotate: -180 },
            visible: {
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: { type: "spring", damping: 12, stiffness: 200 },
            },
          };

          return (
            <MotionComponent
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={cn("flex flex-wrap gap-[0.25em]", className)}
            >
              {text.split(" ").map((word, index) => (
                <span key={index} className="inline-flex">
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      variants={childVariants}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </MotionComponent>
          );
        }

        case "blur-in-up": {
          const containerVariants: Variants = {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: delay },
            },
          };

          const childVariants: Variants = {
            hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.6, ease: "easeOut" },
            },
          };

          return (
            <MotionComponent
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={cn("flex flex-wrap gap-[0.25em]", className)}
            >
              {text.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  variants={childVariants}
                  className="inline-block"
                >
                  {renderWord ? renderWord(word, index) : word}
                </motion.span>
              ))}
            </MotionComponent>
          );
        }

        default:
          return <Component className={className}>{text}</Component>;
      }
    };

    return (
      <div ref={ref} {...props}>
        {renderAnimation()}
      </div>
    );
  }
);

TextAnimation.displayName = "TextAnimation";
