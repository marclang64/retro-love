import { getElement } from "../utils/html";
import { createPetscii } from "./petscii";

function createDom() {
  const input = getElement<HTMLInputElement>(".input");
  const mirror = getElement<HTMLInputElement>(".mirror");
  const output = getElement<HTMLTextAreaElement>(".output");
  let currentColor = "";

  function outputLine(value: string | number): void {
    for (const character of `\n${value}`) {
      if (!processPetscii(character)) {
        appendCharacter(character);
      }
    }

    output.scrollTop = output.scrollHeight;
  }

  const processPetscii = createPetscii({
    setColor: (color) => {
      currentColor = color;
    },
    clearOutput,
    openContainer,
    closeContainer,
  });

  function appendCharacter(character: string): void {
    if (!currentColor) {
      currentContainer.append(document.createTextNode(character));
      return;
    }

    const last = currentContainer.lastElementChild;

    if (
      last instanceof HTMLSpanElement &&
      last.classList.contains(currentColor) &&
      last === currentContainer.lastChild
    ) {
      last.textContent += character;
      return;
    }

    const span = document.createElement("span");
    span.classList.add(currentColor);
    span.textContent = character;
    currentContainer.append(span);
  }

  function clearOutput(): void {
    output.textContent = "";
  }

  let currentContainer: HTMLElement = output;

  function openContainer(className: string): void {
    const div = document.createElement("div");
    div.classList.add(className);

    currentContainer.append(div);
    currentContainer = div;
  }

  function closeContainer(): void {
    if (currentContainer !== output) {
      currentContainer = currentContainer.parentElement ?? output;
    }
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
