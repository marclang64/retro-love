import { getElement } from "../utils/html";

function createDom() {
  const input = getElement<HTMLInputElement>(".input");
  const output = getElement<HTMLTextAreaElement>(".output");
  const petscii: Record<number, () => void> = {
    147: clearOutput,
  };

  function outputLine(value: string | number): void {
    for (const character of `\n${value}`) {
      if (!processPetscii(character)) {
        output.value += character;
      }
    }

    output.scrollTop = output.scrollHeight;
  }

  function processPetscii(character: string): boolean {
    const handler = petscii[character.charCodeAt(0)];

    if (!handler) return false;

    handler();
    return true;
  }

  function clearOutput(): void {
    output.value = "";
  }

  function clearInput(): void {
    input.value = "";
    input.style.width = "0px";
  }

  function resetInput(ready = false): void {
    if (ready) outputLine(`\nReady.`);
  }

  return { input, output, outputLine, clearOutput, clearInput, resetInput };
}

export const dom = createDom();
