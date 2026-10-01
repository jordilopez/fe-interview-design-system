import { compileString } from "sass";
import { describe, expect, it } from "vitest";

const IMPORT = '@use "src/styles/tools" as tools;';
const LOAD_PATHS = { loadPaths: [process.cwd()] };

function compileCss(source: string): string {
  return compileString(`${IMPORT}\n${source}`, LOAD_PATHS).css;
}

function compileError(source: string): unknown {
  try {
    compileCss(source);
    return null;
  } catch (error) {
    return error;
  }
}

describe("style tools", () => {
  it("useType emits typography token references", () => {
    const css = compileCss(".demo { @include tools.useType(body-m); }");
    expect(css).toContain("font-family: var(--ff-inter)");
    expect(css).toContain("font-size: var(--fs-sm)");
    expect(css).toContain("line-height: var(--lh-base)");
    expect(css).toContain("font-weight: var(--fw-bold)");
  });

  it("bpFrom(xs) emits content without a media query", () => {
    const css = compileCss(".demo { @include tools.bpFrom(xs) { color: red; } }");
    expect(css).toContain("color: red");
    expect(css).not.toContain("@media");
  });

  it("bpFrom(md) wraps content in a min-width media query", () => {
    const css = compileCss(".demo { @include tools.bpFrom(md) { color: red; } }");
    expect(css).toContain("@media (min-width: 768px)");
  });

  it("rejects unknown typesets", () => {
    const error = compileError(".demo { @include tools.useType(nope); }");
    expect(error).toBeInstanceOf(Error);
    expect(String(error)).toContain("Unknown typeset");
  });

  it("rejects unknown breakpoints", () => {
    const error = compileError(".demo { @include tools.bpFrom(nope) { color: red; } }");
    expect(error).toBeInstanceOf(Error);
    expect(String(error)).toContain("Unknown breakpoint");
  });
});
