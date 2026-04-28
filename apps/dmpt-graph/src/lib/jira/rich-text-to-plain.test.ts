import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { htmlToPlainText, richTextToPlain } from "./rich-text-to-plain.js";

describe("htmlToPlainText", () => {
  it("strips tags", () => {
    assert.equal(htmlToPlainText("<p>Hello <b>world</b></p>"), "Hello world");
  });
});

describe("richTextToPlain", () => {
  it("handles plain string", () => {
    assert.equal(richTextToPlain("  ok  "), "ok");
  });

  it("handles HTML", () => {
    assert.match(richTextToPlain("<ul><li>a</li></ul>"), /a/);
  });

  it("handles ADF doc", () => {
    const adf = {
      type: "doc",
      content: [{ type: "paragraph", content: [{ type: "text", text: "Hi" }] }],
    };
    assert.equal(richTextToPlain(adf), "Hi");
  });
});
