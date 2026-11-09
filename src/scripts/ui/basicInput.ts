import { registerHotkeys } from "./hotkeys";
import { dom } from "./dom";
import { dispatcher } from "../app/dispatcher";
import { programState } from "../app/state";
import { inputMode } from "../app/constants";

function updateInputDisplay(): void {
  const { input, text } = dom;

  text.textContent = input.value;
  updateCursorPosition(input.selectionStart ?? input.value.length);
}

function updateCursorPosition(position: number): void {
  dom.text.parentElement?.style.setProperty("--cursor-position", String(position));
}

function submitPrompt(): void {
  const inputLine = dom.input.value.trim();

  dom.clearInput();
  dom.outputLine(inputLine);
  dispatcher.dispatchCommand(inputLine);
}

function registerInputListeners(): void {
  const { input } = dom;

  input.addEventListener("input", updateInputDisplay);

  input.addEventListener("blur", () => {
    input.focus();
  });

  input.addEventListener("keydown", (event) => {
    if (!programState.isInputEnabled) {
      event.preventDefault();
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      const position = input.selectionStart ?? 0;

      const nextPosition =
        event.key === "ArrowLeft"
          ? Math.max(0, position - 1)
          : Math.min(input.value.length, position + 1);

      updateCursorPosition(nextPosition);
    }

    if (event.key === "Enter") {
      event.preventDefault();
      dom.text.textContent = "";
      updateCursorPosition(0);

      if (programState.activeInputMode === inputMode.PROMPT) {
        submitPrompt();
      }
    }
  });
}

export const basicInput = {
  initialize(): void {
    registerInputListeners();
    registerHotkeys();
  },
};
