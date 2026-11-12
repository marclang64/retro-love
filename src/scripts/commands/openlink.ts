import type { CommandResult } from "../types/command";
import { commandType } from "../app/constants";

export async function OPENLINK(args: string): Promise<CommandResult> {
  try {
    const value = args.trim().replace(/^"|"$/g, "");
    const url = new URL(value);

    if (!["http:", "https:", "mailto:"].includes(url.protocol)) {
      return { type: commandType.ERROR, value: null };
    }

    window.open(url.href, "_blank", "noopener,noreferrer");

    return { type: commandType.DEFAULT, value: null };
  } catch {
    return { type: commandType.ERROR, value: null };
  }
}
