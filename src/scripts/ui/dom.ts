import { getElement } from "../utils/html";
import { createPetscii } from "./petscii";

function createDom() {
  const input = getElement<HTMLInputElement>(".input");
  const mirror = getElement<HTMLInputElement>(".mirror");
  const output = getElement<HTMLTextAreaElement>(".output");
  let textColor = "";
  let bgColor = "";

  function outputLine(value: string | number): void {
    for (const character of `\n${value}`) {
      if (!processPetscii(character)) {
        appendCharacter(character);
      }
    }

    output.scrollTop = output.scrollHeight;
  }

  function clearInput(): void {
    input.value = "";
    input.style.width = "0px";
  }

  function clearOutput(): void {
    output.textContent = "";
  }

  function resetInput(ready = false): void {
    if (ready) outputLine(`\nReady.`);
  }

  function startupScreen(): void {
    clearOutput();
    openContainer("center");
    outputLine("**** Commodore 64 Basic V2 ****");
    outputLine("64K RAM System 38911 Basic Bytes Free");
    closeContainer();
    resetInput(true);
  }

  const processPetscii = createPetscii({
    setColor: (color) => {
      textColor = color;
    },
    setBgColor: (color) => {
      bgColor = color;
    },
    clearOutput,
    openContainer,
    closeContainer,
  });

  function appendCharacter(character: string): void {
    if (!textColor && !bgColor) {
      currentContainer.append(document.createTextNode(character));
      return;
    }

    const classes = [textColor, bgColor].filter(Boolean);
    const last = currentContainer.lastElementChild;

    if (
      last instanceof HTMLSpanElement &&
      last === currentContainer.lastChild &&
      last.classList.length === classes.length &&
      classes.every((className) => last.classList.contains(className))
    ) {
      last.textContent += character;
      return;
    }

    const span = document.createElement("span");
    span.classList.add(...classes);
    span.textContent = character;
    currentContainer.append(span);
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

  return { input, mirror, output, outputLine, clearOutput, clearInput, resetInput, startupScreen };
}

export const dom = createDom();
