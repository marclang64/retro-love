type PetsciiActions = {
  setColor: (color: string) => void;
  clearOutput: () => void;
  openContainer: (className: string) => void;
  closeContainer: () => void;
};

export function createPetscii(actions: PetsciiActions) {
  const handlers: Record<number, () => void> = {
    5: () => actions.setColor("white"),
    28: () => actions.setColor("red"),
    30: () => actions.setColor("green"),
    31: () => actions.setColor("blue"),
    129: () => actions.setColor("orange"),
    144: () => actions.setColor("black"),
    149: () => actions.setColor("brown"),
    150: () => actions.setColor("lightred"),
    151: () => actions.setColor("darkgray"),
    152: () => actions.setColor("mediumgray"),
    153: () => actions.setColor("lightgreen"),
    154: () => actions.setColor("lightblue"),
    155: () => actions.setColor("lightgray"),
    156: () => actions.setColor("purple"),
    158: () => actions.setColor("yellow"),
    159: () => actions.setColor("cyan"),

    147: actions.clearOutput,

    // Retro Love extensions
    256: () => actions.openContainer("center"),
    257: actions.closeContainer,
  };

  return function processPetscii(character: string): boolean {
    const handler = handlers[character.charCodeAt(0)];

    if (!handler) return false;

    handler();
    return true;
  };
}
