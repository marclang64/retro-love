import type { CommandResult } from "../types/command";
import { commandType } from "../app/constants";

export async function OPENLINK(args: string): Promise<CommandResult> {
  try {
    const url = new URL(args.trim().replace(/^"|"$/g, ""));
    if (!["http:", "https:"].includes(url.protocol)) {
      return { type: commandType.ERROR, value: null };
    }

    window.location.assign(url.href);

    return { type: commandType.DEFAULT, value: null };
  } catch {
    return { type: commandType.ERROR, value: null };
  }
}
