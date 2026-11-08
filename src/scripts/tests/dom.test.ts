// @vitest-environment jsdom
import { beforeAll, beforeEach, describe, expect, it } from "vite-plus/test";

let dom: typeof import("../ui/dom").dom;

beforeAll(async () => {
  document.body.innerHTML = `
    <input class="input" />
    <textarea class="output"></textarea>
  `;

  ({ dom } = await import("../ui/dom"));
});

beforeEach(() => {
  dom.clearOutput();
});

describe("DOM output", () => {
  it("appends ordinary text", () => {
    dom.outputLine("HELLO");

    expect(dom.output.value).toBe("\nHELLO");
  });

  it("clears the screen with PETSCII 147", () => {
    dom.outputLine("HELLO");
    dom.outputLine(String.fromCharCode(147));

    expect(dom.output.value).toBe("");
  });

  it("continues printing after clearing the screen", () => {
    dom.outputLine(`HELLO${String.fromCharCode(147)}WORLD`);

    expect(dom.output.value).toBe("WORLD");
  });
});
