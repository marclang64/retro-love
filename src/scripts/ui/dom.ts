import { getElement } from "../utils/html";

function createDom() {
  const input = getElement<HTMLInputElement>(".input");
  const mirror = getElement<HTMLInputElement>(".mirror");
  const output = getElement<HTMLTextAreaElement>(".output");

  let currentColor = "";
  const petscii: Record<number, () => void> = {
    5: () => {
      currentColor = "white";
    },
    28: () => {
      currentColor = "red";
    },
    30: () => {
      currentColor = "green";
    },
    31: () => {
      currentColor = "blue";
    },
    129: () => {
      currentColor = "orange";
    },
    144: () => {
      currentColor = "black";
    },
    149: () => {
      currentColor = "brown";
    },
    150: () => {
      currentColor = "lightred";
    },
    151: () => {
      currentColor = "darkgray";
    },
    152: () => {
      currentColor = "mediumgray";
    },
    153: () => {
      currentColor = "lightgreen";
    },
    154: () => {
      currentColor = "lightblue";
    },
    155: () => {
      currentColor = "lightgray";
    },
    156: () => {
      currentColor = "purple";
    },
    158: () => {
      currentColor = "yellow";
    },
    159: () => {
      currentColor = "cyan";
    },
    147: clearOutput,
  };

  function outputLine(value: string | number): void {
    for (const character of `\n${value}`) {
      if (!processPetscii(character)) {
        appendCharacter(character);
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

  function appendCharacter(character: string): void {
    if (!currentColor) {
      output.append(document.createTextNode(character));
      return;
    }

    const last = output.lastElementChild;

    if (
      last instanceof HTMLSpanElement &&
      last.classList.contains(currentColor) &&
      last === output.lastChild
    ) {
      last.textContent += character;
      return;
    }

    const span = document.createElement("span");
    span.classList.add(currentColor);
    span.textContent = character;
    output.append(span);
  }

  function clearOutput(): void {
    output.textContent = "";
  }

  function clearInput(): void {
    input.value = "";
    input.style.width = "0px";
  }

  function resetInput(ready = false): void {
    if (ready) outputLine(`\nReady.`);
  }

  return { input, mirror, output, outputLine, clearOutput, clearInput, resetInput };
}

export const dom = createDom();
