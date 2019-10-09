// @ts-check
/* eslint-env node,jest */

const { Elements, StrongText, Nothing, Newline, Heading, InlineCode, Line, Lines } = require("./../index");

describe("Markdown Elements", () => {
  it("Nothing", () => {
    expect(Nothing()()).toEqual("");
  });

  it("Line", () => {
    expect(Line("")()).toEqual("");
    expect(Line("hello")()).toEqual("hello");
  });

  it("Heading", () => {
    expect(Heading({ level: 1, text: "title" })()).toEqual("# title");
    expect(Heading({ level: 2, text: "title" })()).toEqual("## title");
    expect(Heading({ level: 0, text: "title" })()).toEqual(" title");
  });

  it("Newline", () => {
    expect(Newline()()).toEqual("\n");
    expect(Newline(0)()).toEqual("");
    expect(Newline(1)()).toEqual("\n");
    expect(Newline(2)()).toEqual("\n\n");
  });

  it("StrongText", () => {
    expect(StrongText("")()).toEqual("****");
    expect(StrongText("a")()).toEqual("**a**");
    expect(StrongText("a b")()).toEqual("**a b**");
    expect(StrongText("hello world")()).toEqual("**hello world**");
  });

  it("InlineCode", () => {
    expect(InlineCode("")()).toEqual("");
    expect(InlineCode("a")()).toEqual("`a`");
    expect(InlineCode("a b")()).toEqual("`a b`");

    expect(InlineCode([])()).toEqual("");
    expect(InlineCode(["a"])()).toEqual("`a`");
    expect(InlineCode(["a", "b"])()).toEqual("`a` | `b`");
  });

  it("Lines", () => {
    expect(Lines([])()).toEqual("");
    expect(Lines(["a"])()).toEqual("a\n");
    expect(Lines(["a", "b"])()).toEqual("a\nb\n");
  });

  it("Elements", () => {
    // s renders a string
    const s = string => () => string;
    expect(s("a")()).toEqual("a")
    expect(Elements([])()).toEqual("");
    expect(Elements([s("a")])()).toEqual("a");
    expect(Elements([s("a"), s("b")])()).toEqual("ab");
  });
});
