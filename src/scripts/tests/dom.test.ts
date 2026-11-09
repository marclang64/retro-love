// @vitest-environment jsdom
import { beforeAll, beforeEach, describe, expect, it } from "vite-plus/test";

let dom: typeof import("../ui/dom").dom;

beforeAll(async () => {
  document.body.innerHTML = `
    <div class="prompt">
      <span class="mirror" aria-hidden="true"></span>
      <input type="text" class="input" />
    </div>
    <div class="output"></div>
  `;

  ({ dom } = await import("../ui/dom"));
});

beforeEach(() => {
  dom.clearOutput();
});

describe("DOM output", () => {
  it("appends ordinary text", () => {
    dom.outputLine("HELLO");

    expect(dom.output.textContent).toBe("\nHELLO");
  });

  it("clears the screen with PETSCII 147", () => {
    dom.outputLine("HELLO");
    dom.outputLine(String.fromCharCode(147));

    expect(dom.output.textContent).toBe("");
  });

  it("continues printing after clearing the screen", () => {
    dom.outputLine(`HELLO${String.fromCharCode(147)}WORLD`);

    expect(dom.output.textContent).toBe("WORLD");
  });
});
