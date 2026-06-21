/**
 * Zero-dependency motion shim — replaces framer-motion in content files.
 * All motion.* components render plain HTML elements; animation props are dropped.
 * AnimatePresence renders children directly with no enter/exit animation.
 * Result: Framer Motion bundle never loads on mobile for content pages.
 */

import { createElement, forwardRef } from "react";
import type { ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProps = Record<string, any>;

const FM_PROPS = new Set([
  "initial", "animate", "whileInView", "whileHover", "whileTap", "whileFocus",
  "viewport", "transition", "exit", "variants", "custom", "layout", "layoutId",
  "drag", "dragConstraints", "dragElastic", "dragMomentum", "onAnimationStart",
  "onAnimationComplete", "onDragStart", "onDragEnd", "onUpdate", "transformTemplate",
  "positionTransition", "layoutDependency",
]);

function createShim(tag: string) {
  const Comp = forwardRef<HTMLElement, AnyProps>(function MotionShim(props, ref) {
    const domProps: AnyProps = { ref };
    for (const key in props) {
      if (!FM_PROPS.has(key)) domProps[key] = props[key];
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return createElement(tag as any, domProps);
  });
  Comp.displayName = `ShimMotion.${tag}`;
  return Comp;
}

export const motion = {
  div: createShim("div"),
  span: createShim("span"),
  p: createShim("p"),
  h1: createShim("h1"),
  h2: createShim("h2"),
  h3: createShim("h3"),
  h4: createShim("h4"),
  h5: createShim("h5"),
  h6: createShim("h6"),
  nav: createShim("nav"),
  section: createShim("section"),
  article: createShim("article"),
  aside: createShim("aside"),
  header: createShim("header"),
  footer: createShim("footer"),
  main: createShim("main"),
  ul: createShim("ul"),
  ol: createShim("ol"),
  li: createShim("li"),
  a: createShim("a"),
  button: createShim("button"),
  svg: createShim("svg"),
  path: createShim("path"),
  circle: createShim("circle"),
  line: createShim("line"),
  rect: createShim("rect"),
  polyline: createShim("polyline"),
  polygon: createShim("polygon"),
  g: createShim("g"),
  text: createShim("text"),
  img: createShim("img"),
  form: createShim("form"),
  input: createShim("input"),
  label: createShim("label"),
  figure: createShim("figure"),
  figcaption: createShim("figcaption"),
  table: createShim("table"),
  tr: createShim("tr"),
  td: createShim("td"),
  th: createShim("th"),
  thead: createShim("thead"),
  tbody: createShim("tbody"),
};

// Type stub — erased at compile time; lets files that imported `type Variants` still compile
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Variants = Record<string, any>;

export function AnimatePresence({
  children,
}: {
  children?: ReactNode;
  mode?: "sync" | "wait" | "popLayout";
  initial?: boolean;
  onExitComplete?: () => void;
  custom?: unknown;
}) {
  return <>{children}</>;
}

// Stub hooks — content files that import these will compile; they do nothing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMotionValue(initial: any) { return { get: () => initial, set: () => {}, onChange: () => () => {} }; }
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export function useTransform(val: any, ..._args: any[]) { return val; }
export function useAnimation() { return { start: () => {}, stop: () => {}, set: () => {} }; }
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export function useScroll(_opts?: any) { return { scrollY: { get: () => 0 }, scrollYProgress: { get: () => 0 } }; }
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export function useInView(_ref?: any, _opts?: any): boolean { return false; }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCycle<T>(...args: T[]): [T, (i?: number) => void] { return [args[0], () => {}]; }
export function useSpring() { return { get: () => 0 }; }
