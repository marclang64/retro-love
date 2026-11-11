type PetsciiActions = {
  setColor: (color: string) => void;
  setBgColor: (color: string) => void;
  clearOutput: () => void;
  openContainer: (className: string) => void;
  closeContainer: () => void;
};

export function createPetscii(actions: PetsciiActions) {
  const handlers: Record<number, () => void> = {
    5: () => actions.setColor("text-white"),
    28: () => actions.setColor("text-red"),
    30: () => actions.setColor("text-green"),
    31: () => actions.setColor("text-blue"),
    129: () => actions.setColor("text-orange"),
    144: () => actions.setColor("text-black"),
    149: () => actions.setColor("text-brown"),
    150: () => actions.setColor("text-lightred"),
    151: () => actions.setColor("text-darkgray"),
    152: () => actions.setColor("text-mediumgray"),
    153: () => actions.setColor("text-lightgreen"),
    154: () => actions.setColor("text-lightblue"),
    155: () => actions.setColor("text-lightgray"),
    156: () => actions.setColor("text-purple"),
    158: () => actions.setColor("text-yellow"),
    159: () => actions.setColor("text-cyan"),

    147: actions.clearOutput,

    /* Retro Love extensions */
    // Alignment
    256: () => actions.openContainer("center"),
    257: actions.closeContainer,

    // Extended Colors
    301: () => actions.setBgColor("bg-white"),
    302: () => actions.setBgColor("bg-red"),
    303: () => actions.setBgColor("bg-green"),
    304: () => actions.setBgColor("bg-blue"),
    305: () => actions.setBgColor("bg-orange"),
    306: () => actions.setBgColor("bg-black"),
    307: () => actions.setBgColor("bg-brown"),
    308: () => actions.setBgColor("bg-lightred"),
    309: () => actions.setBgColor("bg-darkgray"),
    310: () => actions.setBgColor("bg-mediumgray"),
    311: () => actions.setBgColor("bg-lightgreen"),
    312: () => actions.setBgColor("bg-lightblue"),
    313: () => actions.setBgColor("bg-lightgray"),
    314: () => actions.setBgColor("bg-purple"),
    315: () => actions.setBgColor("bg-yellow"),
    316: () => actions.setBgColor("bg-cyan"),
    317: () => actions.setBgColor(""),
    318: () => actions.setColor(""),
    319: () => {
      actions.setColor("");
      actions.setBgColor("");
    },
  };

  return function processPetscii(character: string): boolean {
    const handler = handlers[character.charCodeAt(0)];

    if (!handler) return false;

    handler();
    return true;
  };
}
